import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    }
});

const User = model("User", userSchema);

export default User;