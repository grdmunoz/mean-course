const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular')
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('not connected to database');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
   "GET,POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post =  new Post({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save().then(result => {
    res.status(201).json({
      message: 'post added successfuly',
      postId:result._id
    });
  });
});

app.get('/api/posts',(req, res, next) => {
    Post.find()
    .then( documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    });
});

app.get('/api/posts/:id',(req, res, next) => {
  Post.findById({_id: req.params.id}).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  });

});

app.delete('/api/posts/:id',(req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted'});
  });
});

app.put('/api/posts/:id',(req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post updated'});
  });

});

module.exports = app;
