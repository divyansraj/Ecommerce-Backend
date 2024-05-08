const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const mailHelper = require("../utils/mailHelper");

exports.signup = async (req, res, next) => {
  try {
    let result;
    if (!req.files) {
      return next(Error("Please select a phot to upload"));
    }

    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return next(Error("Name, Email and Password are required"));
    }

    let file = req.files.photo;
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
    User.fi
    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result?.public_id,
        secure_url: result?.secure_url,
      },
    });
    console.log(user);
    console.log(result);
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(Error("Please enter Email and Password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(Error("User not found...Please Signup first"));
    }

    const isPasswordCorrect = await user.isValidatedPassword(password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return next(Error("Password is wrong"));
    }

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "LogOut successfully",
  });
};

exports.forgotPassword = async (req,res,next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(Error("Please send Email"));
    }

    const user= await User.findOne({email});
    if(!user){
      return next(Error("User is not registered"))
    }

    const forgotToken = await user.getforgotPasswordToken();
    
    user.save({validateBeforeSave: false});

    const url = `${req.protocol}://${req.get("host")}/api/v2/password/reset/${forgotToken}`

    const text=`Copy the url and paste in the url bar \n\n ${url}
    `
    try{
      await mailHelper({
        email: user.email,
        subject: "Reset Password",
        text
      })
      res.status(200).json({
        success:true,
        message:"email is sent successfully"
      })
    }
    catch(error){
      user.forgotPasswordToken=undefined;
      user.forgotPasswordExpiry=undefined;
      user.save({validateBeforeSave: false});

      return next(Error(error.message, 500))
    }

    console.log(user)


  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.resetPassword = async(req,res,next) => {
  try{
    const resetToken = req.params.token
    const user = await User.findOne({
      forgotPasswordToken: resetToken,
      forgotPasswordExpiry: {$gt: Date.now()}
    });
    if (!user) {
      return next(Error("Token is expired"));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(Error("Please enter the same password for both the fields."));
    }

    user.password = req.body.password;

    user.forgotPasswordToken=undefined;
    user.forgotPasswordExpiry=undefined;

    await user.save();

   res.status(200).send("Successfully Changed the Password")

  }
  catch(error){
    console.log(error);
    res.send(error);
  }
  
}

