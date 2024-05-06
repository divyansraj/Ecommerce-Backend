//try catch and async-await or use promise everywhere
//to check whether the connection is made to the route if made return a Promise and call the next middlewares


// module.exports = (func) => (req,res,next) => 
//     Promise.resolve(func(req,res,next)).catch(next);