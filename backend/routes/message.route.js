const express = require('express');
const router = express.Router();

const {sendMessage,getUsers,getMessage} = require('../controllers/message.controller.js');
const {protectRoute} = require('../middlewares/protectRoute.js')

router.get('/users',protectRoute,getUsers);
router.get('/:id',protectRoute,getMessage);
router.post('/send/:id',protectRoute,sendMessage);

module.exports = router;