export type TodoId = string;

export type Todo = {
  id: TodoId;
  title: string;
  done: boolean;
  createdAt: Date;
};

export function createTodo(props: {
  title: string;
}): Omit<Todo, "id" | "createdAt" | "done"> & { done: boolean } {
  const title = props.title?.trim();
  if (!title) throw new Error("Title is required");
  return { title, done: false };
}

export function toggle(todo: Todo): Todo {
  return { ...todo, done: !todo.done };
}

// From DB (Prisma) to domain (ensure Date type)
export function toDomain(row: {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date | string;
}): Todo {
  return {
    id: row.id,
    title: row.title,
    done: row.done,
    createdAt:
      row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt),
  };
}

// From domain to API response (stringify Date)
export function toDTO(todo: Todo) {
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt.toISOString(),
  };
}
