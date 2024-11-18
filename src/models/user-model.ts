import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true
    },
    img_url: {
        type: String,
        trim: true
    }
})

export const User = mongoose.model("User", userSchema);

export interface userInterface{
    name: string,
    email: string,
    img_url: string
}
