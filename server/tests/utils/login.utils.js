const request = require("supertest");

async function loginUser(app, auth) {
  const res = await request(app)
    .post("/auth/login")
    .send({
      userName: "test",
      password: "test",
    })
    .expect(200);

  auth.cookieSign = Object.fromEntries(
    res.headers["set-cookie"].map((l) => l.split("="))
  )["JWT_SIGN"];

  auth.token = res.body.token;
  return auth;
}

module.exports = loginUser;
