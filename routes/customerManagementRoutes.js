const express = require('express');
const router = express.Router();
const customerManagementDatabase = require('../database/customerManagementDatabase');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/customer/management',authMiddlewareSession ,  async (req, res) => {
    const business_registration_number = req.user.business_registration_number;
    
    try {
        const result = await customerManagementDatabase.customerManagementGet(business_registration_number)
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

})

router.post('/customer/notice/write/:id', async (req, res) => {
    const idData = req.params;

    id = idData.id


    const data = req.body;


    let notice_skin = "";
    let notice_ear = "";
    let notice_eye = "";
    let notice_sole = "";
    let notice_claw = "";

    const notice_skin_Array = req.body.selectedMultipleOptions.notice_skin

    for(let i = 0; i<notice_skin_Array.length; i++){
        notice_skin += notice_skin_Array[i];
        if (i < notice_skin_Array.length - 1) {
            notice_skin += "/";
        }
    }
    const notice_ear_Array = req.body.selectedMultipleOptions.notice_ear

    for(let i = 0; i<notice_ear_Array.length; i++){
        notice_ear += notice_ear_Array[i];
        if (i < notice_ear_Array.length - 1) {
            notice_ear += "/";
        }
    }
    const notice_eye_Array = req.body.selectedMultipleOptions.notice_eye

    for(let i = 0; i<notice_eye_Array.length; i++){
        notice_eye += notice_eye_Array[i];
        if (i < notice_eye_Array.length - 1) {
            notice_eye += "/";
        }
    }
    const notice_sole_Array = req.body.selectedMultipleOptions.notice_sole

    for(let i = 0; i<notice_sole_Array.length; i++){
        notice_sole += notice_sole_Array[i];
        if (i < notice_sole_Array.length - 1) {
            notice_sole += "/";
        }
    }
    const notice_claw_Array = req.body.selectedMultipleOptions.notice_claw

    for(let i = 0; i<notice_claw_Array.length; i++){
        notice_claw += notice_claw_Array[i];
        if (i < notice_claw_Array.length - 1) {
            notice_claw += "/";
        }
    }
   
    req.body.selectedMultipleOptions.notice_skin = notice_skin;
    req.body.selectedMultipleOptions.notice_ear = notice_ear;
    req.body.selectedMultipleOptions.notice_eye = notice_eye;
    req.body.selectedMultipleOptions.notice_sole = notice_sole;
    req.body.selectedMultipleOptions.notice_claw = notice_claw;

    if(!req.body.selectedOptions.notice_hairTangling_tf){
        req.body.formData.notice_hairTangling = "없음";
    }


    
    try {
        const result = await customerManagementDatabase.customerNoticeWrite(id, data);
        const result2 = await customerManagementDatabase.customerNoticeTrue(id);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

})

router.get('/customer/notice/list',authMiddleware, async (req, res) => {
    const platform_id = req.user.id;
    console.log(platform_id)

    
    try {
        const result = await customerManagementDatabase.customerNoticeList(platform_id);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/customer/business/notice/detail/:id',authMiddlewareSession, async (req, res) => {
    const id  = req.params.id;
    
    try {
        const result = await customerManagementDatabase.customerBusinessNoticeDetail(id);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.get('/customer/notice/detail/:id',authMiddleware, async (req, res) => {
    const platform_id = req.user.id;
    const id  = req.params.id;
    console.log(id)
    
    try {
        const result = await customerManagementDatabase.customerNoticeDetail(id);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;