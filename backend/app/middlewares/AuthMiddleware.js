const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware d'authentification
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // dans le cookie
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = { userId: decoded.id };

      const user = await User.findById({ _id: decoded.id });

      if (!user) {
        res.status(404).json({ msg: "User not found" });
      }

      next();
    } catch (err) {
      console.log("Token verification error:", err.message);
      return res.status(401).json({ msg: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
