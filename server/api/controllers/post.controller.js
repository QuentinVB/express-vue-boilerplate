const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const PostModel = require("../models/post.model");

//TODO : split controller and post service/DAL (3 concern here : request deconstruction, response building and DB access)
//TODO : remove un-necessary data to front
//CREATE
const createPost = asyncHandler(async (req, res, next) => {
  const post  = req.body.Post;
  const userId = req.auth.userId;

  let newPost = new PostModel({message:post.message,userId:userId});
  newPost = await newPost.save();
  newPost = newPost.toObject();

  res.status(201).json(newPost);
});

//READ
const getAllPosts = asyncHandler(async (req, res, next) => {
  let posts = await PostModel.find({}).exec();

  res.status(200).json(posts);
});

const getPostById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let post = await PostModel.findById(id);

  res.status(200).json(post);
});
//get by name ?

//UPDATE
const putPost = asyncHandler(async (req, res, next) => {
  const { ...post } = req.body.Post;
  const id = req.params.id;


  let updatedPost = await PostModel.findByIdAndUpdate(id, post, {});


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
