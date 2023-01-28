const { Router } = require("express");
const user = require("./user");
const category = require("./category");
const audio = require("./audio");

const router = new Router();

router.use("/user", user)
router.use("/category", category)
router.use('/music', audio)

module.exports = router