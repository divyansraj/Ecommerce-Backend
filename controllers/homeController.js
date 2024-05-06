exports.home = (req,res)=>{
    res.status(200).json({
        success: true,
        greeting : "hi there from home",
    })
}

exports.product=async(req,res)=>{
    try{
        res.status(200).json({
        name:"Phone",
        price:15000,
        brand:"Realme",
    });
    }
    catch(error){
        console.log(error);
    }
}  
    