const express = require('express');
const router = express.Router();

const {signup,login,logout,updateProfile,check} = require('../controllers/user.controller.js');
const {protectRoute} = require('../middlewares/protectRoute.js')

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/updateprofile',protectRoute,updateProfile);
router.get('/check',protectRoute,check)


module.exports = router;