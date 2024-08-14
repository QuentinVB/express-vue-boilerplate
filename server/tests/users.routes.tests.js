const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

describe("POST /api/user", () => {
  it("should create a new user", async () => {
    // Arrange
    const newUser = { 
      userName: "newUser", 
      userEmail: "newuser@example.com", 
      password: "securepassword" 
    };
    const token = "Bearer your-jwt-token"; // Remplacer par un vrai token JWT valide

    // Act
    const res = await request(app)
      .post("/api/user")
      .set('Authorization', token)
      .send(newUser);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.userName).toBe(newUser.userName);
  });
});

describe("GET /api/user", () => {
  it("should return all users", async () => {
    // Arrange: Rien à faire ici car les fixtures sont déjà chargées

    // Act
    const res = await request(app).get("/api/user").set('Authorization', 'Bearer your-jwt-token');

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/user/:id", () => {
  it("should return a single user by id", async () => {
    // Arrange
    const users = await request(app).get("/api/user").set('Authorization', 'Bearer your-jwt-token');
    const userId = users.body[0]._id;

    // Act
    const res = await request(app).get(`/api/user/${userId}`).set('Authorization', 'Bearer your-jwt-token');

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
  });
});

describe("PUT /api/user/:id", () => {
  it("should update a user", async () => {
    // Arrange
    const users = await request(app).get("/api/user").set('Authorization', 'Bearer your-jwt-token');
    const userId = users.body[0]._id;
    const updatedUser = { 
      userName: "updatedUser", 
      userEmail: "updateduser@example.com", 
      password: "newsecurepassword" 
    };
    const token = "Bearer your-jwt-token";

    // Act
    const res = await request(app)
      .put(`/api/user/${userId}`)
      .set('Authorization', token)
      .send({ user: updatedUser });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.userName).toBe(updatedUser.userName);
  });
});

describe("DELETE /api/user/:id", () => {
  it("should delete a user", async () => {
    // Arrange
    const users = await request(app).get("/api/user").set('Authorization', 'Bearer your-jwt-token');
    const userId = users.body[0]._id;
    const token = "Bearer your-jwt-token";

    // Act
    const res = await request(app)
      .delete(`/api/user/${userId}`)
      .set('Authorization', token);

    // Assert
    expect(res.statusCode).toBe(200);

    const checkRes = await request(app).get(`/api/user/${userId}`).set('Authorization', 'Bearer your-jwt-token');
    expect(checkRes.statusCode).toBe(404); // Assurez-vous que l'utilisateur a été supprimé
  });
});
