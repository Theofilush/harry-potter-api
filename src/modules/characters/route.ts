import { Hono } from "hono";
import { dataCharacters } from "./data";

let characters = dataCharacters;

export const characterRoute = new Hono();

characterRoute.get("/", (c) => {
  return c.json(characters);
});

characterRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const character = characters.find((character) => character.slug.toLowerCase() === slug.toLowerCase());

  if (!character) {
    return c.notFound();
  }

  return c.json(character);
});

characterRoute.delete("/:id", (c) => {
  const id = c.req.param("id");

  const updatedCharacters = characters.filter((character) => character.id !== id);

  if (characters.length === updatedCharacters.length) {
    return c.notFound();
  }

  characters = updatedCharacters;

  return c.json({
    message: `Character ${id} deleted`,
  });
});

characterRoute.post("/", async (c) => {
  const body = await c.req.json();
  const nameCharacter = body.name;

  if (!nameCharacter || nameCharacter.length === 0) {
    return c.json({ error: "Bad Request" }, 400);
  }

  const newCharacter = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
  };

  const updatedCharacter = [...dataCharacters, newCharacter];
  characters = updatedCharacter;

  return c.json(
    {
      message: `Character ${nameCharacter} added`,
    },
    201
  );
});

characterRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const newCharacter = {
    ...body,
    updatedAt: new Date(),
  };

  const updatedCharacter = dataCharacters.map((character) => {
    if (character.id === id) {
      return {
        ...character,
        ...newCharacter,
      };
    } else return character;
  });

  characters = updatedCharacter;

  return c.json({
    message: `Character ${id} updated`,
  });
});
