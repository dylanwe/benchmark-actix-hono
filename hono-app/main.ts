import { type Context, Hono } from "jsr:@hono/hono";
import { logger } from "jsr:@hono/hono/logger";
import { HttpStatus } from "jsr:@gizmo/http-status";
import { diveSolve } from "./aoc_2021_dive.ts";

interface Submarine {
  id: number;
  name: string;
  depthInMeters: number;
}

const api = new Hono();
api.get("/sumbarine", (c: Context) => {
  const submarine: Submarine = {
    id: 1,
    name: "The Ahab",
    depthInMeters: 100,
  };

  return c.json(
    submarine,
    HttpStatus.OK,
    { "Content-Type": "application/json" },
  );
});

api.post("/dive", async (c: Context) => {
  const body = await c.req.json();

  if (!body.instructions || typeof body.instructions !== "string") {
    return c.json(
      { message: "Invalid request" },
      HttpStatus.BadRequest,
      { "Content-Type": "application/json" },
    );
  }

  try {
    const result = diveSolve(body.instructions);
    return c.json(
      { result },
      HttpStatus.OK,
      { "Content-Type": "application/json" },
    );
  } catch (_error) {
    return c.json(
      { message: "An error occured" },
      HttpStatus.InternalServerError,
      { "Content-Type": "application/json" },
    );
  }
});

const app = new Hono();
app.use(logger());
app.route("/api/v1", api);

app.get("/healthz", (c: Context) => {
  return c.json(
    { message: "It's alive!" },
    HttpStatus.OK,
    { "Content-Type": "application/json" },
  );
});

Deno.serve({ port: 8080 }, app.fetch);

export default app;
