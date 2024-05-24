import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatno:{
        type: Number,
        unique: true
    },
    username:{
        type: String,
        required: false
    },
    userid:{
        type: String,
        required: false
    },
    booked:{
        type: Boolean,
        required: true
    }
})

export const Seat = new mongoose.model("Seat",seatSchema)