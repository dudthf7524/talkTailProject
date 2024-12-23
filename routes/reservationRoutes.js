const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const authMiddleware = require('../middleware/authMiddleware');
const reservationDatabase = require('../database/reservationDatabase');
const { alimtalkSend } = require('../aligo_api/kakao');
const kakao = require('../aligo_api/kakao');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post('/beauty/reservation', authMiddleware, async (req, res) => {
    console.log(req.user)
    req.body.platform_id = req.user.id;
    console.log("req.body")
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
        res.status(201).json({ result });
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/beauty/reservation', async (req, res) => {
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
    const id  = req.params.id;
    try {
        const result = await reservationDatabase.beautyReservationDetail(id)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.put('/beauty/reservation/setCompleteTime/:id', async (req, res) => {
    const id  = req.params.id;
    const reservationCompleteTime = req.body.reservationCompleteTime;

    try {
        const result = await reservationDatabase.setCompleteTime(id, reservationCompleteTime)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;