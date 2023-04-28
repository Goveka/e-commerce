const mongoose = require('mongoose'); 

const ProductSchema= new mongoose.Schema({
productName: String,
productImage: String,
price: Number,
instock: Number,
sumarryDescription: String,
fullDescription: String,
catergory: String,
})


module.exports= mongoose.model('Product', ProductSchema)
