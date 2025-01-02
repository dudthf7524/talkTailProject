const express = require('express');
const router = express.Router();
const kakao = require('../aligo_api/kakao');

router.post('/akv10/alimtalk/send', (req, res) =>{
    console.log('카카오 api 처리코드')
    console.log(req.body)
    console.log('카카오 api 처리코드')
    kakao.alimtalkSend(req, res);
    

})




module.exports = router;