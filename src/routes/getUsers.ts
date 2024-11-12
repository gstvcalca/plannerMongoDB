import { FastifyInstance } from 'fastify';
import { User } from '../models/user-model';


export function getUsersRoute(app: FastifyInstance, options, done){

      console.log(options);
    
      app.get("/users", async (req, reply) => {
        const users = await User.find();
        reply.send(users);
      });

      app.post("/users", async (req, reply) => {
        const user = new User(req.body);
        await user.save();
        reply.send(user);
      });
      
      app.get("/users/:id", (req, reply) => {
        const user = User.findById(req.params.id);
        reply.send(user);
      });

      done();
}
