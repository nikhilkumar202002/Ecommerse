
const { response } = require("express");
const productModel = require("../Models/Addproductmodel")
const CartModel = require('../Models/CartModel');
const UserModel = require("../Models/UserModel");
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
    // console.log(req.files)
    console.log("am here at add p")
    const {image} = req.files;
    console.log(image)
    try {
        let product = await productModel.create(req.body)
       await image.mv('./Public/Images/Products/' + product._id +".jpg").then((err)=>{
            if(!err){
                res.json(true)
            }else{
                console.log(err)
            }
        })
       
    } catch (error) {
        console.log(error);
        
    }
}

const test = (req,res)=>{
        console.log("Test working..")
}
const getOrders = async(req,res)=>{
        console.log('hello im here')
    try {
        const orders = await CartModel.find({ 
            orderDetails
            : { $exists: true, $ne: null } })
        console.log(orders,"hello")
        res.json(orders);
    } catch (error) {
        console.log(error)
    }
}
const GetUser = async (req,res)=>{
        try {
                console.log(req.body,"user Detils")
                let {userData} = req.body;
            let userDatas  =  await UserModel.find({_id:userData})
            console.log(userDatas,"userData")
            res.json(userDatas)
        } catch (error) {
            console.log(error) 
        }
}
module.exports = 
{
addproduct,
test,
getProduct,
getOrders,
GetUser
}

