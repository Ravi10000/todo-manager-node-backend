import jwt from 'jsonwebtoken';

export function generateAuthToken({ user }) {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
}