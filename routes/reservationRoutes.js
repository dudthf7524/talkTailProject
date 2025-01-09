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
    

    // try {
    //     const result = await reservationDatabase.beautyReservation(req.body)
    //     // if(result == "ddd"){
    //     //     console.log("데이터 저장 실패")
    //     // }
    //     // console.log(result)
    //     // if (result == "ddd") {
    //     //     // 데이터베이스 저장 실패
    //     //     return res.status(500).json({ message: 'Failed to save reservation' });
    //     // }
        
    //     // res.status(201).json({ result });
    // } catch (error) {
    //     console.error('Error saving reservation to database:', error.message);
    //     return res.status(500).json({ error: 'Database save failed' });
    // }
    
    try{
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
    }catch{
        console.error('Error saving reservation to database:', error.message);
        return res.status(500).json({ error: 'Database save failed' });
    }

    // if(result){
    //     req.body = []
    //     req.body.user_name = user_information.user_name;
    //     req.body.user_phone = user_information.user_phone;
    //     req.body.receiver_1 = business_owner_phone;
    //     req.body.beauty_style = beauty_style;
    //     req.body.start_time = star_time;
    //     console.log(req.body)
    //     kakaoProcess.reservationReception(req, res)
        
    // }else{
    //     result = "데이터베이스 저장 불가에 따른 알림톡 전송 실패";
    // }
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

router.put('/beauty/reservation/reject/:id', async (req, res) => {
    console.log(req.params)
    console.log(req.body)

    const beauty_reservation_id = req.params.id;
    const reject_content = req.body.rejectComment;

    console.log(beauty_reservation_id)
    console.log(reject_content)    
    try {
        const result = await reservationDatabase.beautyReservationReject(beauty_reservation_id, reject_content)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})


module.exports = router;