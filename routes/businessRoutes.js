const express = require('express');
const router = express.Router();
const businessDatabase = require('../database/businessDatabase');
const bcrypt = require('bcrypt')
const passport = require("passport");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const imgNaverCloud = require('../imageUpload/imgNaverCloud');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/businesses', async (req, res) => {
  try {
    console.log('라우터 저장 코드')

    const formData = req.body; // 폼 데이터
    console.log(formData)
    const password = await bcrypt.hash(req.body.login_password, 10);


    formData.login_password = password;


    // 비즈니스 데이터 생성

    const business = await businessDatabase.createBusiness(formData);

    res.status(201).json({ business });
  } catch (error) {
    console.error('Error creating business', error.message);
    res.status(500).json({ error: error.message });
  }

})

router.post('/business/register/information', upload.fields([
  { name: 'main', maxCount: 1 },
  { name: 'sub', maxCount: 50 },
  { name: 'album', maxCount: 50 },
  { name: 'review', maxCount: 50 },
  { name: 'pricing', maxCount: 10 }
]), async (req, res) => {

  try {
    const files = req.files; // 업로드된 파일들
    const formData = req.body; // 폼 데이터
    console.log(formData)

    if (!files) {
      throw new Error('No files uploaded.');
    }

    // 이미지 업로드 및 URL 가져오기
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const fileArray = [];
    Object.keys(files).forEach(key => {
      fileArray.push(...files[key]);
    });
    const imageUploadResults = await imgNaverCloud.uploadMultipleImages(fileArray, '00000');
    //const businessRegisterDesinger = await businessDatabase.createBusinessBeautySignificant(RegisterBeautySignificant);

    console.log(imageUploadResults)
    // 비즈니스 데이터 생성
    const businessData = {
      ...formData,

    };

    // imageUploadResults를 분류하여 businessData에 추가
    const pricingImages = [];
    imageUploadResults.forEach(result => {
      if (result.image_type === 'main') {
        businessData.business_main_image = result.url; // main 이미지는 business_main_image에 저장
      } else if (result.image_type === 'pricing') {
        pricingImages.push(result.url); // pricing 이미지는 배열에 저장
      }
    });

    // pricing 이미지를 순서대로 business_price_image1, business_price_image2, ...에 저장
    pricingImages.forEach((url, index) => {
      businessData[`business_price_image${index + 1}`] = url;
    });

    console.log(businessData)
    const business = await businessDatabase.createBusinessInformation(businessData);

    res.status(201).json({ business, imageUploadResults });
  } catch (error) {
    console.error('Error creating business with images:', error.message);
    res.status(500).json({ error: error.message });
  }

});


router.post('/business/login', async (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);

      // 세션 상태 확인

      return res.status(200).json({
        message: '로그인 성공',
        user: {
          id: user.login_id,
          name: user.business_owner_name,
        },
      });
    });
  })(req, res, next);
})

router.get('/businesses/information', authMiddleware, async (req, res) => {
  console.log('검색할 때마다 데이터베이스를 조회한다')
  
  try {
    const { category } = req.query;
    const businessesInformation = await businessDatabase.getBusinesses();
    res.json(businessesInformation);
  } catch (error) {
    console.error('Error fetching businesses:', error.message);
    res.status(500).json({ error: error.message });
  }
})




router.get('/business/detail/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
      const businessInformationById = await businessDatabase.getBusinessDetailsById(id);
      res.json(businessInformationById);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})

router.post('/business/register/desinger', async (req, res) => {

  try {
    
    console.log(req.body)
    console.log(req.user.business_registration_number)
    const RegisterDesinger = req.body

    RegisterDesinger.business_registration_number = req.user.business_registration_number;

    console.log(RegisterDesinger)
    const businessRegisterDesinger = await businessDatabase.createBusinessDesinger(RegisterDesinger);

    res.status(201).json({ businessRegisterDesinger });
  } catch (error) {
    console.error('Error creating business with images:', error.message);
    res.status(500).json({ error: error.message });
  }

});

router.put('/business/beauty/significant', async (req, res) => {
  
  try {
    
    console.log(req.body)
   
    const RegisterBeautySignificant = req.body

    const businessRegisterDesinger = await businessDatabase.updateBusinessBeautySignificant(RegisterBeautySignificant);

    res.status(201).json({ businessRegisterDesinger });
  } catch (error) {
    console.error('Error creating business with images:', error);
    res.status(500).json({ error: error.message });
  }

});
router.get('/business/style/significantGet', async(req, res) => {
  
    const business_registration_number = req.headers['business-registration-number']; // 헤더에서 사업자 번호를 추출
    
    console.log(business_registration_number)

    try{
        const userGetAuthority = await businessDatabase.significantGet(business_registration_number);
        res.json(userGetAuthority);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})


module.exports = router;