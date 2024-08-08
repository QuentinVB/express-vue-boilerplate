const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");

const isDev = process.env.NODE_ENV === "development";

router.get("/", async function (req, res, next) {
  if (isDev) {
    res.render("index-dev", { devUrl: process.env.APP_REDIRECT });
  }
  else
  {
    req.next()
  }
});

if (isDev) {
  router.get("/src/*", async function (req, res, next) {
    console.info("Dev mode, redirect to Vite");
    res.redirect(process.env.APP_REDIRECT + req.originalUrl);
  });

  router.get("/ping", async function (req, res, next) {
    console.log("Recieved ping");
    res.status(200).json({
      status: "pong",
      salt: randomUUID(),
      timestamp: Date.now(),
    });
  });
}
module.exports = router;
