const express = require('express');
const app = express();
const Post = require('./models/posts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use((res,req,next)=>{
  res.header('Access-Control-Allow-Origin','*');

  if(req.method==='OPTIONS')
  {
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
      return res.status(200).json({});
  }
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization');
  next();
})
//

mongoose.connect('mongodb+srv://amaan:12345@Qwerty@cluster0-7ztfc.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } ).then(()=>{
  console.log('Database Connected')
})
.catch(()=>{console.log('connection failed')})

app.post('/api/posts',(req, res, next )=>{

  const post = new Post({
    title:req.body.title,
    content:req.body.content
  })

 console.log(post)
 res.status(200).json({message:'Posted Successfully', post:post})
})

app.use('/api/posts',(req,res,next)=>{
  const posts = [{
    id:"12ejdfjfhfff33",
    title:"Kashmir",
    content:"Paradise on Earth"
  },
  {
    id:"iuh769j86tg7554f4",
    title:"Earth",
    content:"Blue Planet"
  }
];
  res.status(200).json({message:'Posts fetched Successfully ',
    posts:posts
})

})



module.exports = app;
