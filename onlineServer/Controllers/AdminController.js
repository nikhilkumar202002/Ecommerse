<<<<<<< HEAD
const { response } = require("express");
const productModel = require("../Models/Addproductmodel")
const getProduct = async (req,res)=>{
    try {
       let products = await productModel.find()
       res.json(products);
    } catch (error) {
        console.log(error)
    }
}
const addproduct = async (req,res)=>{
    console.log(req.body)
    console.log(req.files)
    let {image} = req.files;
    try {
        let product = await productModel.create(req.body)
        image.mv('./Public/Images/Products/' + product._id +".jpg").then((err)=>{
            if(!err){
                res.json(true)
            }else{
                console.log(err)
            }
        })
       
    } catch (error) {
        console.log(error);
        
    }
=======
const addproduct = (req,res)=>{
    console.log(req.body)
    console.log(req.file)
>>>>>>> e345bf993f1fbdefa97751d486b10eda1c829420
}
const test = (req,res)=>{
        console.log("Test working..")
}
<<<<<<< HEAD
module.exports = { addproduct ,test, getProduct }
=======
module.exports = {  addproduct ,test }
>>>>>>> e345bf993f1fbdefa97751d486b10eda1c829420
