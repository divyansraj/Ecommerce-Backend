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
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

// Ensure the temp directory exists
const tempDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie and file middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
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
