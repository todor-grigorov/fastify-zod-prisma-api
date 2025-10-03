import Fastify from "fastify";
import cors from "@fastify/cors";
import todoRoutes from "./modules/todo.routes";
import { toHttp } from "./core/errors";

export function buildApp() {
  const app = Fastify();
  app.register(cors, { origin: true });

  app.setErrorHandler((err, _req, reply) => {
    const { status, body } = toHttp(err);
    reply.code(status).send(body);
  });

  app.register(todoRoutes);
  return app;
}
