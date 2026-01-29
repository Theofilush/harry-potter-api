import { dataCharacters } from "./data";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema } from "./schema";

let characters = dataCharacters;

export const characterRoute = new OpenAPIHono();

characterRoute.get("/", async (c) => {
  const allCharacters = await prisma.character.findMany({
    // relationLoadStrategy: "join",
    include: {
      wands: {
        select: {
          wood: true,
          core: true,
          length: true,
        },
      },
    },
  });
  return c.json(allCharacters);
});

characterRoute.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const character = await prisma.character.findUnique({
    where: {
      slug: slug,
    },
    include: {
      wands: {
        select: {
          wood: true,
          core: true,
          length: true,
        },
      },
    },
  });

  if (!character) {
    return c.notFound();
  }

  return c.json(character);
});

characterRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await prisma.wand.deleteMany({
    where: { characterId: id },
  });

  await prisma.character.delete({
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
    update: {
      name: newCharacter.name,
      slug: newCharacter.slug,
      alternateNames: newCharacter.alternateNames,
      species: newCharacter.species,
      gender: newCharacter.gender,
      house: newCharacter.house,
      birthDate: newCharacter.birthDate,
      birthYear: newCharacter.birthYear,
      wizard: newCharacter.wizard,
      ancestry: newCharacter.ancestry,
      eyeColour: newCharacter.eyeColour,
      hairColour: newCharacter.hairColour,
      patronus: newCharacter.patronus,
      hogwartsStudent: newCharacter.hogwartsStudent,
      hogwartsStaff: newCharacter.hogwartsStaff,
      actor: newCharacter.actor,
      alternateActors: newCharacter.alternateActors,
      alive: newCharacter.alive,
      image: newCharacter.image,
    },
    create: {
      ...newCharacter,
      wands: newCharacter.wands
        ? {
            create: newCharacter.wands.map((wand: any) => ({
              wood: wand.wood,
              core: wand.core,
              length: wand.length,
            })),
          }
        : undefined,
    },
  });

  // Create or Update Wands
  if (newCharacter.wands) {
    await prisma.wand.deleteMany({
      where: { characterId: upsertCharacter.id },
    });

    await prisma.wand.createMany({
      data: newCharacter.wands.map((wand: any) => ({
        wood: wand.wood,
        core: wand.core,
        length: wand.length,
        characterId: upsertCharacter.id,
      })),
    });
  }

  return c.json(upsertCharacter, 201);
});

characterRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { wands, ...newCharacter } = body;

  const character = await prisma.character.findUnique({
    where: {
      id: id,
    },
  });

  if (!character) {
    return c.notFound();
  }

  const updatedCharacter = await prisma.character.update({
    where: { id: id },
    data: {
      ...newCharacter,
      wands: wands
        ? {
            deleteMany: {}, // remove all wands relate character ID
            create: wands.map((wand: any) => ({
              wood: wand.wood ?? "",
              core: wand.core ?? "",
              length: Number(wand.length) || 0,
            })),
          }
        : undefined,
    },
    include: { wands: true },
  });

  return c.json(updatedCharacter);
});

const route = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

characterRoute.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});
