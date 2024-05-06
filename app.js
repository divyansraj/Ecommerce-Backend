const express = require("express");
require("dotenv").config();
const app = express();

const morgan = require("morgan");
const cookieParser= require("cookie-parser");
const fileUpload = require("express-fileupload");

//for swagger documentation
const swaggerUi= require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("view engine", "ejs");

//regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie and file middlewares
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/",
}));

//morgan middleware
app.use(morgan("tiny"));

// importing all the routes here

const home = require("./routes/home");
const user = require("./routes/user");

app.use('/api/v2',home);
app.use('/api/v2',user);
app.use('/post',(req,res) => {
    res.render("postform")
})

module.exports = app;
