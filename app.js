const express = require("express");
require("dotenv").config();
const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers.

const app = express();

// Use Helmet with CSP middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"], // Allow fonts to be loaded from the same origin and data URIs
      // Add other directives as needed
    },
  })
);

const morgan = require("morgan");
const cookieParser= require("cookie-parser");
const fileUpload = require("express-fileupload");

//for swagger documentation
// const swaggerUi= require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
const product = require("./routes/product");

//router middleware
app.use('/api/v2',home);
app.use('/api/v2',user);
app.use('/api/v2',product);
app.use('/post',(req,res) => {
    res.render("postform")
})

//export app.js
module.exports = app;
