const jwt = require("jsonwebtoken");
require('dotenv').config();
const { createToken, createRefreshToken } = require('../middlewares/jwtGenerationMiddleware');

module.exports.tokenAuthMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  const refreshToken = req.cookies.refreshToken;

  if (!token && !refreshToken) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No tokens provided.",
    });
  }

  if (token) {
    try {
    
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Invalid token.",
      });
    }
  } else if (refreshToken) {
    try {

      const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
      const newToken = createToken(refreshDecoded.EmployeeCode, refreshDecoded.RoleID);
      const newRefreshToken = createRefreshToken(refreshDecoded.EmployeeCode, refreshDecoded.RoleID);

      res.cookie("jwt", newToken, { httpOnly: true, maxAge: 1 * 60 * 1000 }); // 1 minute
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: 3 * 60 * 1000 }); // 2 minutes

      req.user = refreshDecoded;
      next();
    } catch (refreshErr) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No valid tokens provided.",
    });
  }
};


module.exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 1) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};


module.exports.checkEditor = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 2) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 3) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};

module.exports.checkFixedAssetTeam = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 4) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};

module.exports.checkBillingTeam = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 5) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};


module.exports.checkKeyAccountsSupervisor = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 6) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};

module.exports.checkERTeam = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    
    if (decoded.RoleID !== 7) {
      return res.status(403).json({
        status: "FAILURE",
        message: "Access denied. User is not an admin.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid token.",
    });
  }
};

