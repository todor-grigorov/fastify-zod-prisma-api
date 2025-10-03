import { z } from "zod";

export const TodoCreate = z.object({
  title: z.string().min(1, "Title is required"),
});
export const TodoUpdate = z.object({
  title: z.string().min(1).optional(),
  done: z.boolean().optional(),
});
export const TodoIdParams = z.object({ id: z.string() });

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
});

export type TodoCreate = z.infer<typeof TodoCreate>;
export type TodoUpdate = z.infer<typeof TodoUpdate>;
