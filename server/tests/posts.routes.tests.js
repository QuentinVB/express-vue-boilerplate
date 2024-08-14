const request = require("supertest");
const app = require("../app");
const createFixtures = require("./config/fixtures");
const clearDatabase = require("./config/clearDatabase");


beforeEach(async () => {
  await clearDatabase();
  await createFixtures();
});

afterEach(async () => {
  await clearDatabase();
});

describe("POST /api/post", () => {
  it("should create a new post", async () => {
    // Arrange
    const newPost = { message: "New post message" };
    const token = "Bearer your-jwt-token"; // Remplacer par un vrai token JWT valide

    // Act
    const res = await request(app)
      .post("/api/post")
      .set('Authorization', token)
      .send({ Post: newPost });

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.message).toBe(newPost.message);
  });
});

describe("GET /api/post", () => {
  it("should return all posts", async () => {
    // Arrange: Rien à faire ici car les fixtures sont déjà chargées

    // Act
    const res = await request(app).get("/api/post");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/post/:id", () => {
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
    const token = "Bearer your-jwt-token";

    // Act
    const res = await request(app)
      .put(`/api/post/${postId}`)
      .set('Authorization', token)
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
    const token = "Bearer your-jwt-token";

    // Act
    const res = await request(app)
      .delete(`/api/post/${postId}`)
      .set('Authorization', token);

    // Assert
    expect(res.statusCode).toBe(200);

    const checkRes = await request(app).get(`/api/post/${postId}`);
    expect(checkRes.statusCode).toBe(404); // Assurez-vous que le post a été supprimé
  });
});
