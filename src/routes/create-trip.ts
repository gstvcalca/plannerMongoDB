import type { FastifyInstance } from 'fastify'
import { ClientError } from '../errors/client-error.js'
import { Trip } from '../models/trip-model.js'
import { CreateTripParams } from '../models/params-model.js'
import { User } from '../models/user-model.js'
import { format } from 'date-fns'


async function populateGuests(emails: string[]){
  const guests = await Promise.all(
    emails.map(async (email) => {
      let user = await User.findOne({email});

      if (!user) {
        user = await User.create({email});
      }

      return({
        _id: user._id.toString(),
        name: user.name || null,
        email: user.email,
        img_url: user.img_url || null,
        is_confirmed: false
      });
    })
  );

  return guests
}

function populateActivities(start: string, end: string){
  const activities = [];
  let currentDate = new Date(start);
  const endDate = new Date(end);

  while(currentDate <= endDate){
    activities.push({
      activity_date: format(new Date(currentDate), 'yyyy-MM-dd HH:mm:ss'),
      day_activities: []
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return activities
}

export async function createTripMongo(app: FastifyInstance){
  app.post<{Body: CreateTripParams}>('/trips', async (req, reply) => {
    try {
      const {
        destination,
        starts_at,
        ends_at,
        created_by,
        emails_to_invite,
      } = req.body

      if (new Date(starts_at).getTime() < new Date().getTime()) {
        throw new ClientError('Invalid trip start date.')
      }

      if (new Date(ends_at).getTime() < new Date(starts_at).getTime()) {
        throw new ClientError('Invalid trip end date.')
      }

      const guests = await populateGuests(emails_to_invite);
      const activities = populateActivities(starts_at, ends_at);
      const img_url = 'https://static.wikia.nocookie.net/naruto/images/5/50/My%C5%8Dbokuzan.PNG';
      const description = "Click here to enter your description";
      const infos: any = [];
      const links: any = [];
      const category = '';
      const newTrip = new Trip({
        destination,
        starts_at,
        ends_at,
        created_by,
        img_url,
        description,
        guests,
        infos,
        links,
        activities,
        category
      });
      await newTrip.save();
      reply.status(201).send({ message: 'Trip created successfully', trip: newTrip });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  })
}
