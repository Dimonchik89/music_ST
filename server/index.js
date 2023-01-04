const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const multer  = require('multer')
require("dotenv").config();
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload.array())
app.use(cors())

app.use("/api", router)

app.listen(PORT, () => {
    console.log("Server start");
})