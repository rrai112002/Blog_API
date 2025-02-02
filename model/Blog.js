const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId : {type:String, requied: true},
   title : {type:String, requied: true},
   imageUrl : {type:String, required : true},
   categoryTitle : {type:String, required : true},
   categoryId : {type:String, required : true}


})

module.exports = mongoose.model('Blog', BlogSchema)