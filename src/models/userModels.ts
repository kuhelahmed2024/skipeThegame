import mongoose, { Schema } from "mongoose";

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    loginToken: String,
    profileImage: String,
    url: String,
    rool: {
        type: Number,
        default: 1
    },
    lastActive: {
        type: Date,
        default: Date.now()
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    forgetPassToken: {
        token: String,
        validation: Date
    },
    accountStatus: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.models.users || mongoose.model("users", userModel);
export default User;