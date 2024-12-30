const express = require('express');
const router = express.Router();
const userAuthorityRequestDatabase = require('../database/userAuthorityRequestDatabase');
const authMiddleware = require('../middleware/authMiddleware');

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
    
    const user_id = req.headers['user-id']; // 헤더에서 사업자 번호를 추출
    console.log(user_id)

    try{
        const userGetAuthority = await userAuthorityRequestDatabase.userGetAuthorityAvailable(user_id);
        res.json(userGetAuthority);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

router.put('/user/authority/true', async(req, res) => {
    console.log("req.params")
    console.log(req.body)
    console.log(req.body.id)
    const id = req.body.id;
    
    try{
        const userGetAuthority = await userAuthorityRequestDatabase.authorityAvailableTrue(id);
        res.json(userGetAuthority);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

router.post('/user/authority/defense',authMiddleware, async(req, res) => {
   console.log("방어 라우트")
 
   console.log(req.user)
   console.log(req.body)
   const platform_id = req.user.id;
   const business_registration_number = req.body.business_registration_number;
    try{
        const userGetAuthority = await userAuthorityRequestDatabase.authorityDefense(platform_id, business_registration_number);
        res.json(userGetAuthority);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

module.exports = router;