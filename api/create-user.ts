import { FastifyInstance } from "fastify";
import { User } from "./models.js";



export async function createUser(app: FastifyInstance) {
  app.post("/users", async (req, reply) => {
    const user = new User(req.body);
    await user.save();
    reply.send(user);
  });
}
