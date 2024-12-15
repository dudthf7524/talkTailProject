const express = require('express');
const router = express.Router();
const userAuthorityRequestDatabase = require('../database/userAuthorityRequestDatabase');

router.post('/user/authority/request' , async(req, res) => {
    console.log("req.body")
    console.log(req.body)
    const userAuthorityData = req.body
    
    try{
        const userAuthority = await userAuthorityRequestDatabase.userAuthority(userAuthorityData);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})
router.get('/user/authority', async(req, res) => {
    console.log("req.body")
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    
    const business_registration_number = req.headers['business-registration-number']; // 헤더에서 사업자 번호를 추출
    console.log(business_registration_number)

    try{
        const userGetAuthority = await userAuthorityRequestDatabase.userGetAuthority(business_registration_number);
        res.json(userGetAuthority);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

router.get('/user/authority/available', async(req, res) => {
    console.log("req.body")
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    
    // const business_registration_number = req.headers['business-registration-number']; // 헤더에서 사업자 번호를 추출
    // console.log(business_registration_number)

    // try{
    //     const userGetAuthority = await userAuthorityRequestDatabase.userGetAuthorityAvailable(business_registration_number);
    //     res.json(userGetAuthority);
    // }catch(error){
    //     console.error('Failed to fetch authority request error: ', error);
    //     res.status(500).json({ message: 'Failed to fetch authority request.' });
    // }
})

module.exports = router;