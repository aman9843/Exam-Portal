const express = require('express')
const router = express.Router()


const {createCategory,getAllCategory,getCategoryById, deleteCategory, updateCategory} = require('../controllers/categoryController')
const {protect,admin} = require('../middleware/authmiddleware')

///routing
router.route('/addcategory',protect,admin).post(createCategory)
router.route('/allcategory').get(getAllCategory)
router.route('/getcategory/:id').get(getCategoryById)
router.route('/allcategory/:id').delete(protect,admin,deleteCategory).put(protect,admin,updateCategory)

module.exports = router;