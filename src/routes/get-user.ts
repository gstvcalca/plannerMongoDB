import { FastifyInstance } from "fastify";
import { isValidObjectId } from "mongoose";
import { UserParams } from "../models/params-model";
import { User } from "../models/user-model";


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
  