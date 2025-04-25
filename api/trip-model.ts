import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  starts_at: {
    type: String,
    required: true,
    trim: true,
  },
  ends_at: {
    type: String,
    required: true,
    trim: true,
  },
  created_by: {
    _id: String,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    img_url: {
      type: String,
      trim: true,
      required: true,
    },
  },
  img_url: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  guests: [
    {
      _id: String,
      name: String,
      email: String,
      url: String,
      is_confirmed: Boolean,
    },
  ],
  infos: [
    {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  ],
  links: [
    { title: { type: String, trim: true }, url: { type: String, trim: true } },
  ],
  activities: [
    {
      activity_date: String,
      day_activities: [
        { title: { type: String, trim: true }, occurs_at: String },
      ],
    },
  ],
  category: String,
});

export const Trip = mongoose.model("Trip", tripSchema);
