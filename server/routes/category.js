const { Router } = require('express');
const { getAllCategory, createCategory } = require("../controllers/category");
const multer  = require('multer')
const upload = multer()

const router = new Router();

router.get('/', getAllCategory)
router.post('/', createCategory)

module.exports = router