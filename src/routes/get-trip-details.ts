import type { FastifyInstance } from 'fastify'

import { isValidObjectId } from 'mongoose'
import { TripParams } from '../models/params-model';
import { Trip } from '../models/trip-model';


export async function getTrip(app: FastifyInstance){
  app.get<{Params: TripParams}>('/trips/:tripid', async (req, reply) => {
    const {tripid} =  req.params;
    if(isValidObjectId(tripid)){
      const trip = await Trip.findById(tripid);
      return {trip}
    }else {
      return {message: "Invalid trip ID provided." + tripid}
    }
  })
}
