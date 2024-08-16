require("dotenv").config();
const UserModel = require("../api/models/user.model");

describe("UserModel", () => {
  it("should create and save a new user successfully", async () => {
    // Arrange
    const user = new UserModel({
      userName: "testUser",
      userEmail: "testuser2@example.com",
      passwordHash: "hashedpassword",
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });

    // Act
    const savedUser = await user.save();

    // Assert
    expect(savedUser._id).toBeDefined();
    expect(savedUser.userName).toBe("testUser");
  });

  it("should not save a user without a required field", async () => {
    // Arrange
    const user = new UserModel({
      userEmail: "missingusername@example.com",
      passwordHash: "hashedpassword",
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });
    let error;

    // Act
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    // Assert
    expect(error).toBeDefined();
    expect(error.errors.userName).toBeDefined();
  });
});
