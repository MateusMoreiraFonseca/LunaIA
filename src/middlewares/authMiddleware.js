const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Acesso não autorizado você não está logado.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.payload.userId,
      username: decoded.payload.username,
      isAdmin: decoded.payload.isAdmin,
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Acesso não autorizado.",
    });
  }
};

module.exports = authMiddleware;
