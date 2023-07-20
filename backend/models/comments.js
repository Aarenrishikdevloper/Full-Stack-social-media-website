const moongoose = require('mongoose'); 

const Commentschema = new moongoose.Schema({
    user:{type:moongoose.Schema.Types.ObjectId, required:true, ref:'user'},   
    post:{type:moongoose.Schema.Types.ObjectId, required:true},    
    comment:{type:String, required:true},
}) 

module.exports = moongoose.model('comment', Commentschema);