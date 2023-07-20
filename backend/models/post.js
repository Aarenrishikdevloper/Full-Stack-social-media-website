const moongoose = require('mongoose'); 

const Postschema = moongoose.Schema({
    user:{type:moongoose.Schema.Types.ObjectId, required:true, ref:'user'}, 
    desc:{type:String, max:500}, 
    content:{type:String}, 
    likes:{type:Array, default: []}, 
    type:{type:String, required:true},
}) 

module.exports = moongoose.model('post', Postschema);