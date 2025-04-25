import fastify from "fastify";
import cors from "@fastify/cors";
import { createTripMongo } from "./routes/create-trip.js";
import { updateTripMongo } from "./routes/update-trip.js";
import { getTrip } from "./routes/get-trip-details.js";
import { errorHandler } from "./error-handler.js";
import { env } from "./env.js";
import { getUsers } from "./routes/get-users.js";
import mongoose from "mongoose";
import { getUserById } from "./routes/get-user.js";
import { deleteUserById } from "./routes/delete-user.js";
import { createUser } from "./routes/create-user.js";
import { getTrips } from "./routes/get-trips.js";

const app = fastify({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0"});
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
console.log("Server is running on port" + env.PORT);

app.register(cors, {
  origin: ["https://plannermongodb.onrender.com", "https://gstvcalca.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

mongoose
  .connect(
    "mongodb+srv://gstvcalca:" + env.DBPASS + "@cluster0.piknxu4.mongodb.net/planner",
    {}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.setErrorHandler(errorHandler);

app.register(getUsers);
app.register(getUserById);
app.register(deleteUserById);
app.register(createUser);
app.register(createTripMongo);
app.register(getTrips);
app.register(updateTripMongo);
app.register(getTrip);
