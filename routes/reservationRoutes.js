const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const authMiddleware = require('../middleware/authMiddleware');
const reservationDatabase = require('../database/reservationDatabase');
const { alimtalkSend } = require('../aligo_api/kakao');
const kakao = require('../aligo_api/kakao');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const userDatabase = require('../database/userDatabase');

router.post('/beauty/reservation', authMiddleware, async (req, res) => {
    console.log(req.user)
    console.log("여기까지")
    const platform_id = req.user.id
    let user_information = {};

    try {
        user_information = await userDatabase.getUserInformation(platform_id)
       
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

    console.log('user_information', user_information.user_name)
    console.log('user_information', user_information.user_phone)
    
    req.body.platform_id = req.user.id;

    console.log(req.body)
    const currentDateTime = dayjs();
    const formattedDateTime = currentDateTime.format('YYYY-MM-DD HH:mm');
    console.log(formattedDateTime)

    req.body.reservationApplicationTime = formattedDateTime;

    // 특이사항 알고리즘
    let significantSum = "";
    for (let i = 0; i < req.body.beauty_significant.length; i++) {

        significantSum += req.body.beauty_significant[i];
        if (i < req.body.beauty_significant.length - 1) {
            significantSum += "/";
        }
    }
    // 특이사항 알고리즘

    req.body.beauty_significant = significantSum
    console.log(req.body)

    try {
        const result = await reservationDatabase.beautyReservation(req.body)
        req.body.user_name = user_information.user_name;
        req.body.user_phone = user_information.user_phone;
        kakao.alimtalkSend(req, res);
        res.status(201).json({ result });
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/beauty/reservation', authMiddlewareSession, async (req, res) => {
    console.log("req.session")
    console.log(req.session)
    console.log("req.session")
    console.log(req.user)
    const business_registration_number = req.user.business_registration_number;

    try {
        const result = await reservationDatabase.beautyReservationGet(business_registration_number)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/beauty/reservation/detail/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await reservationDatabase.beautyReservationDetail(id)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.put('/beauty/reservation/setCompleteTime/:id', async (req, res) => {
    const id = req.params.id;
    const reservationCompleteTime = req.body.reservationCompleteTime;

    try {
        const result = await reservationDatabase.setCompleteTime(id, reservationCompleteTime)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.get('/beauty/reservation/date/:id', async (req, res) => {
    const designerId = req.params.id;
    try {
        const result = await reservationDatabase.beautyReservationDesinger(designerId)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/beauty/reservation/desinger/:id', async (req, res) => {
    const designerId = req.params.id;
    console.log("designerId")
    console.log(designerId)

    try {
        const result = await reservationDatabase.beautyReservationDesinger(designerId)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;