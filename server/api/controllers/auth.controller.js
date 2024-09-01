const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("./user.controller");
const {
  confirmKey,
  confirmKeyGenerator,
} = require("../../helpers/confirmKey.js");
const { sendEmailReset } = require("../../services/emailer.js");
const isDev = process.env.NODE_ENV === "development";

const register = asyncHandler(async (req, res, next) => {
  return createUser(req, res, next);
});

const login = asyncHandler(async (req, res, next) => {
  const userName = req.body.userName;
  const user = await UserModel.findOne({ userName: userName });

  if (!user) {
    return res
      .status(403)
      .json({ error: "Utilisateur ou mot de passe non trouvé !" })
      .end();
  }

  const isValid = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!isValid) {
    return res.status(403).json({ error: "Mot de passe incorrect !" }).end();
  }

  if (!user.accountConfirmed) {
    return res
      .status(403)
      .json({ error: "Compte non confirmé, veuillez vérifiez vos emails" })
      .end();
  }

  //Generate and split the token
  const JWT_TokenSplited = jwt
    .sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "24h",
    })
    .split(".");

  const cookieOptions = {
    maxAge: 1000 * 60 * 15, //15 min
    httpOnly: true,
    sameSite: "strict", //process.env.NODE_ENV === "development" ? "none" :
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
      msg:"Connecté !"
    });
  if (isDev) console.log(`Successfully log in user ${userName}-${user._id}  `);
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("JWT_SIGN");
  res.status(200).end();
});

const confirm = asyncHandler(async (req, res, next) => {
  const key = req.query.key;
  const userId = req.query.id;

  const userToConfirm = await UserModel.findById(userId);

  if (
    await confirmKey(
      userToConfirm.id,
      userToConfirm.userName,
      userToConfirm.userEmail,
      key
    )
  ) {
    userToConfirm.accountConfirmed = true;
    await userToConfirm.save();
    res.status(200).render("confirm-redirect");
  } else {
    return res
      .status(403)
      .json({ error: "Utilisateur non confirmé, email invalide" });
  }
});

const passwordResetRequest = asyncHandler(async (req, res, next) => {
  const userEmail = req.body.userEmail;

  const user = await UserModel.findOne({ userEmail: userEmail });
  if (!user) {
    return res
      .status(403)
      .json({ error: "Utilisateur ou mot de passe non trouvé !" })
      .end();
  }
  //TODO : mark user a "reset in progress"

  //FIXME: coupling and to many responsibilities
  if (process.env.NODE_ENV !== "test") {
    const key = await confirmKeyGenerator(
      user.id,
      user.userName,
      user.userEmail
    );
    await sendEmailReset(userEmail, user.id, key);
  }
  return res
    .status("200")
    .json({ msg: "Mail envoyé, consultez votre messagerie" })
    .end();
});

const passwordReset = asyncHandler(async (req, res, next) => {
  const key = req.query.key;
  const userId = req.query.id;

  const userToReset = await UserModel.findById(userId);

  if (
    await confirmKey(
      userToReset.id,
      userToReset.userName,
      userToReset.userEmail,
      key
    )
  ) {
    await userToReset.save();
    res.redirect(
      `/app/changePassword?id=${encodeURI(userToReset.id)}&key=${encodeURI(
        key
      )}`
    );
  } else {
    return res
      .status(403)
      .json({ error: "Utilisateur non confirmé, email invalide" });
  }
});

const changePassword = asyncHandler(async (req, res, next) => {
  const key = req.body.key;
  const userId = req.body.id;
  const newPassword = req.body.password;

  const userToChange = await UserModel.findById(userId);

  if (
    await confirmKey(
      userToChange.id,
      userToChange.userName,
      userToChange.userEmail,
      key
    )
  ) {
    const hash = await bcrypt.hash(newPassword, 10);
    userToChange.passwordHash = hash;

    await UserModel.findByIdAndUpdate(userId, userToChange);
    return res.status(200).json({ msg: "Mot de passe mis à jour" });
  } else {
    return res
      .status(403)
      .json({ error: "Utilisateur non confirmé, email invalide" });
  }
});

module.exports = {
  register,
  login,
  logout,
  confirm,
  passwordResetRequest,
  passwordReset,
  changePassword,
};
