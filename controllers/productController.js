const Product = require("../models/product");
const cloudinary = require("cloudinary");
const whereClause = require("../utils/whereClause");
exports.addProduct = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(Error("Product image not found"));
    }
    
    let productImages = [];
      for (let i = 0; i < req.files.photos.length; i++) {
        let results = await cloudinary.v2.uploader.upload(
          req.files.photos[i].tempFilePath,
          {
            folder: "products",
          }
        );
        productImages.push({
          id: results.public_id,
          secure_url: results.secure_url,
        });
      }
    console.log("Products Uploaded as",productImages);
    req.body.photos = productImages; //uploading images to the cloudinary and then we are taking the id and url of the product photo then assigning it to the req.body so that we can later we this in out=r creation of the product
    req.body.user = req.user.id; // This line assigns the ID of the currently authenticated user to req.body.user. which is populated by a middleware user.js in middlewares

    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};


exports.getallProducts = async(req,res,next) => {
  try{
    const resultsPerPage = 6;
    const totalProducts =  await Product.countDocuments()

    const productsObj = new whereClause(Product.find(),req.query).search().filter();

    let products = productsObj.base;
    const filteredProducts =products.length

    productsObj.pager(resultsPerPage)
    products = await productsObj.base // .clone()

    //products.limit().skip()

    res.status(200).json({
      success:true,
      totalProducts,
      filteredProducts,
      products,
    })
  }
  catch(error){
    console.log(error);
    res.send(error);
  }
}