const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuthUser = (req, res, next) => {
  const token = req.cookies.jwt_Token;
  console.log("token", token);

  if (token) {
    jwt.verify(token, "net 9antra secret", async (err, decodedToken) => {
      if (err) {
        res.json("*Probleme_Token");
      } else {
        req.user = await userModel.findById(decodedToken.id);
        next();
      }
    });
  } else {
    res.json("Pas de Token");
  }
};

module.exports = { requireAuthUser };