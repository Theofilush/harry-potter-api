import { dataCharacters } from "./data";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CharactersSchema, CharacterSchema, CharacterUpdateSchema, CharacterCreateSchema, ErrorSchema, SuccessSchema } from "./schema";

let characters = dataCharacters;

export const characterRoute = new OpenAPIHono();

// characterRoute.get("/", async (c) => {
//   const allCharacters = await prisma.character.findMany({
//     include: {
//       wands: {
//         select: {
//           wood: true,
//           core: true,
//           length: true,
//         },
//       },
//     },
//   });
//   return c.json(allCharacters);
// });

// characterRoute.get("/:slug", async (c) => {
//   const slug = c.req.param("slug");

//   const character = await prisma.character.findUnique({
//     where: {
//       slug: slug,
//     },
//     include: {
//       wands: {
//         select: {
//           wood: true,
//           core: true,
//           length: true,
//         },
//       },
//     },
//   });

//   if (!character) {
//     return c.notFound();
//   }

//   return c.json(character);
// });

// characterRoute.delete("/:id", async (c) => {
//   const id = c.req.param("id");

//   await prisma.wand.deleteMany({
//     where: { characterId: id },
//   });

//   await prisma.character.delete({
//     where: {
//       id: id,
//     },
//   });

//   return c.json({
//     message: `Character ${id} deleted`,
//   });
// });

// characterRoute.post("/", async (c) => {
//   const body = await c.req.json();

//   const newCharacter = {
//     ...body,
//     birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
//   };

//   const upsertCharacter = await prisma.character.upsert({
//     where: {
//       slug: newCharacter.slug,
//     },
//     update: {
//       name: newCharacter.name,
//       slug: newCharacter.slug,
//       alternateNames: newCharacter.alternateNames,
//       species: newCharacter.species,
//       gender: newCharacter.gender,
//       house: newCharacter.house,
//       birthDate: newCharacter.birthDate,
//       birthYear: newCharacter.birthYear,
//       wizard: newCharacter.wizard,
//       ancestry: newCharacter.ancestry,
//       eyeColour: newCharacter.eyeColour,
//       hairColour: newCharacter.hairColour,
//       patronus: newCharacter.patronus,
//       hogwartsStudent: newCharacter.hogwartsStudent,
//       hogwartsStaff: newCharacter.hogwartsStaff,
//       actor: newCharacter.actor,
//       alternateActors: newCharacter.alternateActors,
//       alive: newCharacter.alive,
//       imageUrl: newCharacter.Url,
//     },
//     create: {
//       ...newCharacter,
//       wands: newCharacter.wands
//         ? {
//             create: newCharacter.wands.map((wand: any) => ({
//               wood: wand.wood,
//               core: wand.core,
//               length: wand.length,
//             })),
//           }
//         : undefined,
//     },
//   });

//   // Create or Update Wands
//   if (newCharacter.wands) {
//     await prisma.wand.deleteMany({
//       where: { characterId: upsertCharacter.id },
//     });

//     await prisma.wand.createMany({
//       data: newCharacter.wands.map((wand: any) => ({
//         wood: wand.wood,
//         core: wand.core,
//         length: wand.length,
//         characterId: upsertCharacter.id,
//       })),
//     });
//   }

//   return c.json(upsertCharacter, 201);
// });

// characterRoute.put("/:id", async (c) => {
//   const id = c.req.param("id");
//   const body = await c.req.json();
//   const { wands, ...newCharacter } = body;

//   const character = await prisma.character.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   if (!character) {
//     return c.notFound();
//   }

//   const updatedCharacter = await prisma.character.update({
//     where: { id: id },
//     data: {
//       ...newCharacter,
//       wands: wands
//         ? {
//             deleteMany: {}, // remove all wands relate character ID
//             create: wands.map((wand: any) => ({
//               wood: wand.wood ?? "",
//               core: wand.core ?? "",
//               length: Number(wand.length) || 0,
//             })),
//           }
//         : undefined,
//     },
//     include: { wands: true },
//   });

//   return c.json(updatedCharacter);
// });

