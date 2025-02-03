const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const authMiddleware = require('../middleware/authMiddleware');
const reservationDatabase = require('../database/reservationDatabase');
const { alimtalkSend } = require('../aligo_api/kakao');
const kakao = require('../aligo_api/kakao');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const userDatabase = require('../database/userDatabase');
const kakaoProcess = require('../aligo_api/kakaoProcess');
const { format, parse, addMinutes } = require('date-fns');


router.post('/beauty/reservation', authMiddleware, async (req, res) => {


    const currentDateTime = dayjs();
    const formattedDateTime = currentDateTime.format('YYYY-MM-DD HH:mm');
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

    const platform_id = req.user.id
    req.body.platform_id = platform_id;
    let user_information = {};

    try {
        user_information = await userDatabase.getUserInformation(platform_id)

    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

    const business_owner_phone = req.body.business_owner_phone;
    const beauty_style = req.body.beauty_style;
    const star_time = req.body.startTime;


    try {
        const result = await reservationDatabase.beautyReservation(req.body)

    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
    }

    try {
        req.body = []
        req.body.user_name = user_information.user_name;
        req.body.user_phone = user_information.user_phone;
        req.body.receiver_1 = business_owner_phone;
        req.body.beauty_style = beauty_style;
        req.body.start_time = star_time;
        console.log(req.body)
        const result = await kakaoProcess.reservationReception(req, res)
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
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
    const date = req.params.date;

    try {
        const result = await reservationDatabase.beautyReservationDetail(id)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

});

router.get('/beauty/reservation/detail/:id/:date', async (req, res) => {

    const id = req.params.id;
    const date = req.params.date;

    console.log('routes')
    console.log(date)
    try {
        const result = await reservationDatabase.beautyReservationDetail(id)
        const 요일 = 4;
        console.log()
        console.log('aaaaaaaaa')
        var hourDay;
        for (let i = 0; i < Object.keys(result.hours).length; i++) {
            if (i == 요일) {
                hourDay = result.hours[i]
            }
        }
        console.log(hourDay)
        const resultTime = await reservationDatabase.beautyReservationTime(date)
        console.log(resultTime)
        const results = [result, resultTime, hourDay];
        res.status(201).json(results);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

});

router.put('/beauty/reservation/setCompleteTime/:id', async (req, res) => {
    const id = req.params.id;
    const reservationCompleteTime = req.body.reservationCompleteTime;
    const beauty_price = Number(req.body.beauty_price);
    const business_name = req.body.business_name;
    const business_phone = req.body.business_phone;
    const start_time = req.body.start_time;
    const date = req.body.date;
    const user_phone = req.body.user_phone;
    const paid_price = req.body.paid_price;
    console.log(req.body)
    console.log(id)
    console.log(reservationCompleteTime)
    console.log(beauty_price)
    console.log(typeof beauty_price)
    console.log(business_name)
    console.log(business_phone)
    console.log(start_time)
    console.log(date)
    console.log(user_phone)
    console.log(paid_price)
    console.log(typeof paid_price)
    req.body.reservationDate = date + " " + start_time + "~" + reservationCompleteTime;
    const paid_prices = paid_price + beauty_price;

    console.log(paid_prices)

    try {
        const result = await reservationDatabase.setCompleteTime(id, reservationCompleteTime, beauty_price, paid_prices)

    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }


    try {
        req.body.receiver_1 = user_phone;


        console.log(req.body)
        const result = await kakaoProcess.reservationComplete(req, res)
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
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

router.put('/beauty/reservation/reject/:id', async (req, res) => {
    console.log(req.params)
    console.log(req.body)

    const beauty_reservation_id = req.params.id;
    const reject_content = req.body.rejectComment;
    const user_phone = req.body.user_phone
    console.log(beauty_reservation_id)
    console.log(reject_content)

    try {
        const result = await reservationDatabase.beautyReservationReject(beauty_reservation_id, reject_content)

    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

    try {
        req.body.receiver_1 = user_phone;
        console.log(req.body)
        const result = await kakaoProcess.reservationReject(req, res)
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
    }

})

router.post('/beauty/reservation/timeCheck', async (req, res) => {
    console.log(req.body)

    const reservationTime = req.body.activeTime;
    console.log(reservationTime)

    // const user_phone  =req.body.user_phone

    try {
        const result = await reservationDatabase.beautyTimeCheck(reservationTime)

    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

    // try{
    //     req.body.receiver_1 = user_phone;
    //     console.log(req.body)
    //     const result = await kakaoProcess.reservationReject(req, res)
    //     console.log(result)
    //     res.status(201).json(result);
    // }catch (error){
    //     console.error('Error saving reservation to database:', error.message);
    //     return res.status(500).json({ error: 'Database save failed' });
    // }

})


router.get('/reservation/hours', authMiddlewareSession, async (req, res) => {
    console.log('aaaa')
    console.log(req.user.registrationNumber)

    const business_registration_number = req.user.registrationNumber


    try {
        const result = await reservationDatabase.businessHours(business_registration_number)
        res.json(result)
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.post('/reservation/business', authMiddlewareSession, async (req, res) => {
    console.log('aaaa');
    console.log(req.body);

    const data = req.body;
    const business_registration_number = req.user.registrationNumber;
    console.log(business_registration_number);
    data.business_registration_number = business_registration_number;

    // 현재 시간 추가 (형식: YYYY-MM-DD HH:mm)
    const now = format(new Date(), 'yyyy-MM-dd HH:mm');
    console.log(now);
    data.now = now;

    for (let i = 0; i < data.time.length; i++) {

        const dateObj = parse(data.time[i], "HH:mm", new Date());
        const newTime = addMinutes(dateObj, 30);
        const formattedTime = format(newTime, "HH:mm");
        console.log(data.time[i])
        console.log(formattedTime)

        data.start_time = data.time[i];
        data.end_time = formattedTime;


        try {
            const result = await reservationDatabase.businessReservation(data);
           
        } catch (error) {
            console.error('Error fetching userInformation:', error.message);
            res.status(500).json({ error: error.message });
        }
    }


});


module.exports = router;