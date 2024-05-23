const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxlength: [120, "Enter the product name within 120 letters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
    maxlength: [6, "Product price should not be more than 6 digits"],
  },
  description: {
    type: String,
    required: [true, "Please product description"],
  },
  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "Please select category from short-sleeves, long-sleeves, sweat-shirts and hoodies",
    ],
    enum: {
      values: ["shortsleeves", "longsleeves", "sweatshirts", "hoodies"],
      message:
        "Please select category Only from short-sleeves, long-sleeves, sweat-shirts and hoodies ",
    },
  },
  brand: {
    type: String,
    required: [true, "Please add a Brand for product"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfreviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User", //same as that you have exported in the user model
            required: true
        },
        name:{
            type:String,
            required:true,
        },
        rating: {
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref : "User", //same as that you have exported in the user model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,//not Date.now() // we do not want to run it now
  },
});

module.exports = mongoose.model("Product", productSchema);
