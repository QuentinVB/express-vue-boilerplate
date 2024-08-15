const PostModel = require("../../api/models/post.model");
const UserModel = require("../../api/models/user.model");
const bcrypt = require("bcrypt");

const createFixtures = async () => {
  const hash = await bcrypt.hash("test", 10);
  const user = new UserModel({
    accountConfirmed: true,
    userName: "test",
    userEmail: "testuser@example.com",
    passwordHash: hash,
  });

  await user.save();

  const post1 = new PostModel({
    message: "This is a test post 1",
    userId: user._id,
    accountCreation: new Date(),
    accountLastConnection: new Date(),
  });

  const post2 = new PostModel({
    message: "This is a test post 2",
    userId: user._id,
    accountCreation: new Date(),
    accountLastConnection: new Date(),
  });

  await post1.save();
  await post2.save();
};

module.exports = createFixtures;
