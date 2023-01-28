const { Router } = require("express")
const { create, getAll, deleteAudio, update } = require("../controllers/audio")
const {checkRoleMiddleware} = require("../middleware/checkRoleMiddleware")

const router = new Router()

router.get('/', getAll)
router.post('/',checkRoleMiddleware, create)
router.delete('/:id', checkRoleMiddleware, deleteAudio)
router.patch('/:id', checkRoleMiddleware, update)

module.exports = router