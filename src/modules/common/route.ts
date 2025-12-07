import { Hono } from "hono";

export const commonRoute = new Hono();

commonRoute.get("/", (c) => {
  return c.json({
    titles: "Harry Potter Wiki API",
    characte: "/characters",
  });
});
