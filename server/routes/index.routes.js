const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

router.get("/", async function (req, res, next) {
  res.redirect("/app/")
});

router.get("/app/*", async function (req, res, next) {
  if (isDev) {
    res.render("index-dev", { devUrl: process.env.APP_REDIRECT });
    return;
  }
  
  res.status(200).sendFile(path.join(__dirname, "../../dist/index.html"))
});

if (isDev) {
  router.get("/src/*", async function (req, res, next) {
    console.info("Dev mode, redirect to Vite");
    console.log(req.originalUrl);
    res.redirect(process.env.APP_REDIRECT + req.originalUrl);
  });

  router.get("/debug/ping", async function (req, res, next) {
    console.log("Recieved ping");
    res.status(200).json({
      status: "pong",
      salt: randomUUID(),
      timestamp: Date.now(),
    });
  });
}
module.exports = router;
