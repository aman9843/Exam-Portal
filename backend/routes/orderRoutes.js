const express = require('express')
const router = express.Router()


const {protect,admin} = require('../middleware/authmiddleware')
const {createOrder} = require('../controllers/subscriptionController')


router.route('/').post(protect,createOrder)


module.exports = router;