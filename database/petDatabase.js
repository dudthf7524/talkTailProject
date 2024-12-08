const Pet = require('../models/Pet');
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

        // 이미지 처리
        let petImg = null;
        if (petData.image) {
            petImg = await imgNaverCloud.uploadPetImage(petData.image, petId, 'pet');
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
        
        return { pet, petImg};
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

module.exports = {
    registerPet,
  
};