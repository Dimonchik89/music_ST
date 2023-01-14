const { sequelize } = require("../db/models/index")
const uuid = require("uuid")
const path = require("path")

const getAllCategory = async (req, res) => {
    const category = await sequelize.models.category.findAll()
    return res.status(200).json(category)
}

const createCategory = async (req, res) => {
    const { name } = req.body
    const { img } = req.files
    console.log(img);
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, "..", "static", fileName))
    const category = await sequelize.models.category.create({name, img: fileName})
    return res.status(200).json('category')
}

module.exports = {
    getAllCategory,
    createCategory
}