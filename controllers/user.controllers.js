import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/generate-auth-token.js";

export async function registerUser(req, res, next) {
    try {
        const { email, password } = req.body;

        const userExists = await User.exists({ email });
        if (userExists) throw new Error("user already registered with that email address", { cause: { status: 400 } });
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, hash });
        const authToken = generateAuthToken({ user });

        res.status(201).json({
            status: "success",
            message: "registartion successful",
            user: { email: user.email },
            authToken
        })
    } catch (error) {
        console.log({ error })
        next(error)
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error("no account associated with this email address", { cause: { status: 404 } });
        const isCorrectPassword = await bcrypt.compare(password, user.hash);
        if (!isCorrectPassword) throw new Error("incorrect email or password", { cause: { status: 400 } });
        const authToken = generateAuthToken({ user });

        res.status(200).json({
            status: "success",
            message: "login successful",
            user: { email: user.email },
            authToken
        });
    } catch (error) {
        console.log({ error })
        next(error)
    }
}

export async function fetchProfile(req, res, next) {
    try {
        console.log({ user: req.user });

        const user = await User.findById(req.user._id).select('email');
        if (!user) throw new Error("unauthorised", { cause: { status: 403 } });
        res.status(200).json({
            status: "success",
            message: "profile fetched",
            user
        })
    } catch (error) {
        console.log({ error })
        next(error)
    }
}