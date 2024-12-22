
const { Pet } = require("../models");
const imgNaverCloud = require('../imageUpload/imgNaverCloud');

const registerPet = async (petData) => {
    console.log('aaaa')
    console.log('bbbb')
    console.log('cccc')
    console.log(petData)

    try {
        // 생일 파싱 - YY/MM/DD 형식으로 가정
        const [year, month, day] = petData.birthDate.split('/');
        const parsedYear = parseInt(year, 10) < 50 ? `20${year}` : `19${year}`; // 50년 이전은 2000년대, 이후는 1900년대
        const birthDate = new Date(`${parsedYear}-${month}-${day}`);
        console.log('Parsed birth date:', birthDate);
        console.log(petData.image)
        console.log("여기까지")
        // 이미지 처리
        let petImg = null;
        if (petData.image) {
            petImg = await imgNaverCloud.uploadPetImage(petData.image, 'pet');
        }

        // 펫 기본 정보 저장
        const pet = await Pet.create({
            platform_id: petData.platform_id,
            platform: petData.platform,
            petimage: petImg,
            pet_name: petData.name,
            pet_species: petData.species,
            pet_breed: petData.breed,
            pet_birth: birthDate.toISOString().split('T')[0], // 날짜 형식 변환
            pet_weight: petData.weight,
            pet_neuter: petData.neuter,
            pet_gender: petData.gender,
            pet_etc: petData.etc,
        });

        // const petId = pet.pet_id;

        return { pet, petImg };
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

const getMyPets = async (id, platform) => {
    try {
        // 1. Pet 데이터 조회
        const pets = await Pet.findAll({
            where: { platform_id: id, platform: platform },
            //attributes: ['pet_id', 'pet_name', 'pet_species', 'pet_breed', 'pet_weight', 'pet_gender', 'pet_birth'],
        });
        return pets;
    } catch (error) {
        throw new Error(`Failed to fetch pets: ${error.message}`);
    }
};
const getPetDetails = async (petId) => {
    try {
        // 펫 기본 정보 가져오기
        const pet = await Pet.findOne({
            where: { pet_id: petId },
        });
        // 결과 리턴
        return pet;
    } catch (error) {
        throw new Error(`Failed to fetch pet details: ${error.message}`);
    }
};

const updatePetUpdateYesFile = async (petId, petData) => {
    console.log("==============database==============")

    let petUpdateImage = null;
    console.log(petData.image)

    if (petData.image) {
        await imgNaverCloud.deleteImage(petData.image);
    }
    if (petData.imageUpdate) {
        petUpdateImage = await imgNaverCloud.uploadPetImage(petData.imageUpdate, 'pet');
    }
    try {
        const pet = await Pet.update(
            {
                petimage: petUpdateImage,
                pet_species: petData.species,
                pet_breed: petData.breed,
                pet_name: petData.name,
                pet_birth: petData.birthDate,
                pet_weight: petData.weight,
                pet_gender: petData.gender,
                pet_neuter: petData.neuter,
                pet_etc: petData.etc,
            },
            {
                where: {
                    pet_id: petId
                }
            }
        )
        return pet;
    } catch (error) {
        throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);

    }
}

const updatePetUpdateNoFile = async (petId, petData) => {
    try {
        const pet = await Pet.update(
            {
                pet_species: petData.species,
                pet_breed: petData.breed,
                pet_name: petData.name,
                pet_birth: petData.birthDate,
                pet_weight: petData.weight,
                pet_gender: petData.gender,
                pet_neuter: petData.neuter,
                pet_etc: petData.etc,
            },
            {
                where: {
                    pet_id: petId
                }
            }

        )
        return pet;
    } catch (error) {
        throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);

    }
}

const deletePet = async (petId, petImage) => {
    console.log("petId")
    console.log(petId)
    console.log(petImage)
    if (petImage) {
        await imgNaverCloud.deleteImage(petImage);
    }

    try {
        const pet = await Pet.destroy(
            {
                where: {
                    pet_id: petId
                }
            },
        )
        return pet;
    } catch (error) {
        throw new Error(`Failed to fetch pet delete :  ${error.message}`)
    }
}
module.exports = {
    registerPet,
    getMyPets,
    getPetDetails,
    updatePetUpdateYesFile,
    updatePetUpdateNoFile,
    deletePet,

};