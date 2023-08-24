const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
  res.redirect("/user");
});

const login = asyncHandler(async (req, res, next) => {
  const userName = req.body.userName;
  const user = await UserModel.findOne({ userName: userName });

  if (!user) {
    return res
      .status(403)
      .json({ error: "Utilisateur ou mot de passe non trouvé !" });
  }
  const isValid = bcrypt.compare(req.body.password, user.passwordHash);
  if (!isValid) {
    return res.status(403).json({ error: "Mot de passe incorrect !" });
  }

  //Generate and split the token
  const JWT_TokenSplited = jwt
    .sign(
      { userId: user._id },
      process.env.JWT_SECRET_TOKEN, // le token est signé avec le secret dans notre fichier .env et le token expire dans une durée de 24h
      { expiresIn: "24h" }
    )
    .split(".");

  const cookieOptions = {
    maxAge: 1000 * 60 * 15, //15 min
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "none" : "strict",
    secure: true,
  };
  //signature is stored into a cookie, the header and payload are send into the body
  res
    .status(200)
    .cookie("JWT_SIGN", JWT_TokenSplited[2], cookieOptions)
    .json({
      // si cela correspond on renvoie l'id utilisateur et on le signe
      userId: user.id,
      token: `${JWT_TokenSplited[0]}.${JWT_TokenSplited[1]}`,
    });
  console.log(`Successfully log in user ${userName}-${user._id}  `);
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("JWT_SIGN");
  res.end();
});

module.exports = { register, login, logout };
