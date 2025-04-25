import { FastifyInstance } from 'fastify';
import { User } from '../src/models/user-model.js';


export async function getUsers(app: FastifyInstance) {
  app.get('/users', async (req, reply) => {
    const users = await User.find();
    return { users };
  });
}
