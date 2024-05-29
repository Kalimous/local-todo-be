const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const MONGODB_LOCAL_URI_PROD = process.env.MONGODB_LOCAL_URI_PROD;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);
app.use(express.urlencoded({ extended: true }));

const mongoUrI = MONGODB_LOCAL_URI_PROD;

mongoose
    .connect(mongoUrI)
    .then(() => {
        console.log("mongoose connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`server connected on ${port}`);
});
