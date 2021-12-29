const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const routes = require("./src/routes")
const { errorResponder, invalidPath } = require("./src/middlewares/errors")

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
    res.status(200).send(
        {status: "operational",
        message: "view documentation on https://github.com/bellomuboye/l21-standardization#readme"})
});

app.use("/api", routes)

app.use(errorResponder)
app.use(invalidPath)

module.exports = app;

