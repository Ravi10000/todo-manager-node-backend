import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    try {
        const unAuthError = new Error("Unauthorised User");
        const authToken = req.get("Authorization")?.split(" ")?.[1];
        if (!authToken) throw unAuthError;
        req.user = jwt.verify(authToken, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({
            status: "error",
            message: error.message
        })
    }
}