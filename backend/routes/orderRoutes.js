const express = require('express')
const router = express.Router()


const {protect,admin} = require('../middleware/authmiddleware')
const {createOrder, getOrderByUserId} = require('../controllers/subscriptionController')


router.route('/').post(protect,createOrder)
router.route('/:id').get(protect,getOrderByUserId)



module.exports = router;