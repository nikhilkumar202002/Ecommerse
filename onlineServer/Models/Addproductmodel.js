const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddProductSchema =  new Schema({
    name : {
        type : String,
        require : true,
        maxlength : 200
    },
    price : {
        type : String,
        require : true,
        maxlength : 15
    },
    offer_price : {
        type : String,
        require : true,
        maxlenght : 15
    },
    description : {
        type : String,
        require : true,
        maxlenght : 100000
    },
    Category : {
        type:String,
        require : true,
        maxlenght : 40
    }
})

module.exports = mongoose.model('products',AddProductSchema)