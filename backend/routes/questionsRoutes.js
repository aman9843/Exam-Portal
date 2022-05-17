const express = require('express')
const router = express.Router()


const {protect,admin} = require('../middleware/authmiddleware')
const {createQuestion,getAllQuestions,getQuestionsById,deleteQuestions,updateQuestions} = require('../controllers/questionsController')


router.route('/').post(protect,createQuestion).get(protect,admin,getAllQuestions)
router.route('/:id').get(protect,getQuestionsById).delete(protect,admin,deleteQuestions).put(protect,admin,updateQuestions)

module.exports = router;