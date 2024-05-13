const User = require("../models/user")
const jwt =require("jsonwebtoken")
exports.isloggedin= async(req,res,next) => {
    try {
      //const cookieToken =req.cookies.token || req.header("Authorization").replace("Bearer ", "");

      // check token first in cookies
      let cookieToken = req.cookies.token;

      // if token not found in cookies, check if header contains Auth field
      if (!cookieToken && req.header("Authorization")) {
        cookieToken = req.header("Authorization").replace("Bearer ", "");
      }
      if(!cookieToken){
        return next(Error ("Please login first"))
      }

      //decoding the jwt token present in cookies
      
      const decoded = jwt.verify(cookieToken, process.env.JWT_SECRETKEY);

      //retrieving user information from the database based on the user ID
      req.user = await User.findById(decoded.id);

      //console.log("From user.js Middlewares decoded :" + decoded);
      //console.log("From user.js Middlewares req.user: "+req.user);
      next();
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
    
}

exports.customRoles= (...roles) =>{ return(req,res,next)=>
   {
  if(!roles.includes(req.user.role)){
    return next(Error("You are not authorised"));
  }
  console.log(req.user)
  next();
}}