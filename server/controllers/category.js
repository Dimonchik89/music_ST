const { sequelize } = require("../db/models/index")
const uuid = require("uuid")
const path = require("path")

const getAllCategory = async (req, res) => {
    const category = await sequelize.models.category.findAll()
    return res.status(200).json(category)
}

const createCategory = async (req, res) => {
    const { name } = req?.body
    const { img } = req?.files
    const fileExtension = img.name.split(".").pop()
    let fileName = uuid.v4() + `.${fileExtension}`
    img.mv(path.resolve(__dirname, "..", "static/category", fileName))
    const category = await sequelize.models.category.create({name, img: fileName})
    return res.status(200).json(category)
}

const deleteCategory = async (req, res) => {
    const {id} = req.params
    const category = await sequelize.models.category.destroy({where: { id }})
    return res.json({message: `CetagoryId ${id} delete`})
}

const changeCategory = async (req, res) => {
    const {id} = req.params
    const {...tailData} = req.body
    const category = await sequelize.models.category.update({...tailData}, { where: { id }})
    const newCategory = await sequelize.models.category.findOne({where: { id }})
    return res.json(newCategory)
}

module.exports = {
    getAllCategory,
    createCategory,
    deleteCategory,
    changeCategory
}