const jwt = require("jsonwebtoken");
const User = require("../../models/AuthSchema/authschema");
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dskvs23rk3nroi82rwef0@w019i2r9ks@j01v0iwjug320220398sd";

  const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
  
      console.log("Decoded User:", req.user);
  
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
  
module.exports = authMiddleware;
