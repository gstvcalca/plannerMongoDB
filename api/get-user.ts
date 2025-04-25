import { FastifyInstance } from "fastify";
import { isValidObjectId } from "mongoose";
import { UserParams } from "./params-model.js";
import { User } from "./user-model.js";


export async function getUserById(app: FastifyInstance) {
    app.get<{ Params: UserParams }>('/users/:id', async (req, reply) => {
      const { id } = req.params;
      if (isValidObjectId(id)) {
        const user = await User.findById(id);
        return { user };
      }
      return {message: "Invalid id provided."}
    });
  }
  