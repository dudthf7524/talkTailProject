const express = require('express');
const router = express.Router();
const userDatabase = require('../database/userDatabase');
const authMiddleware = require('../middleware/authMiddleware');

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

router.get('/user/profile' ,authMiddleware , async(req, res) => {
    const platform_id = req.user.id
    const platform = req.user.platform

    try{
        const user = await userDatabase.getUserById(platform_id, platform)
        res.status(201).json({ user });
    }catch(error){
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.get('/user/information' ,authMiddleware , async(req, res) => {
    const platform_id = req.user.id
    try{
        const user = await userDatabase.getUserInformation(platform_id)
        res.status(201).json({ user });
    }catch(error){
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.put('/user/edit', async(req, res) => {
    
    console.log(req.body)
    const userEditData = req.body;
    try{
        const user = await userDatabase.userEidt(userEditData)
        res.status(201).json({ user });
    }catch(error){
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})
router.get('/user/reservation', authMiddleware, async(req, res) => {
    console.log("useruseruser")
    console.log(req.user)

    const platform_id = req.user.id

    try{
        const reservation = await userDatabase.userReservation(platform_id)
        
        console.log("reservation")
        console.log(reservation)
        console.log("reservation")
        res.status(201).json({ reservation });
    }catch(error){
        console.error('Error fetching userIformation:', error.message);
        res.status(500).json({ error: error.message });
    }
})

router.get('/user/login/pet', authMiddleware, async(req, res) => {
    console.log("useruseruser")
    console.log(req.user)

    const platform_id = req.user.id

    try{
        const result = await userDatabase.userLoginPet(platform_id)
        res.status(201).json( result );
    }catch(error){
        console.error(error)
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;