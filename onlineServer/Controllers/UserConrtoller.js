const userModel = require('../Models/UserModel')
const CartModel = require('../Models/CartModel')
const bcrypt = require('bcryptjs'); 

const HomepageData = (req,res)=>{
    let data={name:"anaz"}
    res.send(data);
}
const userRegistration = async (req,res)=>{
    console.log(req.body)
    try {
        const {Password}  =  req.body
        bcrypt.hash(Password,10,  async function(err,hash){
            if(err){
                console.log(err)

            }else{
                req.body.Password = hash;
                console.log(hash)
                await  userModel.create(req.body)
                console.log("Data inserted")
            }
        })
        
    } catch (error) {
        console.log(error) 
    }
    res.json(true)
}

const userLogin = async (req,res)=>{
    console.log(req,res)
    const { Email } = req.body;
    const   pass = req.body.Password;
        try {
            let user = await userModel.findOne({Email:Email})
            console.log(user)
            let Password =user.Password;
            let compare = await bcrypt.compare(pass,Password)
            console.log(compare)
            if(compare){
                
                let userId = user._id;
                let cart= await CartModel.findOne({userId:userId})
                 let cartTotal = cart.product.length;
                console.log(cartTotal,"cart")
                let userData = {
                        user,
                        cartTotal
                }
                res.json(userData)
            }else{
                res.json(false)
                console.log(false)
            }     
        } catch (error) {
            console.log(error)
        }
}
const AddToCart = async(req,res)=>{
    try {
       console.log(req.body.obj)
       let {obj} = req.body
       let userId = req.body.userId; 
       let cart=await CartModel.findOne({userId:userId});
       console.log(cart)
                if(!cart){
                        console.log("i am here")
                        obj.quantity = 1;
                        let cartObject = {
                            userId,
                            product : [obj]
                        };
                        let Newcart = await CartModel.create(cartObject)
                        console.log(Newcart.product,"----new")
                }else{
                    console.log("else part")
                        console.log(cart.product,"product id")
                           let cartExisit = cart.product.findIndex((product)=>product._id == obj._id)
                           console.log(cartExisit)
                           if(cartExisit == -1){
                                obj.quantity = 1;
                                    await CartModel.findOneAndUpdate({userId:userId},
                                            {
                                                $push: {
                                                         product : obj
                                                        }
                                            }
                                        )     
                           }else{
                                     res.json("Already Exsit")
                           }
                }
       res.json("cart got")
    } catch (error) {
        
    }
}

const getCartItem = async (req,res)=>{
        try {   
                console.log("at get cart")
                console.log(req.body)
                const userId = req.body._id;  
                 let userCart = await CartModel.findOne({userId:userId});
                 res.json(userCart)   
            } catch (error) {
                    console.log(error)
            }
    }

module.exports = {HomepageData,userRegistration,userLogin,AddToCart,getCartItem}
