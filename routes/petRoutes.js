const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
// const designerDatabase = require('../database/designerDatabase');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const petDatabase = require('../database/petDatabase');

router.post('/pet/register', upload.single('image'), authMiddleware, async (req, res) => {
    const { id, platform } = req.user;
    const petData = req.body;
    console.log(id)
    console.log(platform)
    console.log(petData)
    if (req.file) {
        console.log('Uploaded file info:', req.file); // 업로드된 파일의 정보 출력
        petData.image = {
            buffer: req.file.buffer, // 이미지 데이터
            originalname: req.file.originalname, // 업로드된 파일의 이름
            folder: 'pet_images' // 이미지 저장할 폴더 이름
        };
    } else {
        console.log('No file uploaded');
    }
    petData.platform_id = id;
    petData.platform = platform;

    console.log('Processed pet data:', petData);

    try {
        const pet = await petDatabase.registerPet(petData);
        console.log(pet)
        res.status(201).json(pet);
    } catch (error) {
        console.error('Failed to register pet error: ', error);
        res.status(500).json({ message: 'Failed to register pet.' });
    }
});

module.exports = router;