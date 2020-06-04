const express = require('express');
const router = express.Router();
require('mongoose');
const Post = require('../models/post.models');

router.route('/posts')
// Posting data
  .post((req, res) => {
    const { title, content} = req.body
    let post = new Post({ title, content });
    post.save()
    .then(post => res.status(201).json({ post, message: 'Post created successfully!' }),
    err => res.status(400).send(err) )
  })
// Fetching data
  .get((req, res) => {
  Post.find()
  .then(posts => res.status(200).send({ posts }),
   err => res.status(400).send(err) )
  })

router.route('/post/:id')
// Deleting post
  .delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Post deleted successfully!' }),
    err => res.status(400).send(err))
  })
// Viewing 1 post
  .get((req, res) => {
		Post.findById(req.params.id, (err, post) => {
			if (err) res.send(err);
      res.status(200).send({ post }),
      err => res.status(404).send(err)
		});
  })
// Updating post
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
// Applying patch when there are 2 fields
  // .patch((req,res) => {
  //   Post.findById(req.params.id, (err, post) => {
  //     if (err) res.send(err);
  //     if (req.body.title) {
  //       post.title = req.body.title
  //     }
  //     if (req.body.content) {
  //       post.content = req.body.content
  //     }
  //     post.save((err) => {
	// 			if (err) res.send(err);
	// 			res.status(200).json({ post, message: 'Post updated successfully!' });
	// 		});
  //   })
  // })
// Applying patch when there are multiple fields instead of 2
  .patch((req,res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) res.send(err);
      const newPost = Object.keys(req.body)
      newPost.forEach(postKey => post[postKey] = req.body[postKey])
      post.save((err) => {
				if (err) res.send(err);
				res.status(200).json({ post, message: 'Post updated successfully!' });
			});
    })
  });

module.exports = router
