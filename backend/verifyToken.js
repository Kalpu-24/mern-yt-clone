import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return next(createError("Unauthorized", 401));
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError("Token is not valid", 403));
        req.user = user;
        next();
    })
}