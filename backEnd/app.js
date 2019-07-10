const express = require('express');
const app = express();
const Post = require('./models/posts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// app.use((res,req,next)=>{
//   res.header('Access-Control-Allow-Origin','*');
//   res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization');
//   if(req.method==='OPTIONS')
//   {
//       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
//       return res.status(200).json({});
//   }

//   next();
// })
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
  next();
});

mongoose.connect('mongodb+srv://amaan:12345@Qwerty@cluster0-7ztfc.mongodb.net/meanStack?retryWrites=true&w=majority', { useNewUrlParser: true } ).then(()=>{
  console.log('Database Connected')
})
.catch(()=>{console.log('connection failed')})

app.post('/api/posts',(req, res, next )=>{

  const post = new Post({
    title:req.body.title,
    content:req.body.content
  })
  post.save();
 console.log(post)
 res.status(200).json({message:'Posted Successfully'})
})

app.get('/api/posts',(req,res,next)=>{
  Post.find().then((doc)=>{
    res.status(200).json({
      message:'Post fetched successfully',
      posts:doc
    })
    console.log(doc)
  })
})

app.delete('/api/posts/:id',(req,res,next)=>{
  Post.deleteOne({_id:req.params.id})
  .then((doc)=> {
    console.log('delete successful');
    res.status(200).json({'message':"Deleted with id "+ req.params.id})
  });
})

module.exports = app;
