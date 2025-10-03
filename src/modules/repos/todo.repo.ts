import { prisma } from "../../core/db";
import { toDomain } from "../domain/todo.entity";

export const TodoRepo = {
  list: async () => {
    const rows = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(toDomain);
  },
  getById: async (id: string) => {
    const row = await prisma.todo.findUnique({ where: { id } });
    return row ? toDomain(row) : null;
  },
  create: async (data: { title: string }) => {
    const row = await prisma.todo.create({ data });
    return toDomain(row);
  },
  update: async (
    id: string,
    patch: Partial<{ title: string; done: boolean }>
  ) => {
    const row = await prisma.todo.update({ where: { id }, data: patch });
    return toDomain(row);
  },
  remove: async (id: string) => {
    await prisma.todo.delete({ where: { id } });
  },
};
