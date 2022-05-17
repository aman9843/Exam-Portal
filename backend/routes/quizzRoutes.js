const express = require('express')
const router = express.Router()


const {protect,admin} = require('../middleware/authmiddleware')
const {createQuizz,getAllQuizz,getQuizzById,deleteQuizz,updateQuizz} = require('../controllers/quizzController')


router.route('/quizz').post(protect,admin,createQuizz).get(protect,admin,getAllQuizz)
router.route('/quizz/:id').get(protect,getQuizzById).delete(protect,admin,deleteQuizz).put(protect,updateQuizz)

module.exports = router;