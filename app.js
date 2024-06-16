const path = require("path");
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

// Use Helmet with CSP middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"],
    },
  })
);

app.set("view engine", "ejs");

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie and file middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.resolve(__dirname, "tmp"), // Use 'tmp' instead of 'temp'
  })
);

// Morgan middleware
app.use(morgan("tiny"));

// Importing all the routes here
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");

// Router middleware
app.use("/api/v2", home);
app.use("/api/v2", user);
app.use("/api/v2", product);
app.use("/post", (req, res) => {
  res.render("postform");
});

// Export app.js
module.exports = app;
