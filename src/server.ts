import { buildApp } from "./app";
const port = Number(process.env.PORT ?? 3001);
buildApp()
  .listen({ port, host: "0.0.0.0" })
  .then(() => console.log(`API running at http://localhost:${port}`));
