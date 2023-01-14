const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const multer  = require('multer')
require("dotenv").config();
const router = require("./routes");
const path = require("path")
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 4000;
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(cors())

app.use("/api", router)

app.listen(PORT, () => {
    console.log("Server start");
})