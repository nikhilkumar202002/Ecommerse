
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddCategorySchema = new Schema({
    name : {
        type : String,
        require : true,
        maxlength : 40
    }
})
module.exports = mongoose.model('category',AddCategorySchema)