import mongoose, { Schema } from "mongoose";
import { title } from "process";

const notifyModel = new mongoose.Schema({

    data: String,
    title: {
        type: String,
        default: "New Victim"
    },
    user_id: String,
    data_id: String,
    seen: {
        type: Boolean,
        default: false
    },
    date: {
        type: Number,
        default: Date.now()
    },

})

const Notification = mongoose.models.notification || mongoose.model("notification", notifyModel);
export default Notification;