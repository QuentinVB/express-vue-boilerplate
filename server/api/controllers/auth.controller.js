const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
    res.redirect("/user");
});

const login = asyncHandler(async (req, res, next) => {
    const userName = req.body.userName;
    const user = await UserModel.findOne({ userName: userName })

    if (!user) {
        return res.status(401).json({ error: "Utilisateur ou mot de passe non trouvé !" });
    }
    const isValid = bcrypt.compare(req.body.password, user.passwordHash);
    if(!isValid)
    {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
    }

    res
    .status(200)
    .json({
        // si cela correspond on renvoie l'id utilisateur et on le signe
        userId: user.id,
        token: jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_TOKEN, // le token est signé avec le secret dans notre fichier .env et le token expire dans une durée de 24h
          { expiresIn: "24h" }
        ),
      });
  });

  const logout = asyncHandler(async (req, res, next) => {
    res.redirect("/user");
});

  module.exports = { register,login, logout };

  