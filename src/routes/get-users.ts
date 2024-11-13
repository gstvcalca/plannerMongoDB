import { FastifyInstance } from 'fastify';
import { User } from '../models/user-model';
import { validate } from 'uuid';
import { isValidObjectId } from 'mongoose';

interface UserParams {
  id: string;
}

export async function getAllUsers(app: FastifyInstance) {
  app.get('/users', async (req, reply) => {
    const users = await User.find();
    return { users };
  });
}

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

export async function createUser(app: FastifyInstance){
  app.post('/users', async (req, reply) => {
    const user = new User(req.body);
    await user.save();
    reply.send(user);
  })
}

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
