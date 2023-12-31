const userModel = require('../Models/UserModel')
const CartModel = require('../Models/CartModel')
const categorymodel = require('../Models/Addcategorymodel')
const productmodel = require('../Models/Addproductmodel');
const bcrypt = require('bcryptjs'); 
const Razorpay = require('../Payments/Razorpay')
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
            console.log(user,"Hello User")
            let Password =user.Password;
            let compare = await bcrypt.compare(pass,Password)
            console.log(compare)
            if(compare){
                
                let userId = user._id;
                let cart= await CartModel.findOne({userId:userId})
                const cartTotal = cart ? cart.product.length : 0;
                console.log(cartTotal,"cart")
                let userData = {
                        user,
                        cartTotal
                }
                res.json(userData)
            }else{
                res.json(userData)
                console.log(false)
            }     
        } catch (error) {
            console.log(error)
        }
}
// const AddToCart = async(req,res)=>{
//     try {
//        console.log(req.body.obj)
//        let {obj} = req.body
//        let userId = req.body.userId; 
//        let cart=await CartModel.findOne({userId:userId});
//        console.log(cart)
//                 if(!cart || (cart && cart.orderDetails!=null)){
//                         console.log("i am here cart.Orderdetails is here")
//                         obj.quantity = 1;
//                         let cartObject = {
//                             userId,
//                             product : [obj]
//                         };
//                         let Newcart = await CartModel.create(cartObject)
//                         console.log(Newcart.product,"----new")
//                 }else{
                           
//                             console.log("else part")
//                                 console.log(cart.product,"product id")
//                                 let cartExisit = cart.product.findIndex((product)=>product._id == obj._id)
//                                 console.log(cartExisit,"product")
//                                 if(cartExisit == -1){
//                                         obj.quantity = 1;
//                                             await CartModel.findOneAndUpdate({userId:userId},
//                                                     {
//                                                         $push: {
//                                                                 product : obj
//                                                                 }
//                                                     }
//                                                 )  
                                           
//                            }else{
//                                      res.json("Already Exsit")
//                            }
//                 }
//        res.json("cart got")
//     } catch (error) {
        
//     }
// }
const AddToCart = async (req, res) => {
    try {
        console.log(req.body.obj);
        let { obj } = req.body;
        let userId = req.body.userId;
        let cart = await CartModel.findOne({ userId: userId });
        
        console.log(cart);

        if (!cart || cart.orderDetails === null) {
            console.log("Creating a new cart or orderDetails is null");
            obj.quantity = 1;
            let cartObject = {
                userId,
                product: [obj]
            };
            let newCart = await CartModel.findOneAndUpdate(
                { userId: userId },
                cartObject,
                { upsert: true, new: true }
            );
            console.log(newCart.product, "----new");
        } else {
            console.log("Cart exists and orderDetails is null");
            console.log(cart.product, "product id");
            let productExists = cart.product.find((product) => product._id == obj._id);

            if (!productExists) {
                console.log("Product does not exist in the cart. Adding it...");
                obj.quantity = 1;
                await CartModel.findOneAndUpdate(
                    { userId: userId },
                    {
                        $push: {
                            product: obj
                        }
                    }
                );
            } else {
                console.log("Product already exists in the cart. Updating quantity...");
                // Update the quantity of the existing product in the cart
                // For example, increment the quantity by 1
                await CartModel.findOneAndUpdate(
                    { userId: userId, "product._id": obj._id },
                    {
                        $inc: {
                            "product.$.quantity": 1
                        }
                    }
                );
            }
        }
        res.json("Cart updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const getCartItem = async (req,res)=>{
        try {   
                console.log("at get cart")
                console.log(req.body)
                const userId = req.body._id;  
                 let userCart = await CartModel.findOne({userId:userId,orderDetails :null});
                 res.json(userCart)   
            } catch (error) {
                    console.log(error)
            }
    }
const removefromCart = async(req,res)=>{
        try {
            console.log(req.body)
            const Product_Id = req.body.id
            const user_id = req.body.user_Id
            console.log(Product_Id, user_id)
            let removedItem = await CartModel.findOneAndUpdate(
                { userId:user_id},
                {
                    $pull: {
                        product: {
                           
                            '_id': Product_Id
                        }
                    }
                }
            );
            console.log(removedItem)
            res.json(true)
        } catch (error) {
            console.log(error) 
        }
}
const increment = async(req,res)=>{
    let {user_Id} =req.body
    let { id} = req.body
    try {
        let increments = await CartModel.findOneAndUpdate({userId:user_Id,'product._id': id},{
            $inc:{ 'product.$.quantity' :1 },
        })
    } catch (error) {
        console.log(error)
    }
}
const decrement = async(req,res)=>{
    let {user_Id} =req.body
    let { id} = req.body
    try {
        let increments = await CartModel.findOneAndUpdate({userId:user_Id,'product._id': id},{
            $inc:{ 'product.$.quantity' :-1 },
        })
    } catch (error) {
        console.log(error)
    }
}
const orderCtreate =(req,res)=>{
     console.log(req.body);
    try {
        const options = {
            amount: req.body.amount , // amount == Rs 10
            currency: "INR",
            receipt: req.body.userId,
            payment_capture: 0,
       // 1 for automatic capture // 0 for manual capture
          };
          Razorpay.orders.create(options, async function (err, order) {
            if (err) {
             console.log(err)
            }else{
                console.log(order)
                res.json(order)
            }
          
         });
    } catch (error) {
        console.log(error)
    }
}

const orderPayment = async (req,res)=>{
    let userid = req.body.user.user._id;
    let { orderDetails} = req.body;
    console.log(orderDetails,userid,"first")
    console.log(req.body);
    try {
        await CartModel.findOneAndUpdate({userId:userid},{
            $set :{orderDetails :orderDetails}
        })
        console.log("cart updated")
    } catch (error) {
        
    }

}

const myOrders = async (req,res) =>{
    console.log(req.body,"HELLO") 
    let {_id} = req.body;  
    try {
        let myOrdersData = await CartModel.findOne({ userId: _id, orderDetails: { $ne: null} });
            console.log(myOrdersData)
            res.json(myOrdersData)
    } catch (error) {
        
    }
}

const getCategory = async(req,res)=>{
    console.log(req.body,"categories")
    try {
        let categoryData = await categorymodel.find()
        console.log(categoryData,"hello")
        res.json(categoryData)
    } catch (error) {
        console.log(error)
    }
}
const getProductSingleView = async(req,res)=>{
        try {
                let {id} = req.body;
                    let product = await productmodel.findOne({_id:id})
                    if(product){
                            res.json(product)
                    }else{
                            res.json(product)
                    }
        } catch (error) {
            console.log(error) 
        }
}
const getProductsByCategory = async(req,res)=>{
    console.log(req.body,"Category key")
    try {
        let Cata = req.body.category.Category;
        console.log(Cata,"Cata")
        let categories = await productmodel.find({Category:Cata})
        console.log(categories,"User Category")
        if(categories){
            res.json(categories)
        }else{
            res.json(false)
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = 
{
HomepageData,
userRegistration,
userLogin,
AddToCart,
getCartItem,
removefromCart,
decrement,
increment,
orderCtreate,
orderPayment,
myOrders,
getCategory,
getProductSingleView,
getProductsByCategory

}
