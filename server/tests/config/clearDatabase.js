const mongoose = require('mongoose');
const PostModel = require('../../api/models/post.model');
const UserModel = require('../../api/models/user.model');

const clearDatabase = async () => {
    await PostModel.deleteMany({});
    await UserModel.deleteMany({});
};

module.exports = clearDatabase;
