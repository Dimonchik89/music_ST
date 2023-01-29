const { sequelize } = require("../db/models/index")
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")

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
    if(!id) {
        return res.json({message: "Id is not defined"})
    }
    const category = await sequelize.models.category.findOne({where: { id }})

    if(!category) {
        return res.json({message: "Cetagory is not defined"})
    }
    fs.unlink(path.resolve(__dirname, "..", "static/category", category.img), async err => {
        if(err) throw err;
        const deletedCategory = await sequelize.models.category.destroy({where: { id }})
        return res.json({message: `CetagoryId ${id} delete`})
    })
}

const changeCategory = async (req, res) => {
    const {id} = req.params
    let img;
    if(req.files) {
        img = req.files.img
    }
    const {...tailData} = req.body

    if(!id) {
        return res.json({message: "id is not defined"})
    }
    const category = await sequelize.models.category.findOne({where: { id }})

    if(!category) {
        return res.json({message: "Category is not defined"})
    }

    if(img) {
        fs.unlink(path.resolve(__dirname, "..", "static/category", category.img), async err => {
            if(err) throw err
            const fileExtension = img.name.split(".").pop()
            let fileName = uuid.v4() + `.${fileExtension}`
            img.mv(path.resolve(__dirname, "..", "static/category", fileName))
            const updateCategory = await sequelize.models.category.update({...tailData, img: fileName}, { where: { id }})
            const newCategory = await sequelize.models.category.findOne({where: { id }})
            return res.json(newCategory)
        })
    } else {
        const updateCategory = await sequelize.models.category.update({...tailData}, { where: { id }})
        const newCategory = await sequelize.models.category.findOne({where: { id }})
        return res.json(newCategory)
    }

}

module.exports = {
    getAllCategory,
    createCategory,
    deleteCategory,
    changeCategory
}