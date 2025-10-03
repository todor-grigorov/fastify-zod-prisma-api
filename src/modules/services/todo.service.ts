// src/modules/todos/todo.service.ts
import { TodoCreate, TodoUpdate } from "../zod/todo.schema";
import { TodoRepo } from "../repos/todo.repo";
import { createTodo } from "../domain/todo.entity";
import { ValidationError, NotFoundError } from "../../core/errors";

export const TodoService = {
  list: () => TodoRepo.list(),

  getById: async (id: string) => {
    if (!id?.trim()) throw new ValidationError("ID is required");
    const todo = await TodoRepo.getById(id);
    if (!todo) throw new NotFoundError("Todo not found");
    return todo;
  },

  create: async (input: unknown) => {
    const { title } = TodoCreate.parse(input);
    const draft = createTodo({ title });
    return TodoRepo.create({ title: draft.title });
  },

  update: async (id: string, input: unknown) => {
    if (!id?.trim()) throw new ValidationError("ID is required");

    await TodoService.getById(id);

    const patch = TodoUpdate.parse(input); // { title?: string; done?: boolean }
    if (Object.keys(patch).length === 0) return TodoService.getById(id);
    return TodoRepo.update(id, patch);
  },

  remove: async (id: string) => {
    if (!id?.trim()) throw new ValidationError("ID is required");

    await TodoService.getById(id);
    await TodoRepo.remove(id);
  },
};
