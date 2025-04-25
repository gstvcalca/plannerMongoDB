import mongoose, { mongo } from "mongoose";

export interface UserParams {
  id: string;
}

export interface TripParams {
  tripid: string;
}

export interface CreateTripParams {
  destination: string;
  starts_at: string;
  ends_at: string;
  created_by: {
    _id: string;
    name: string;
    img_url: string;
    email: string;
  };
  emails_to_invite: string[];
}

export interface UpdateTripParams{
  _id: string
  destination: string
  starts_at: string
  ends_at: string
  created_by: {_id: string, name: string, email: string, img_url: string}
  img_url: string
  description: string
  guests: {_id?: string, name: string, email: string, img_url: string, is_confirmed: boolean}[]
  infos: {title: string, description: string}[]
  links: {title: string, url: string}[]
  activities: {_id?: string, activity_date: string, day_activities: {title: string, occurs_at: string}[]}[]
  category: string
}


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
