const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetails,
  changePassword,
  updateuserDetails,
  adminUsers,
  managerUsers,
  getOneUser,
  updateOneUserdetails,
  deleteUser
} = require("../controllers/userController");
const { isloggedin, customRoles } = require("../middlewares/user");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/userdashboard").get(isloggedin, userDetails);
router.route("/password/update").post(isloggedin, changePassword);
router.route("/userdashboard/update").post(isloggedin, updateuserDetails);

router.route("/admin/users").get(isloggedin, customRoles("admin"), adminUsers);
router
  .route("/admin/user/:id")
  .get(isloggedin, customRoles("admin"), getOneUser)
  .put(isloggedin, customRoles("admin"), updateOneUserdetails)
  .delete(isloggedin, customRoles("admin"),deleteUser);
router
  .route("/manager/users")
  .get(isloggedin, customRoles("manager"), managerUsers);

module.exports = router;
