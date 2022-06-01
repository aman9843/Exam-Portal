const express = require('express')
const router = express.Router()


const {protect,admin} = require('../middleware/authmiddleware')
const {createOrder, getOrderByUserId, getAllOrder, deleteOrder} = require('../controllers/subscriptionController')


router.route('/').post(protect,createOrder).get(protect,admin,getAllOrder)
router.route('/:id').get(protect,getOrderByUserId).delete(protect,admin,deleteOrder)



module.exports = router;