const express = require('express');
const router = express.Router();
const customerManagementDatabase = require('../database/customerManagementDatabase');

router.get('/customer/management', async (req, res) => {
    const business_registration_number = req.user.business_registration_number;
    console.log(business_registration_number)
    try {
        const result = await customerManagementDatabase.customerManagementGet(business_registration_number)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

router.post('/customer/notice/write/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const id = req.params;
    
    try {
        const result = await customerManagementDatabase.customerNoticeWrite(id, data);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;