import express from 'express';
import jwt from 'jsonwebtoken';

const auth = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      if (roles && !roles.includes(decoded.role))
        return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    });
  };
};

export default auth;