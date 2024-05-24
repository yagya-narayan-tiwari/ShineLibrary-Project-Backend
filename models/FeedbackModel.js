import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const feedBackForm = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
})

export const feedBack = new mongoose.model("Feedback",feedBackForm);