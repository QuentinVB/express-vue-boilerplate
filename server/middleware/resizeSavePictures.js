const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const resizeSavePicture = asyncHandler(async (req, res, next) => {
  const filename = `${uuidv4()}.jpeg`;

  const imagePath = path.join(__dirname, "..","..", "medias", filename);
  await sharp(req.file.buffer)
    .resize(200, 200,{fit:"outside"})
    .jpeg({ quality: 80 })
    .toFile(imagePath);
  req.file.filename = filename;

  next();
});

module.exports = resizeSavePicture;
