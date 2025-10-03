import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public code: string, public status = 400, message?: string) {
    super(message ?? code);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", public details?: unknown) {
    super("VALIDATION_ERROR", 400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super("NOT_FOUND", 404, message);
  }
}

export function toHttp(err: unknown): {
  status: number;
  body: { code: string; message: string; details?: unknown };
} {
  if (err instanceof AppError) {
    return {
      status: err.status,
      body: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError && err.details
          ? { details: err.details }
          : {}),
      },
    };
  }

  if (err instanceof ZodError) {
    const details = err.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
      code: i.code,
    }));
    return {
      status: 400,
      body: { code: "VALIDATION_ERROR", message: "Invalid request", details },
    };
  }

  const message = err instanceof Error ? err.message : "Unexpected error";
  return { status: 500, body: { code: "INTERNAL_ERROR", message } };
}
