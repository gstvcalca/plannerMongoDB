import type { FastifyInstance } from 'fastify'
import { Trip } from '../models/trip-model.js'
import { TripParams, UserParams } from '../models/params-model.js'
import { isValidObjectId } from 'mongoose'


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
