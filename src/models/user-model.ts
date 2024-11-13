import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
})

export const User = mongoose.model("User", userSchema);

export interface userInterface{
    name: string,
    email: string,
    url: string
}
