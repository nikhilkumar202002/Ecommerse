const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema =  new Schema({
    product : {
        type : Array,
        require : true
    },
    userId : {
        type : String,
        require : true,
    },
    orderDetails:{
        type:Object,
        default:null
    }
   
})

module.exports = mongoose.model('cart',CartSchema)