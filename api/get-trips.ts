import { FastifyInstance } from "fastify";
import { Trip } from "./models.js";


export async function getTrips(app: FastifyInstance){
    app.get('/trips', async (req, reply) => {
        const trips = await Trip.find();
        return {trips}
    })
}
