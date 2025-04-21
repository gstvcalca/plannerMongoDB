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

const app = fastify({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: env.PORT});
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
console.log("Server is running on port" + env.PORT);

app.register(cors, {
  origin: ["https://plannermongodb.onrender.com"],
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
