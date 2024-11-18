import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'
import { Trip } from '../models/trip-model'
import { TripParams, UserParams } from '../models/params-model'
import { isValidObjectId } from 'mongoose'




export async function getTripDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        select: {
          id: true,
          destination: true,
          starts_at: true,
          ends_at: true,
          is_confirmed: true,
        },
        where: { id: tripId },
      })

      if (!trip) {
        throw new ClientError('Trip not found')
      }

      return { trip }
    },
  )
}

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
