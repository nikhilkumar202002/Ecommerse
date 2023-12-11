
const { response } = require("express");
const productModel = require("../Models/Addproductmodel")
const CartModel = require('../Models/CartModel');
const UserModel = require("../Models/UserModel");
const categorymodel = require("../Models/Addcategorymodel");
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

const shippingStatus = async(req,res)=>{
            console.log(req.body,"req.body----shipping ststus");
            let {cartId ,value} = req.body;
            try {
                let updation = await CartModel.findByIdAndUpdate({_id:cartId},{$set:{shippingStatus:value}})
                if(updation){
                    console.log(updation);
                    res.json(true);
                }
            } catch (error) {
                console.log(error)
                res.json(false)
            }
}

const getCustomer = async(req,res)=>{
    
    try {
        const customer = await UserModel.find();
            res.json(customer);
    } catch (error) {
        console.log(error);
    }
    
}

const getCounts = async(req,res)=>{
    try {
        let productCount = await productModel.countDocuments({})
        let custCount = await UserModel.countDocuments({})
        let orders = await CartModel.find({ shippingStatus: { $ne: null } }).exec();
        let deliveredProductCount = await CartModel.find({ shippingStatus: 1 })
        console.log(deliveredProductCount,"delivered pro")
        let orderLength = orders.length;
        let deliveredOrder = deliveredProductCount.length

        let count = {
            productCount,
            custCount,
            orderLength,
            deliveredOrder
        }
        console.log(count,"counter")
        res.json(count)
    } catch (error) {
        console.log(error)
    }
}
const addcategory = async (req,res)=>{
    console.log(req.body,"cata")
    // console.log(req.files)
    console.log("product Added")
   
    try {
        let Category = await categorymodel.create(req.body);
                res.json(true)
    } catch (error) {
        console.log(error);
        
    }
}
const getCategory = async(req,res)=>{
    console.log(req.body,"categories")
    try {
        let categoryData = await categorymodel.find()
        console.log(categoryData,"hello")
        console.log("categories")
        res.json(categoryData)
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
GetUser,
shippingStatus,
getCustomer,
getCounts,
addcategory,
getCategory
}

