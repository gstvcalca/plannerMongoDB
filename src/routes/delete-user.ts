import { FastifyInstance } from "fastify";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user-model";
import { UserParams } from "../models/params-model";


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