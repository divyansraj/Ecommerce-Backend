require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary")

//connecting with Database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_API_SECRETKEY,
});

const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server is running successfully at Port ${PORT}`);
// });
module.exports = app; // Export Express app for serverless environments