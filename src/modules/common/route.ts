import { Hono } from "hono";

export const commonRoute = new Hono();

commonRoute.get("/", (c) => {
  return c.json<{
    title: string;
    characters: string;
  }>({
    title: "Harry Potter API",
    characters: "/characters",
  });
});
