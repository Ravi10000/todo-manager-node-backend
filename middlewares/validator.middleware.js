import { validationResult } from "express-validator";
export function validator(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();

    const errors = {};
    result.errors.forEach(({ path, msg }) => {
        errors[path] = msg;
    })
    return res.status(400).json({
        status: "error",
        message: "validation error",
        errors
    })
}