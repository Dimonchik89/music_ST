const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const multer  = require('multer')
require("dotenv").config();
const router = require("./routes");
const path = require("path")
const fileUpload = require("express-fileupload");
const { sequelize } = require("./db/models/index")

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(cors())

app.use("/api", router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}

start()