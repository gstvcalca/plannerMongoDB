import type { FastifyInstance } from "fastify";
import { Trip } from "./trip-model.js";
import { UpdateTripParams } from "./params-model.js";
import { User } from "./user-model.js";
import { format } from "date-fns";

async function populateGuestsUpdate(emails: string[]) {
  const guests = await Promise.all(
    emails.map(async (email) => {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ email });
      }
      return {
        _id: user._id.toString(),
        name: user.name || null,
        email: user.email,
        img_url: user.img_url || null,
        is_confirmed: false,
      };
    })
  );
  return guests;
}

function populateActivitiesUpdate(tripInfo: UpdateTripParams) {
  const newActivities = tripInfo.activities;
  let currentDate = new Date(tripInfo.starts_at);
  const endDate = new Date(tripInfo.ends_at);
  const startTime = new Date(tripInfo.starts_at).getTime();
  const endTime = new Date(tripInfo.ends_at).getTime();

  while (currentDate <= endDate) {
    if (
      !newActivities.find(
        (item) =>
          item.activity_date === format(currentDate, "yyyy-MM-dd HH:mm:ss")
      )
    ) {
      newActivities.push({
        activity_date: format(new Date(currentDate), "yyyy-MM-dd HH:mm:ss"),
        day_activities: [],
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const dateFilter = newActivities.filter((item) => {
    const itemTime = new Date(item.activity_date).getTime();
    return itemTime >= startTime && itemTime <= endTime
  });

  return dateFilter;
}

export async function updateTripMongo(app: FastifyInstance) {
  app.put<{ Body: UpdateTripParams }>("/trips/:tripid", async (req, reply) => {
    const tripInfo = req.body;
    const newActivities = populateActivitiesUpdate(tripInfo);
    const guestsMail = tripInfo.guests.map((item) => item.email);
    const newGuests = await populateGuestsUpdate(guestsMail);
    console.log(newGuests);
    const trip = await Trip.findByIdAndUpdate(
      tripInfo._id,
      { ...tripInfo, activities: newActivities, guests: newGuests },
      { new: true }
    );
    return trip;
  });
}
