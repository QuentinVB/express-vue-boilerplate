//run backend server and serve app

//packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const cors = require('cors');

//modules
const DBInit = require("./helpers/dbConnect");
const indexRouter = require("./routes/index.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./api/routes/user.route");

// initialize mongoDB
DBInit();

// initialize and configure express
const app = express();
//TODO disable when in dev

app.use(compression());

if (process.env.NODE_ENV !== "development") {
  //csp
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      },
    })
  );
  //rate limiter
  const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });
  // Apply rate limiter to all requests
  app.use(limiter);
} else {
  console.warn("DEV Mode : CORS and CSP disabled")
  //disable CORS and CSP
  app.use(cors());
}

/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set this to true on production
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/", indexRouter);
app.use("/auth", authRouter);

//API routes
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
