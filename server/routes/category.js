const { Router } = require('express');
const { getAllCategory, createCategory } = require("../controllers/category");
const { checkRoleMiddleware } = require("../middleware/checkRoleMiddleware")
const multer  = require('multer')
const upload = multer()

const router = new Router();

router.get('/', getAllCategory)
router.post('/', checkRoleMiddleware, createCategory)

module.exports = router