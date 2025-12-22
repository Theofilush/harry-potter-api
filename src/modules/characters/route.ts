import { Hono } from "hono";
import { dataCharacters } from "./data";

let characters = dataCharacters;

export const characterRoute = new Hono();

characterRoute.get("/", (c) => {
  return c.json(characters);
});

characterRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const character = characters.find(
    (character) => character.slug.toLowerCase() === slug.toLowerCase()
  );

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

characterRoute.post("/", async (c) => {
  const body = await c.req.json();
  const nameCharacter = body.name;

  if (!nameCharacter || nameCharacter.length === 0) {
    return c.json({ message: "Character name is required" }, 400);
  }

  const newCharacter = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
  };

  const updatedCharacters = [...characters, newCharacter];
  characters = updatedCharacters;

  return c.json(newCharacter, 201);
});

characterRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const character = characters.find((character) => character.id === id);

  if (!character) {
    return c.notFound();
  }

  const newCharacter = {
    ...character,
    ...body,
    updatedAt: new Date(),
  };

  const updatedCharacters = characters.map((character) => {
    if (character.id === id) return newCharacter;
    else return character;
  });

  characters = updatedCharacters;

  return c.json(newCharacter);
});
