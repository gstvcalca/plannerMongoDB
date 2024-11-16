import mongoose from "mongoose";
import { User } from "./user-model";

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  starts_at: {
    type: Date,
    required: true,
    trim: true,
  },
  ends_at: {
    type: Date,
    required: true,
    trim: true,
  },
  is_confirmed: Boolean,
  created_by: {
    type: String,
    required: true,
    trim: true,
  },
  img_url: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  guests: [{
    name: String,
    email: String,
    url: String
}],
  infos: [
    {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  ],
  links: [
    { title: { type: String, trim: true }, url: { type: String, trim: true } },
  ],
  activities: [{ title: { type: String, trim: true }, occurs_at: Date }],
});

export const Trip = mongoose.model("Trip", tripSchema);
