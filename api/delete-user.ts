import { FastifyInstance } from "fastify";
import { isValidObjectId } from "mongoose";
import { User } from "./user-model.js";
import { UserParams } from "./params-model.js";


export async function deleteUserById(app: FastifyInstance){
    app.delete<{ Params: UserParams }>('/users/:id', async (req, reply) => {
      const {id} = req.params
      if(isValidObjectId(id)){
        const user = await User.findByIdAndDelete(req.params.id);
        reply.send(user);
      }
      return {message: "Invalid id provided."}
    })
  }