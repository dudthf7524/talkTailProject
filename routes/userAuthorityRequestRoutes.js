const express = require('express');
const router = express.Router();
const userAuthorityRequestDatabase = require('../database/userAuthorityRequestDatabase');

router.post('/user/authority/request' , async(req, res) => {
    console.log("req.body")
    console.log(req.body)
    const userAuthorityData = req.body
    
    try{
        const pets = await userAuthorityRequestDatabase.userAuthority(userAuthorityData);
    }catch(error){
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }
})


module.exports = router;