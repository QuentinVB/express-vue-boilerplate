const asyncHandler = require("express-async-handler");
const PostModel = require("../models/post.model");

//TODO : split controller and post service/DAL (3 concern here : request deconstruction, response building and DB access)
//TODO : remove un-necessary data to front
//CREATE
const createPost = asyncHandler(async (req, res, next) => {
  const post = req.body.Post;
  const userId = req.auth.userId;

  let newPost = new PostModel({ message: post.message, userId: userId });
  newPost = await newPost.save();
  newPost = newPost.toObject();

  res.status(201).json(newPost);
});

//READ
const getAllPosts = asyncHandler(async (req, res, next) => {
  let posts = await PostModel.find()
    .populate({
      path: "userId",
      select: "userName",
    })
    .exec();

  const formattedPosts = posts.map((post) => ({
    ...post.toObject(),
    user: {
      _id: post.userId._id,
      name: post.userId.userName,
    },
  }));

  res.status(200).json(formattedPosts);
});

const getPostById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let post;
  try {
    post = await PostModel.findById(id);
  } catch (error) {
    //FIXME : filter error
    res.status(404).json({ error: "user not found", id });
    return;
    throw error;
  }
  if (!post) {
    res.status(404).json({ error: "post not found", id });
    return;
  }

  res.status(200).json(post);
});
//get by name ?

//UPDATE
const putPost = asyncHandler(async (req, res, next) => {
  const { ...post } = req.body.Post;
  const id = req.params.id;

  let updatedPost = await PostModel.findByIdAndUpdate(id, post, {new:true});

  res.status(200).json(updatedPost);
});
//patch

//DELETE
const deletePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await PostModel.findByIdAndRemove(id);
  res.status(200).json();
});

module.exports = { createPost, getAllPosts, getPostById, putPost, deletePost };
