const express = require('express');
const router = express.Router();
const customerManagementDatabase = require('../database/customerManagementDatabase');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.get('/customer/management',authMiddlewareSession ,  async (req, res) => {
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
    const idData = req.params;

    id = idData.id


    const data = req.body;
    try {
        const result = await customerManagementDatabase.customerNoticeWrite(id, data);
        const result2 = await customerManagementDatabase.customerNoticeTrue(id);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;