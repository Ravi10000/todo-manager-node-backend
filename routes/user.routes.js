import { Router } from "express";
import { fetchProfile, loginUser, registerUser } from "../controllers/user.controllers.js";
import { body } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",
    [
        body("email")
            .isEmail()
            .withMessage("invalid email")
            .notEmpty()
            .withMessage("email required")
            .toLowerCase(),
        body("password").notEmpty().withMessage("password required"),
    ],
    validator,
    registerUser
)
router.post("/login",
    [
        body("email")
            .isEmail()
            .withMessage("invalid email")
            .notEmpty()
            .withMessage("email required")
            .toLowerCase(),
        body("password").notEmpty().withMessage("password required"),
    ],
    validator,
    loginUser
)

router.get('/profile', isAuthenticated, fetchProfile)
export default router;