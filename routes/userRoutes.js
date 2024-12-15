const express = require('express');
const router = express.Router();
const userDatabase = require('../database/userDatabase');

router.post('/user/register/information' , async(req, res) => {
    console.log("req.body")
    console.log(req.body)
    const formData = req.body;
    try{
        const user = await userDatabase.createUserInformation(formData)
        res.status(201).json({ user });
    }catch(error){
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})



module.exports = router;