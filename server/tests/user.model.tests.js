const mongoose = require("mongoose");
const UserModel = require("../api/models/user.model");
require("dotenv").config();

describe("UserModel", () => {
  it("should create and save a new user successfully", async () => {
    // Arrange
    const user = new UserModel({
      userName: "testUser",
      userEmail: "testuser@example.com",
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

  it("should hash the password before saving", async () => {
    // Arrange
    const user = new UserModel({
      userName: "secureUser",
      userEmail: "secureuser@example.com",
      passwordHash: "plaintextpassword",
      accountCreation: new Date(),
      accountLastConnection: new Date(),
    });

    // Act
    const savedUser = await user.save();

    // Assert
    expect(savedUser.passwordHash).not.toBe("plaintextpassword"); // Le mot de passe ne doit pas être en clair
  });
});
