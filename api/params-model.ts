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
