import { FastifyInstance } from "fastify";
import { TodoController } from "./controllers/todo.controller";

export default async function todoRoutes(app: FastifyInstance) {
  app.get("/api/todos", {}, TodoController.list); // List
  app.get("/api/todos/:id", {}, TodoController.getById); // Read by ID
  app.post("/api/todos", {}, TodoController.create); // Create
  app.put("/api/todos/:id", {}, TodoController.update); // Update
  app.delete("/api/todos/:id", {}, TodoController.remove); // Delete
}
