const express = require("express");
const router = express.Router();

const { isloggedin, customRoles } = require("../middlewares/user");
const {
  addProduct,
  adminGetAllProducts,
  adminUpdateOneProduct,
  getallProducts,
  getOneproduct,
  adminDeleteOneProduct,
} = require("../controllers/productController");

//user
router.route("/products").get(getallProducts);
router.route("/product/:id").get(getOneproduct);

//admin
router
  .route("/admin/products/add")
  .post(isloggedin, customRoles("admin"), addProduct);
router
  .route("/admin/products")
  .get(isloggedin, customRoles("admin"), adminGetAllProducts);
router
  .route("/admin/product/:id")
  .put(isloggedin, customRoles("admin"), adminUpdateOneProduct)
  .delete(isloggedin, customRoles("admin"), adminDeleteOneProduct)
  ;

module.exports = router;
