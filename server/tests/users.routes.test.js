require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const loginUser = require("./utils/login.utils");

var auth = {};

beforeEach(async () => {
  await loginUser(app, auth);
});

describe("POST /api/user", () => {
  it("should create a new user", async () => {
    // Arrange
    const newUser = {
      userName: "newUser",
      userEmail: "newuser@example.com",
      password: "securepassword",
    };

    // Act
    const res = await request(app)
      .post("/api/user")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign])
      .send(newUser);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.userName).toBe(newUser.userName);
  });
});

describe("GET /api/user", () => {
  it("should return all users", async () => {
    // Arrange: fixture loaded

    // Act
    const res = await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/user/:id", () => {
  it("should not return user with incorrect id", async () => {
    // Arrange : fixture
    const incorrectUserId = "gabuzomeuh";
    // Act
    const res = await request(app)
      .get(`/api/user/${incorrectUserId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("id", incorrectUserId);
  });
  it("should return a single user by id", async () => {
    // Arrange
    const users = await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);
    const userId = users.body[0]._id;

    // Act
    const res = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
  });
});

describe("PUT /api/user/:id", () => {
  it("should update a user", async () => {
    // Arrange
    const users = await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);
    const userId = users.body[0]._id;
    const updatedUser = {
      userName: "updatedUser",
      userEmail: "updateduser@example.com",
    };

    // Act
    const res = await request(app)
      .put(`/api/user/${userId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign])
      .send({User:updatedUser});

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.userName).toBe(updatedUser.userName);
  });
});

describe("DELETE /api/user/:id", () => {
  it("should delete a user", async () => {
    // Arrange
    const users = await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);
    const userId = users.body[0]._id;

    // Act
    const res = await request(app)
      .delete(`/api/user/${userId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);

    // Assert
    expect(res.statusCode).toBe(200);

    const checkRes = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);
    expect(checkRes.statusCode).toBe(404);
  });
});
