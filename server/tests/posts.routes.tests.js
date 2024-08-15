require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const loginUser = require("./utils/login.utils");

var auth = {};

beforeEach(async () => {
  await loginUser(app, auth);
});

describe("POST /api/post", () => {
  it("should not create a new post when not auth", async () => {
    // Arrange
    const newPost = { message: "New post message" };

    // Act
    const res = await request(app).post("/api/post").send({ Post: newPost });

    // Assert
    expect(res.statusCode).toBe(401);
    //CHECK for not creation of message !
  });
  it("should create a new post", async () => {
    // Arrange
    const newPost = { message: "New post message" };

    // Act
    const res = await request(app)
      .post("/api/post")
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign])
      .send({ Post: newPost });

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.message).toBe(newPost.message);
  });
});

describe("GET /api/post", () => {
  it("should return all posts", async () => {
    // Arrange: fixtures loaded

    // Act
    const res = await request(app).get("/api/post");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/post/:id", () => {
  it("should not return post with incorrect id", async () => {
    // Arrange : fixture
    const incorrectPostId = "gabuzomeuh";
    // Act
    const res = await request(app).get(`/api/post/${incorrectPostId}`);

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("id", incorrectPostId);
  });
  it("should return a single post by id", async () => {
    // Arrange
    const posts = await request(app).get("/api/post");
    const postId = posts.body[0]._id;

    // Act
    const res = await request(app).get(`/api/post/${postId}`);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", postId);
  });
});

describe("PUT /api/post/:id", () => {
  it("should update a post", async () => {
    // Arrange
    const posts = await request(app).get("/api/post");
    const postId = posts.body[0]._id;
    const updatedPost = { message: "Updated post message" };

    // Act
    const res = await request(app)
      .put(`/api/post/${postId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign])
      .send({ Post: updatedPost });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(updatedPost.message);
  });
});

describe("DELETE /api/post/:id", () => {
  it("should delete a post", async () => {
    // Arrange
    const posts = await request(app).get("/api/post");
    const postId = posts.body[0]._id;

    // Act
    const res = await request(app)
      .delete(`/api/post/${postId}`)
      .set("Authorization", "Bearer " + auth.token)
      .set("Cookie", ["JWT_SIGN=" + auth.cookieSign]);

    // Assert
    expect(res.statusCode).toBe(200);

    const checkRes = await request(app).get(`/api/post/${postId}`);
    expect(checkRes.statusCode).toBe(404); 
  });
});
