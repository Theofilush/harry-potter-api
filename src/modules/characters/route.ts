import { Hono } from "hono";
import { dataCharacters } from "./data";

let characters = dataCharacters;

export const characterRoute = new Hono();

characterRoute.get("/", (c) => {
  return c.json(characters);
});

characterRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const character = characters.find((character) => character.slug === slug);

  if (!character) {
    return c.notFound();
  }

  return c.json(character);
});

characterRoute.delete("/:id", (c) => {
  const id = c.req.param("id");

  const updatedCharacters = characters.filter(
    (character) => character.id !== id
  );

  if (characters.length === updatedCharacters.length) {
    return c.notFound();
  }

  characters = updatedCharacters;

  return c.json({
    message: `Character ${id} deleted`,
  });
});
