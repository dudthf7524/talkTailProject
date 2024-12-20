const express = require('express');
const router = express.Router();
const kakao = require('../aligo_api/kakao');

router.post('/akv10/alimtalk/send', (req, res) =>{
    console.log('카카오 api 처리코드')
    console.log(req.body)
    console.log('카카오 api 처리코드')
    kakao.alimtalkSend(req, res);
    const senderkey = '89df6266d96c0663c9263f3ff08986bcde7e4124'
    req.body.senderkey = senderkey;

})




module.exports = router;