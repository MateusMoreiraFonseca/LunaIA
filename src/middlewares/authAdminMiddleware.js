const jwt = require("jsonwebtoken");

const authAdminMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token de autenticação ausente. Acesso não autorizado.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.payload.isAdmin) {
      return res.status(403).json({
        message: "Acesso negado. Apenas administradores podem realizar esta ação.",
      });
    }

    req.user = {
      userId: decoded.payload.userId,
      username: decoded.payload.username,
      isAdmin: decoded.payload.isAdmin,
    };


    next();
  } catch (error) {
    res.status(401).json({
      message: "Token de autenticação inválido. Acesso não autorizado.",
    });
  }
};

module.exports = authAdminMiddleware;
