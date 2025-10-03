import { FastifyRequest, FastifyReply } from "fastify";
import { TodoService } from "../services/todo.service";
import { toDTO } from "../domain/todo.entity";

export const TodoController = {
  list: async (_req: FastifyRequest, reply: FastifyReply) => {
    const items = await TodoService.list();
    reply.send(items.map(toDTO));
  },

  getById: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const item = await TodoService.getById(req.params.id);
    reply.send(toDTO(item));
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const created = await TodoService.create(req.body);
    reply.code(201).send(toDTO(created));
  },

  update: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const updated = await TodoService.update(req.params.id, req.body);
    reply.send(toDTO(updated));
  },

  remove: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    await TodoService.remove(req.params.id);
    reply.code(204).send();
  },
};
