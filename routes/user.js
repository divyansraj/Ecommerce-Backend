const express= require('express');
const router = express.Router();

const {signup,login,logout,resetPasswords} = require('../controllers/userController')

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/resetPasswords").post(resetPasswords);

module.exports = router