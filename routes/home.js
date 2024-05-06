const express = require("express");
const router = express.Router();

const { home , product} = require("../controllers/homeController");

router.route("/").get(home);
router.route('/product').get(product)

module.exports= router;