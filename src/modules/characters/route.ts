import { Hono } from "hono";
import { dataCharacters } from "./data";
import { prisma } from "../../lib/prisma";

let characters = dataCharacters;

export const characterRoute = new Hono();

characterRoute.get("/", async (c) => {
  const allCharacters = await prisma.character.findMany();
  return c.json(allCharacters);
});

characterRoute.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const character = await prisma.character.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!character) {
    return c.notFound();
  }

  return c.json(character);
});

characterRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const deletedCharacter = await prisma.character.delete({
    where: {
      id: id,
    },
  });

  return c.json({
    message: `Character ${id} deleted`,
  });
});

characterRoute.post("/", async (c) => {
  const body = await c.req.json();

  const newCharacter = {
    ...body,
    birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
  };

  const upsertCharacter = await prisma.character.upsert({
    where: {
      slug: newCharacter.slug,
    },
    update: newCharacter,
    create: newCharacter,
  });
  return c.json(upsertCharacter, 201);
});

characterRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { ...newCharacter } = body;

  const updatedCharacter = await prisma.character.update({
    where: {
      id: id,
    },
    data: newCharacter,
  });

  return c.json(updatedCharacter);
});
