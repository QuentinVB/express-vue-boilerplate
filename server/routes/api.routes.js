const express = require('express');
const router = express.Router();
const userRouter = require("../api/routes/user.routes");
const postRouter = require("../api/routes/post.routes");

router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
