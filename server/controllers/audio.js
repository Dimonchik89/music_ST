const { sequelize, Sequelize } = require("../db/models/index")
const Op = Sequelize.Op;
const uuid = require("uuid")
const path = require("path")

const create = async (req, res) => {
    const {name, categoryId, keywords} = req.body
    const {audio, img} = req.files
    const audioExtension = audio.name.split(".").pop()
    const imgExtension = img.name.split(".").pop()

    const audioName = uuid.v4() + `.${audioExtension}`
    const imgName = uuid.v4() + `.${imgExtension}`

    audio.mv(path.resolve(__dirname, "..", "static/music/audio", audioName))
    img.mv(path.resolve(__dirname, "..", "static/music/logo", imgName))
    const music = await sequelize.models.Audio.create({name, categoryId, keywords, audio: `music/audio/${audioName}`, img: `music/logo/${imgName}`})
    return res.json(music)
}

const getAll = async (req, res) => {
    let {categoryId, keywords, limit, page} = req.query
    const lookupValue = keywords?.toLowerCase()
    page = page || 1
    limit = limit || 9
    const offset = page * limit - limit
    let audio;
    if(categoryId && !keywords) {
        audio = await sequelize.models.Audio.findAndCountAll({where: { categoryId: {[Op.like]: `%${categoryId}%`}}, limit, offset})
    } if(!categoryId && keywords) {
        // audio = await sequelize.models.Audio.findAndCountAll({where: { keywords: {[Op.like]: `%${keywords}%`}}, limit, offset})
        audio = await sequelize.models.Audio.findAndCountAll({where: { keywords: sequelize.where(sequelize.fn('LOWER', sequelize.col("keywords")), 'LIKE', `%${lookupValue}%`)}, limit, offset})
    } if(categoryId && keywords) {
        audio = await sequelize.models.Audio.findAndCountAll({where: { keywords: sequelize.where(sequelize.fn('LOWER', sequelize.col("keywords")), 'LIKE', `%${lookupValue}%`)}, limit, offset})
    } if(!categoryId && !keywords) {
        audio = await sequelize.models.Audio.findAndCountAll({limit, offset})
    }
    return res.json(audio)
}

const deleteAudio = async (req, res) => {
    const {id} = req.params
    const audio = await sequelize.models.Audio.destroy({where: { id }})
    return res.json({message: `Track ${id} delete`})
}

const update = async (req, res) => {
    const {id} = req.params
    const { ...tailData } = req.body
    const audio = await sequelize.models.Audio.update({...tailData}, {where: { id }})
    return res.json(audio)
}

module.exports = {
    create,
    getAll,
    deleteAudio,
    update
}