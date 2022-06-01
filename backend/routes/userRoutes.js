const express = require('express')
const router = express.Router()

const {registerNewUser, login, getUser, deleteUser, updateUserById} = require('../controllers/userController')
const {protect,admin} = require('../middleware/authmiddleware')


// routing through register user (Post)

router.route('/register').post(registerNewUser)
router.route('/login').post(login)
router.route('/profile').get(protect,getUser)

router.route('/profile/:id').delete(protect,admin,deleteUser).put(protect,updateUserById).get(protect,getUser)



module.exports = router;