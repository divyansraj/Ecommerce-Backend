const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please entyer your name"],
    maxlength: [40, "Enter your name within 40 letters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Email should be in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: [6, "Password should be atleast 6 characters long"],
    select: false,
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//pre hook for userSchema

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

//methods in userSChemas

//validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password);
};

//create and generate jwt token
userSchema.methods.getTwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.getforgotPasswordToken = function (){
  // //generate a random long string
  // const forgotPassword = crypto.randomBytes(20).toString("hex");

  // //getting a hash - make sure to get a hash on backend
  // this.forgotPasswordToken = crypto.createHash("sha256").update(forgotPassword).digest("hex");

  // //time of token
  // this.forgotPasswordExpiry =Date.now() + 20*60*1000;

  // return forgotPassword;

  // Generate JWT token with user ID and email as payload
  const forgotPassword = jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRETKEY,
    { expiresIn: "30m" }
  );

  // Set the generated token to the user's forgotPasswordToken field
  this.forgotPasswordToken = forgotPassword;
  this.forgotPasswordExpiry=Date.now() +30*60*1000;
  // Return the generated token
  return forgotPassword;
}

module.exports = mongoose.model("User", userSchema);