// GET /character
characterRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: { description: "Retrieve all characters", content: { "application/json": { schema: CharactersSchema } } },
      400: { description: "Invalid request parameters", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request parameters" } } } },
      404: { description: "No characters found", content: { "application/json": { schema: ErrorSchema, example: { error: "No characters found" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const allCharacters = await prisma.character.findMany({
        include: {
          wands: {
            select: { wood: true, core: true, length: true },
          },
        },
        // include: {
        //   wands: true,
        // },
      });

      if (!allCharacters || allCharacters.length === 0) {
        return c.json({ error: "No characters found" }, 404);
      }

      return c.json(allCharacters as any, 200);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// GET /character/:slug
characterRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    responses: {
      200: { description: "Retrieve a character by slug", content: { "application/json": { schema: CharacterSchema } } },
      400: { description: "Invalid slug parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid slug parameter" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const slug = c.req.param("slug");

      if (!slug || slug.trim() === "") {
        return c.json({ error: "Invalid slug parameter" }, 400);
      }

      const character = await prisma.character.findUnique({
        where: { slug },
        include: {
          wands: {
            select: { wood: true, core: true, length: true },
          },
        },
      });

      if (!character) {
        return c.json({ error: "Character not found" }, 404);
      }

      return c.json(character as any, 200);
    } catch (err) {
      console.error("Error fetching character:", err);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// DELETE /character/:id
characterRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    responses: {
      200: { description: "Character deleted successfully", content: { "application/json": { schema: SuccessSchema, example: { message: "Character deleted successfully" } } } },
      400: { description: "Invalid ID parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid ID parameter" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const id = c.req.param("id");

      if (!id || typeof id !== "string" || id.length !== 26) {
        return c.json({ error: "Invalid ID parameter" }, 400);
      }

      await prisma.character.delete({ where: { id } });

      return c.json({ message: "Character deleted successfully" }, 200);
    } catch (err: any) {
      if (err.code === "P2025") {
        return c.json({ error: "Character not found" }, 404);
      }
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// POST /character
characterRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: { "application/json": { schema: CharacterCreateSchema } },
      },
    },
    responses: {
      201: { description: "Character created successfully", content: { "application/json": { schema: CharacterSchema } } },
      400: { description: "Invalid request body", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request body" } } } },
      409: { description: "Character already exists", content: { "application/json": { schema: ErrorSchema, example: { error: "Character already exists" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const body = await c.req.json();

      if (!body.name || !body.slug) {
        return c.json({ error: "Invalid request body" }, 400);
      }

      const newCharacter = await prisma.character.create({ data: body });

      return c.json(newCharacter as any, 201);
    } catch (err: any) {
      if (err.code === "P2002") {
        return c.json({ error: "Character already exists" }, 409);
      }
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// PUT /character
characterRoute.openapi(
  createRoute({
    method: "put",
    path: "/:id",
    request: {
      body: {
        content: { "application/json": { schema: CharacterUpdateSchema } },
      },
    },
    responses: {
      200: { description: "Character updated successfully", content: { "application/json": { schema: CharacterSchema } } },
      400: { description: "Invalid request body or ID parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request body" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      409: { description: "Character already exists", content: { "application/json": { schema: ErrorSchema, example: { error: "Character already exists" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      if (!id || typeof id !== "string" || id.length !== 26) {
        return c.json({ error: "Invalid ID parameter" }, 400);
      }
      if (!body.name || !body.slug) {
        return c.json({ error: "Invalid request body" }, 400);
      }

      const updatedCharacter = await prisma.character.update({
        where: { id },
        data: body,
      });
      return c.json(updatedCharacter as any, 200);
    } catch (err: any) {
      if (err.code === "P2025") {
        return c.json({ error: "Character not found" }, 404);
      }
      if (err.code === "P2002") {
        return c.json({ error: "Character already exists" }, 409);
      }

      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// PATCH /character/:id
characterRoute.openapi(
  createRoute({
    method: "patch",
    path: "/:id",
    request: {
      body: {
        content: { "application/json": { schema: CharacterUpdateSchema } },
      },
    },
    responses: {
      200: { description: "Character partially updated successfully", content: { "application/json": { schema: CharacterSchema } } },
      400: { description: "Invalid request body or ID parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request body" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      409: { description: "Character already exists", content: { "application/json": { schema: ErrorSchema, example: { error: "Character already exists" } } } },
      500: { description: "Internal server error", content: { "application/json": { schema: ErrorSchema, example: { error: "Internal server error" } } } },
    },
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      if (!id || typeof id !== "string" || id.length !== 26) {
        return c.json({ error: "Invalid ID parameter" }, 400);
      }
      if (!body || Object.keys(body).length === 0) {
        return c.json({ error: "Invalid request body" }, 400);
      }

      const updatedCharacter = await prisma.character.update({
        where: { id },
        data: body,
        include: {
          wands: {
            select: { wood: true, core: true, length: true },
          },
        },
      });

      return c.json(updatedCharacter as any, 200);
    } catch (err: any) {
      if (err.code === "P2025") {
        return c.json({ error: "Character not found" }, 404);
      }
      if (err.code === "P2002") {
        return c.json({ error: "Character already exists" }, 409);
      }

      return c.json({ error: "Internal server error" }, 500);
    }
  },
);
