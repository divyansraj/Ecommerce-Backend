const express = require("express");
const router = express.Router();

const { isLoggedIn, customRoles } = require("../middlewares/user");
const { testProduct } = require("../controllers/productController");



router.route("/testproduct").get(testProduct)


module.exports = router