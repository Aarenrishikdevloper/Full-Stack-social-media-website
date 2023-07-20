const express = require('express');
const moongoose = require('mongoose'); 
const User = require("./models/user")
const app = express();  
var bcrypt = require('bcryptjs'); 
const core = require('cors');  
const Post = require('./models/post')
const jwt =  require('jsonwebtoken'); 
const cookieparser = require("cookie-parser");
const user = require('./models/user'); 
const Comment = require('./models/comments');
const comments = require('./models/comments');
app.use(cookieparser());
const port = 3000;
app.use(core({credentials:true, origin:'http://localhost:5173'}));
// Middleware
app.use(express.json()); 
const secret = "89948e87812er"

moongoose.connect('mongodb+srv://Social:nh90L1TErqIJKez2@cluster0.8j0zwox.mongodb.net/?retryWrites=true&w=majority');  
var salt = bcrypt.genSaltSync(10);

// Routes for new user registration
app.post('/register', async(req, res)=>{ 
  //getting user details 
   const{username, email,  phonenumber,   profilepic ,password} = req.body; 
   const user = await User.findOne({username}); 
   if(user){
     res.status(409).json("user already existed");
   }

   try{ 
    //  creating new user in mongo db
      const userdoc = User.create({
       username,  
       password:bcrypt.hashSync(password, salt), //encrypting the password   
       profilepic,  
       phonenumber, 
       email,

       

     }); 
     res.status(200).json(userdoc)
     
   }
    catch{ 
      res.status(400).json("Something went wrong");
       
    }
})
//route for login
app.post('/login', async(req, res)=>{ 
  //getting user details
    const{email, password} = req.body; 
    try{  
      //finding the user  
       const userdoc = await User.findOne({email});  
       //checkingthe password 
       const passok = bcrypt.compareSync(password, userdoc.password); 
       if(passok){
        //creating the jwt token 
         const token = await jwt.sign({email:userdoc.email, id:userdoc.id},secret,{expiresIn:"90d"});   
         //getting the expiration date for cookie
         const expiry = new Date(); 
         expiry.setMonth(expiry.getMonth() + 3);   
         //returning a cookie
         res.cookie("token",token, {expires:expiry}).json(userdoc);
 
       }else{
         res.status(409).json("Something went wrong");
       }

    }catch{
      res.status(400).json("Something went wrong please try again")
    }
}) 
//log out 
app.post('/logout', async(req,res)=>{
  //clearing cookies by setting it to an empty and setting the expiration date to a past date 
  try{
    res.clearCookie("token", {expires: new Date(0)});
    res.sendStatus(200);
  } 
  catch{
      res.status(500).json("Something went wrong");
  }
  
   
     

   
})


//route for creating new Post 
app.post('/newpost', async(req,res)=>{
  const{desc, content,type} = req.body; 
  const {token} = req.cookies;
  //creating new post  
  try{
     const acesstoken = await jwt.verify(token, secret); 
     const postdoc =  await Post.create({
        user:acesstoken.id,  
        desc, 
        content,
        type,

     }) 
     res.status(200).json("post Created sucessfully");
  } 
  catch{ 
    res.status(400).json("Something went wrong")

  }

 
 
})
//routes for displaying post
app.get('/post', async(req,res)=>{
  

   try{
    
     
     //finding all the post
     const doc = await Post.find().populate('user'); 
     res.json(doc);
   }   
    catch{
      res.status(400).json("Something webt wrong")
    }
}) 
//getting profiledetails 
app.get('/profile/:id', async(req,res)=>{
  //getting user id
   const {id} = req.params;  
   try{
   //finding user details
   const doc = await user.findById(id);  
   //sending the requested data
   res.json(doc); 
   } 
   catch{
     res.status(400).json("Something went wrong");
   }
})  
//like functionality 
app.put('/likes',async(req,res)=>{ 
  const{userid, postid} = req.body;
     try{
      //finding the post 
       const post = await Post.findById(postid); 
       //checking if the post ike previouslu if not like or liked then disliked 
       if(!post.likes.includes(userid)){
         await Post.updateOne(
           {_id: postid}, 
           {$push:{likes:userid}}
         ); 
         res.status(200).json("The Post Has been liked")
       }else{
         await post.updateOne(
           { _id: postid}, 
           {$pull:{likes:userid}}
         ); 
         res.status(200).json("Post has been disliked Sucessfully");
       }
     }catch{
       res.status(400).json("Something went wrong")
     }
}) 
//comment functionality 
app.post('/comment', async(req, res)=>{ 
  const{token} = req.cookies; 
  const{postid,comment} = req.body;
  try{
    //verifying usertoken
     const acesstoken = await jwt.verify(token, secret);  
     //adding a new comment
     const doc = Comment.create({
       user:acesstoken.id, 
       post:postid,  
       comment,


     })  
     res.status(200).json(doc);  

     
  } 
  catch{
     res.status(400).json("Something went wrong");
  }
}) 
app.get('/comment',async(req, res)=>{
  //finding the comment  
  const doc = await Comment.find().populate('user');  
  //returing the required details
  res.json(doc);
}) 
app.delete('/deletepost/:id', async(req, res)=>{
  const{id} = req.params; 
  const doc = Post.findById(id); 
  //getting thr tokrn 
 try{
     const deletepost = await Post.findOneAndDelete({_id:id});  
     
     const deletecomment =  await comments.deleteMany({post:id});
     res.status(200).json(deletepost);
  }catch{
     res.status(400).json("something went wrong");
  }
}) 
app.put('/following/:id', async(req, res)=>{
    const{id} = req.params; 
    const{userid} = req.body;  
    try{
    if(id !== userid){
        const user = await User.findById(id); 
        const otheruser = await User.findById(userid)
      if( !user.followers || !user.followers.includes(userid) ){
        await  user.updateOne({$push:{followers:userid}}); 
        await otheruser.updateOne({$push:{followings:id}}); 
        return res.status(200).json("User has followed");
      }else{
        await  user.updateOne({$pull:{followers:userid}}); 
        await otheruser.updateOne({$pull:{followings:id}}); 
        return res.status(200).json("User has beeen  unfollowed");
      }
  
    }     
  }catch{
     res.status(400).json("Something went wrong");
  }
}) 
app.get("/userall", async(req,res)=>{
   const user = await User.find(); 
   res.json(user);
})
app.get('/follower/:id', async(req, res)=>{
     try{
      const{id} = req.params; 
      //finding the user
      const userdetails = await User.findById(id); 
      //fetching and returing the data
      const friends = await Promise.all(
        userdetails.followers.map((followerid)=>{
          return User.findById(followerid); 

        }) 
        
      ); 
      let followerslist=[];  
      //storing the  extracted data in the array 
      friends.map((friend)=>{
         const{_id, username, profilepic} =friend; 
         followerslist.push({_id, username, profilepic}); 
      });  
      
      res.json(followerslist);
    }catch{
      res.status(400).json("Something went wrong");
    }
  
}) 
//getting following data 
app.get('/followings/:id', async(req, res)=>{
  try{
  const{id} = req.params; 
  //finding the user
  const userdetails = await User.findById(id); 
  //fetching and returing the data
  const friends = await Promise.all(
    userdetails.followings.map((followerid)=>{
      return User.findById(followerid); 

    }) 
    
  ); 
  let followerslist=[];  
  //storing the  extracted data in the array 
  friends.map((friend)=>{
     const{_id, username, profilepic} =friend; 
     followerslist.push({_id, username, profilepic}); 
  });  
  
  res.json(followerslist);
  }catch{
     res.status(400).json("Something went wrong");
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});