import { Hono } from "hono";
import { dataCharacters } from "./data";

export const characterRoute = new Hono();

characterRoute.get("/", (c) => {
  return c.json(dataCharacters);
});

characterRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundCharacter = dataCharacters.find((character) => character.slug === slug);

  if (!foundCharacter) {
    return c.notFound();
  }

  return c.json(foundCharacter);
});

characterRoute.delete("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundCharacter = dataCharacters.findIndex((item) => item.slug === slug);

  if (foundCharacter === -1) {
    return c.notFound();
  }

  const deleted = dataCharacters.splice(foundCharacter, 1)[0];

  return c.json({ responseCode: "success", responseMessage: "Deleted success" });
});
