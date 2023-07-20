const moongoose = require('mongoose'); 

const Userschema = new moongoose.Schema({
    username: {type:String, required:true, min:3, max:50,  unique:true}, 
    email: {type:String, required:true, max:50, unique:true}, 
    phonenumber:{type:String ,max:10, required:true, unique:true},  
    password:{type:String, required:true}, 
    profilepic: {type:String},  
    coverpicture:{type:String, default:'https://images.pexels.com/photos/1121782/pexels-photo-1121782.jpeg?auto=compress&cs=tinysrgb&w=1600'}, 
    followings:{ type:Array, default:[]}, 
    followers:{type:Array, default:[]}
        
        
    
         
         
     

}) 
module.exports = moongoose.model("user", Userschema);