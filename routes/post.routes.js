const express = require('express');
const router = express.Router();
require('mongoose');
const Post = require('../models/post.models');

//Posting and Fetching data
router.route('/posts')
  .post((req, res) => {
    const { title, content} = req.body
    let post = new Post({ title, content });
    post.save()
    .then(post => res.status(201).json({ post, message: 'Post created successfully!' }),
    err => res.status(400).send(err) )
  })
  .get((req, res) => {
  Post.find()
  .then(posts => res.status(200).send({ posts }),
   err => res.status(400).send(err) )
  })

//Deleting, Viewing & Updating post
router.route('/post/:id')
  .delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Post deleted successfully!' }),
    err => res.status(400).send(err))
  })
  .get((req, res) => {
		Post.findById(req.params.id, (err, post) => {
			if (err) res.send(err);
      res.status(200).send({ post }),
      err => res.status(404).send(err)
		});
  })
  // .put((req, res) => {
  //   const { title, content } = req.body
	// 	Post.findById(req.params.id, (err, post) => {
	// 		if (err) res.send(err);
  //     post.title = title;
  //     post.content = content;
	// 		post.save((err) => {
	// 			if (err) res.send(err);
	// 			res.json({ post, message: 'Post updated successfully!' });
	// 		});
	// 	});
  // })
  .patch((req,res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) res.send(err);
      if (req.body.title) {
        post.title = req.body.title
      }
      if (req.body.content) {
        post.content = req.body.content
      }
      post.save((err) => {
				if (err) res.send(err);
				res.status(200).json({ post, message: 'Post updated successfully!' });
			});
    })
  });
  // patch remaining

module.exports = router
