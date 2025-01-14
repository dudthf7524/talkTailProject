const express = require('express');
const router = express.Router();
const userAuthorityRequestDatabase = require('../database/userAuthorityRequestDatabase');
const authMiddleware = require('../middleware/authMiddleware');
const userDatabase = require('../database/userDatabase');
const businessDatabase = require('../database/businessDatabase');
const kakaoProcess = require('../aligo_api/kakaoProcess');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post('/user/authority/request', authMiddleware, async (req, res) => {
    console.log("req.body")
    // console.log(req.body)
    console.log(req.user)
    const userAuthorityData = req.body
    const platform_id = req.user.id;
    try {
        const userAuthority = await userAuthorityRequestDatabase.userAuthority(userAuthorityData, platform_id);
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        return res.status(500).json({ message: 'Failed to fetch authority request.' });
    }

    let user_information = {};
   
    console.log(platform_id)

    try {
        user_information = await userDatabase.getUserInformation(platform_id)

    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        return res.status(500).json({ error: error.message });
    }

    console.log(user_information.user_name)
    console.log(user_information.user_phone)
    const business_owner_phone = req.body.business_owner_phone;
    try {
        req.body = []
        req.body.user_name = user_information.user_name;
        req.body.user_phone = user_information.user_phone;
        req.body.receiver_1 = business_owner_phone;
        console.log(req.body)
        const result = await kakaoProcess.authorityRequest(req, res)
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
    }

})
router.get('/user/authority', authMiddlewareSession, async (req, res) => {

    const business_registration_number = req.user.registrationNumber; // 헤더에서 사업자 번호를 추출

    try {
        const userGetAuthority = await userAuthorityRequestDatabase.userGetAuthority(business_registration_number);
        res.json(userGetAuthority);
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

router.get('/user/authority/available', authMiddleware, async (req, res) => {

    const user_id = req.user.id; // 헤더에서 사업자 번호를 추출
    console.log(user_id)

    try {
        const userGetAuthority = await userAuthorityRequestDatabase.userGetAuthorityAvailable(user_id);
        res.json(userGetAuthority);
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

router.put('/user/authority/state', authMiddlewareSession, async (req, res) => {
    console.log("req.params")
    const id = req.body.id;
    const authority_state = req.body.authority_state;
    const user_phone = req.body.user_phone;
    const business_registration_number = req.user.registrationNumber;
    console.log(id)
    console.log(authority_state)
    console.log(user_phone)
    console.log(business_registration_number)

    let business_name = '';
    let business_phone = '';

    try {
        const userGetAuthority = await userAuthorityRequestDatabase.authorityAvailableTrue(id, authority_state);
        
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        return res.status(500).json({ message: 'Failed to fetch authority request.' });
    }

    try {
        const getInformation = await businessDatabase.informationEditGet(business_registration_number);
        business_name = getInformation.business_name
        business_phone = getInformation.business_phone
       
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        return res.status(500).json({ message: 'Failed to fetch authority request.' });
    }



    try {
        req.body = []
        req.body.receiver_1 = user_phone;
        req.body.authority_state = authority_state;
        req.body.business_name = business_name;
        req.body.business_phone = business_phone;
        console.log(req.body)
        const result = await kakaoProcess.authorityYesOrNo(req, res)
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
    }

})

router.post('/user/authority/defense', authMiddleware, async (req, res) => {
    console.log("방어 라우트")

    console.log(req.user)
    console.log(req.body)
    const platform_id = req.user.id;
    const business_registration_number = req.body.business_registration_number;
    try {
        const userGetAuthority = await userAuthorityRequestDatabase.authorityDefense(platform_id, business_registration_number);
        console.log(userGetAuthority)
        res.json(userGetAuthority);
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})

module.exports = router;