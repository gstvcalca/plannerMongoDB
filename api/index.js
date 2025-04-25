import fastify from "fastify";
import cors from "@fastify/cors";
import { createTripMongo } from "./routes/create-trip";
import { updateTripMongo } from "./routes/update-trip";
import { getTrip } from "./routes/get-trip-details";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { getUsers } from "./routes/get-users";
import mongoose from "mongoose";
import { getUserById } from "./routes/get-user";
import { deleteUserById } from "./routes/delete-user";
import { createUser } from "./routes/create-user";
import { getTrips } from "./routes/get-trips";

let cachedApp = null;

async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://gstvcalca:${env.DBPASS}@cluster0.piknxu4.mongodb.net/planner`
    );
    console.log("Connected to MongoDB");
  }
}

export default async function handler(req, res) {
  if (!cachedApp) {
    const app = fastify({ logger: true });

    await app.register(cors, {
      origin: [
        "https://plannermongodb.onrender.com",
        "https://gstvcalca.com",
        "https://planner-mongodb-gustavo.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
    });

    app.setErrorHandler(errorHandler);
    app.register(getUsers);
    app.register(getUserById);
    app.register(deleteUserById);
    app.register(createUser);
    app.register(createTripMongo);
    app.register(getTrips);
    app.register(updateTripMongo);
    app.register(getTrip);

    cachedApp = app;
  }

  await connectMongo();

  cachedApp.ready((err) => {
    if (err) throw err;
    cachedApp.server.emit("request", req, res);
  });
}
