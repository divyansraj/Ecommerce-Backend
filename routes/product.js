const express = require("express");
const router = express.Router();

const { isloggedin, customRoles } = require("../middlewares/user");
const { addProduct,getallProducts } = require("../controllers/productController");


//user
router.route("/products").get(getallProducts);

//admin
router
  .route("/admin/products/add")
  .post(isloggedin, customRoles("admin"), addProduct);


module.exports = router