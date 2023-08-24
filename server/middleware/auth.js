const jwt = require("jsonwebtoken");

// JWT Auth Token module
module.exports = (req, res, next) => {
  try {
    //get header and payload from authorization bearer
    const tokenPart1 = req.headers.authorization.split(" ")[1];
    //and get cookie session signature
    const tokenPart2 = req.cookies["JWT_SIGN"];
    const token = `${tokenPart1}.${tokenPart2}`;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };
	
    next();
  } catch (error) {
    res.status(401).json({ error: error | "Requete non authentifiée" });
  }
};
