require("dotenv").config();
const PostModel = require("../api/models/post.model");
const UserModel = require("../api/models/user.model");

describe("PostModel", () => {
  it("should create and save a new post successfully", async () => {
    // Arrange
    const user = new UserModel({
      userName: "testUser",
      userEmail: "testuser2@example.com",
      password: "hashedpassword"
    });
    await user.save();

    const post = new PostModel({
      message: "This is a test message",
      userId: user._id,
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });

    // Act
    const savedPost = await post.save();

    // Assert
    expect(savedPost._id).toBeDefined();
    expect(savedPost.message).toBe("This is a test message");
  });

  it("should not save a post without a user", async () => {
    // Arrange
    const post = new PostModel({
      message: "This post has no userId",
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });

    let error;

    // Act
    try {
      await post.save();
    } catch (err) {
      error = err;
    }

    // Assert
    expect(error).toBeDefined();
    expect(error.errors.userId).toBeDefined();
  });

  it("should populate the userId field correctly", async () => {
    // Arrange
    const user = new UserModel({
      userName: "testUser",
      userEmail: "testuser@example.com",
      password: "hashedpassword"
    });
    await user.save();

    const post = new PostModel({
      message: "This is a test message",
      userId: user._id,
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });
    await post.save();

    // Act
    const foundPost = await PostModel.findById(post._id).populate('userId').exec();

    // Assert
    expect(foundPost.userId.userName).toBe("testUser");
  });
});
