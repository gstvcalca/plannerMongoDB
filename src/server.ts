import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip, createTripMongo } from "./routes/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { getUsers } from "./routes/get-users";
import mongoose from "mongoose";
import { getUserById } from "./routes/get-user";
import { deleteUserById } from "./routes/delete-user";
import { createUser } from "./routes/create-user";

const app = fastify({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: env.PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

app.register(cors, {
  origin: "*",
});

mongoose
  .connect(
    "mongodb+srv://gstvcalca:HImcT4qW9ElORn2L@cluster0.piknxu4.mongodb.net/planner",
    {}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(getUsers);
app.register(getUserById);
app.register(deleteUserById);
app.register(createUser);
app.register(createTripMongo);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);
