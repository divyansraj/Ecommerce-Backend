const mongoose = require('mongoose')

const connectDB= () => {
try{
    mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully")
}
catch(error){
    console.log("DB connection failed :")
    console.log(error)
    process.exit(1);
}
}

module.exports = connectDB