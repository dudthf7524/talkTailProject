const crypto = require('crypto');
const axios = require('axios');
const { PassThrough } = require('stream');
const { generateUniqueFileName } = require('../utils/fileUtils');
const { accessKey, secretKey, region, service, endpoint, bucketName } = require('../aws/awsConfig');

const mime = require('mime-types');

const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// AWS SDK를 네이버 클라우드 플랫폼(NCP) 객체 스토리지와 호환되도록 설정
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,  // NCP 액세스 키 ID
//   secretAccessKey: process.env.AWS_SECRET_KEY,  // NCP 비밀 액세스 키
//   endpoint: 'https://kr.object.ncloudstorage.com',  // NCP 객체 스토리지 엔드포인트
//   region: 'kr',  // NCP 리전
//   s3ForcePathStyle: true,  // NCP 객체 스토리지에 맞게 경로 스타일 강제 설정
//   signatureVersion: 'v4'  // NCP는 AWS V4 서명을 사용
// });


const s3 = new AWS.S3({
    endpoint: 'kr.object.ncloudstorage.com',
    region: 'kr',
    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
// NCP S3 endpoint


// AWS4 인증을 위한 함수들
const sign = (key, msg) => crypto.createHmac('sha256', key).update(msg, 'utf8').digest();
const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
    const kDate = sign(('AWS4' + key), dateStamp);
    const kRegion = sign(kDate, regionName);
    const kService = sign(kRegion, serviceName);
    const kSigning = sign(kService, 'aws4_request');
    return kSigning;
};


// 이미지 업로드 후 공개로 설정하는 함수
const setPublicAcl = async (objectName) => {
    const url = `https://${endpoint}/${bucketName}/${objectName}?acl`;  // ?acl 쿼리 스트링 추가

    const t = new Date();
    const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substr(0, 8);

    const canonicalUri = `/${bucketName}/${objectName}`;
    const canonicalQueryString = 'acl=';
    const payloadHash = crypto.createHash('sha256').update('', 'utf8').digest('hex');
    const canonicalHeaders = `host:${endpoint}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-date';
    const canonicalRequest = `PUT\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')}`;
    const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');
    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const headers = {
        'Authorization': authorizationHeader,
        'x-amz-date': amzDate,
        'x-amz-acl': 'public-read',  // 공개 설정
        'Content-Length': 0,  // 이 값은 요청 본문이 없으므로 0으로 설정
        'Host': endpoint
    };

    try {
        const response = await axios.put(url, null, { headers });
        console.log(`Set ${objectName} as public. Response: ${response.status}`);
    } catch (error) {
        console.error('setPublicAcl Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// const s3 = new AWS.S3({
//     accessKeyId: 'your-access-key-id', // NCP Access Key
//     secretAccessKey: 'your-secret-access-key', // NCP Secret Key
//     endpoint: endpoint,  // NCP's endpoint
//     region: 'kr-standard', // NCP's region
//     s3ForcePathStyle: true, // Required for compatibility with NCP Object Storage
//   });

// 이미지 업로드 함수
const uploadImageToBucket = async (fileBuffer, objectName, mimeType) => {
    const t = new Date();
    const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substr(0, 8);

    const canonicalUri = `/${bucketName}/${objectName}`;
    const payloadHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const canonicalHeaders = `host:${endpoint}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = `PUT\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')}`;
    const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');
    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const headers = {
        'Authorization': authorizationHeader,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Content-Length': fileBuffer.length,
        'Content-Type': mimeType || 'application/octet-stream', // 여기서 MIME 타입 설정
        'Host': endpoint
    };

    const fileStream = new PassThrough();
    fileStream.end(fileBuffer);

    const url = `https://${endpoint}${canonicalUri}`;
    await axios.put(url, fileStream, { headers });

    return url;
};

// 다중 이미지 업로드
const uploadMultipleImages = async (files) => {
    const results = [];
   
    for (const file of files) {
        const folder = file.fieldname;
        const objectName = `${folder}/${generateUniqueFileName(file.originalname)}`;
        const url = await uploadImageToBucket(file.buffer, objectName);
        console.log(folder)
        console.log('Uploaded:', url);
       
        // 이미지 공개로 설정
        await setPublicAcl(objectName);
        
        results.push({ url, image_type: folder});
    }

    return results;
};

// 단일 펫 이미지 업로드
const uploadPetImage = async (file, folder) => {
    const objectName = `${folder}/${generateUniqueFileName(file.originalname)}`;
    const url = await uploadImageToBucket(file.buffer, objectName);
    console.log('Uploaded:', url);
    // 이미지 공개로 설정
    await setPublicAcl(objectName);
    
    return url;
};

// 펫 이미지 가져오기
const getPetImages = async (petIds) => {
    const images = await PetImage.findAll({
        where: { pet_id: petIds },
        attributes: ['pet_id', 'endpoint']
    });

    console.log('Pet images:', images);

    // petIds를 key로 하고, 이미지를 value로 하는 객체 생성
    const imageMap = images.reduce((map, image) => {
        map[image.pet_id] = image.endpoint;
        return map;
    }, {});

    return imageMap; // 객체 반환
};

const deleteImage = async (url) => {
    const fileName = url.replace('https://kr.object.ncloudstorage.com/talktailbucket/', '');
    console.log("이미지 수정 네이버 클라우드")
    console.log(fileName);
    console.log(process.env.AWS_ACCESS_KEY);
    console.log(process.env.AWS_SECRET_KEY);
   
   
    try {
        // 기존 파일을 'pet/' 폴더 내에서 삭제
        // const deleteParams = {
        //     Bucket: 'talktailbucket',  // 버킷 이름
        //     Key: `${fileName}`,  // 'pet/' 폴더 안에서 파일 삭제
        // };
        // console.log(deleteParams)
        // const data = await s3.deleteObject(deleteParams);
        // console.log('파일 삭제 성공:'); // 실제 응답 출력
        
        const data = await s3.deleteObject({
            Bucket: 'talktailbucket',  // 버킷 이름
            Key: `${fileName}`,  // 'pet/' 폴더 안에서 파일 삭제
        }).promise();

        console.log('파일 삭제 성공:'); 

       
        if (data) {
            console.log("삭제가 완료되었습니다.", data.DeleteMarker);
        } else {
            console.log("파일 삭제가 실패했거나 파일이 존재하지 않습니다.");
        }
    } catch (error) {
        console.error('파일 삭제 실패:', error);
    }
};

// 이미지 ID로 조회
const LookupImageById = async (id) => {
    const image = await Image.findByPk(id);
    return image;
};

// 펫 이미지 ID로 조회
const LookupPetImageById = async (id) => {
    const image = await PetImage.findByPk(id);
    return image;
}

module.exports = {
    uploadMultipleImages,
    LookupImageById,
    uploadPetImage,
    getPetImages,
    LookupPetImageById,
    deleteImage
};