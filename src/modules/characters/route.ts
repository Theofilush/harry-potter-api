import {
  dataCharacters,
  exampleRequestCreateCharacter,
  exampleRequestPatchCharacter,
  exampleRequestUpdateCharacter,
  exampleResponseCreateCharacter,
  exampleResponseGetBySlug,
  exampleResponsePatchCharacter,
  exampleResponseUpdateCharacter,
} from "./data";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CharactersSchema, CharacterSchema, CharacterUpdateSchema, CharacterCreateSchema, ErrorSchema, SuccessSchema, CharacterIdParamSchema, CharacterSlugParamSchema } from "./schema";

let characters = dataCharacters;
const tags = ["/characters"];

export const characterRoute = new OpenAPIHono();

// GET /character
characterRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
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
    tags,
    request: {
      params: CharacterSlugParamSchema,
    },
    responses: {
      200: { description: "Retrieve a character by slug", content: { "application/json": { schema: CharacterSchema, example: exampleResponseGetBySlug } } },
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
    tags,
    request: {
      params: CharacterIdParamSchema,
    },
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
    tags,
    request: {
      body: { content: { "application/json": { schema: CharacterCreateSchema, example: exampleRequestCreateCharacter } } },
    },
    responses: {
      201: { description: "Character created successfully", content: { "application/json": { schema: CharacterSchema, example: exampleResponseCreateCharacter } } },
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

      const newCharacter = await prisma.character.create({
        data: {
          name: body.name,
          slug: body.slug,
          alternateNames: body.alternateNames,
          species: body.species,
          gender: body.gender,
          hogwartsHouseSlug: body.hogwartsHouseSlug,
          birthDate: body.birthDate ? new Date(body.birthDate) : null,
          birthYear: body.birthYear,
          isWizard: body.isWizard,
          ancestry: body.ancestry,
          eyeColour: body.eyeColour,
          hairColour: body.hairColour,
          patronus: body.patronus,
          isHogwartsStudent: body.isHogwartsStudent,
          isHogwartsStaff: body.isHogwartsStaff,
          actor: body.actor,
          alternateActors: body.alternateActors,
          isAlive: body.isAlive,
          imageUrl: body.imageUrl,
        },
        include: {
          wands: true,
        },
      });
      if (body.wands && Array.isArray(body.wands)) {
        for (const wand of body.wands) {
          await prisma.wand.upsert({
            where: { slug: wand.slug },
            update: {
              name: wand.name,
              wood: wand.wood,
              core: wand.core,
              length: wand.length,
              characterId: newCharacter.id,
            },
            create: {
              name: wand.name,
              slug: wand.slug,
              wood: wand.wood,
              core: wand.core,
              length: wand.length,
              characterId: newCharacter.id,
            },
          });
        }
      }
      const characterWithWands = await prisma.character.findUnique({
        where: { id: newCharacter.id },
        include: { wands: true },
      });

      return c.json(characterWithWands as any, 201);
    } catch (err: any) {
      if (err.code === "P2002") {
        return c.json({ error: "Character already exists" }, 409);
      }
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// PUT /character/:id
characterRoute.openapi(
  createRoute({
    method: "put",
    path: "/{id}",
    tags,
    request: {
      params: CharacterIdParamSchema,
      body: {
        content: { "application/json": { schema: CharacterUpdateSchema, example: exampleRequestUpdateCharacter } },
      },
    },

    responses: {
      200: { description: "Character updated successfully", content: { "application/json": { schema: CharacterSchema, example: exampleResponseUpdateCharacter } } },
      400: { description: "Invalid request body or ID parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request body" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      409: { description: "Character already exists", content: { "application/json": { schema: ErrorSchema, example: { error: "Character already exists" } } } },
      422: { description: "Invalid hogwartsHouseSlug", content: { "application/json": { schema: ErrorSchema, example: { error: "hogwartsHouseSlug does not exist" } } } },
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

      const { hogwartsHouseSlug, wands, ...characterData } = body;
      const hogwartsHouseSlugTrimmed = hogwartsHouseSlug && hogwartsHouseSlug.trim() !== "" ? hogwartsHouseSlug : null;

      if (hogwartsHouseSlugTrimmed) {
        const isHouseExists = await prisma.hogwartsHouse.findUnique({
          where: { slug: hogwartsHouseSlugTrimmed },
        });
        if (!isHouseExists) {
          return c.json({ error: "hogwartsHouseSlug does not exist" }, 422);
        }
      }

      const resultUpdatedCharacter = await prisma.$transaction(async (tx) => {
        const updatedCharacter = await tx.character.update({
          where: { id },
          data: {
            ...characterData,
            hogwartsHouseSlug: hogwartsHouseSlugTrimmed,
          },
        });

        await tx.wand.deleteMany({
          where: { characterId: updatedCharacter.id },
        });

        if (wands && Array.isArray(wands)) {
          for (const wand of wands) {
            await tx.wand.create({
              data: {
                name: wand.name,
                slug: wand.slug,
                wood: wand.wood,
                core: wand.core,
                length: wand.length,
                characterId: updatedCharacter.id,
              },
            });
          }
        }

        return tx.character.findUnique({
          where: { id: updatedCharacter.id },
          include: { wands: true, hogwartsHouse: true },
        });
      });

      if (!resultUpdatedCharacter) {
        return c.json({ error: "Character not found" }, 404);
      }

      return c.json(resultUpdatedCharacter as any, 200);
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
    path: "/{id}",
    tags,
    request: {
      params: CharacterIdParamSchema,
      body: {
        content: { "application/json": { schema: CharacterUpdateSchema, example: exampleRequestPatchCharacter } },
      },
    },
    responses: {
      200: { description: "Character partially updated successfully", content: { "application/json": { schema: CharacterSchema } }, example: exampleResponsePatchCharacter },
      400: { description: "Invalid request body or ID parameter", content: { "application/json": { schema: ErrorSchema, example: { error: "Invalid request body" } } } },
      404: { description: "Character not found", content: { "application/json": { schema: ErrorSchema, example: { error: "Character not found" } } } },
      409: { description: "Character already exists", content: { "application/json": { schema: ErrorSchema, example: { error: "Character already exists" } } } },
      422: { description: "Invalid hogwartsHouseSlug", content: { "application/json": { schema: ErrorSchema, example: { error: "hogwartsHouseSlug does not exist" } } } },
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

      const { wands, hogwartsHouseSlug, ...characterData } = body;
      let hogwartsHouseSlugTrimmed: string | null | undefined = undefined;

      if (hogwartsHouseSlug !== undefined) {
        hogwartsHouseSlugTrimmed = hogwartsHouseSlug && hogwartsHouseSlug.trim() !== "" ? hogwartsHouseSlug : null;

        if (hogwartsHouseSlugTrimmed) {
          const houseExists = await prisma.hogwartsHouse.findUnique({
            where: { slug: hogwartsHouseSlugTrimmed },
          });
          if (!houseExists) {
            return c.json({ error: "hogwartsHouseSlug does not exist" }, 422);
          }
        }
      }

      const resultUpdatedCharacter = await prisma.$transaction(async (tx) => {
        const updatedCharacter = await tx.character.update({
          where: { id },
          data: {
            ...characterData,
            ...(hogwartsHouseSlugTrimmed !== undefined && { hogwartsHouseSlug: hogwartsHouseSlugTrimmed }),
          },
        });

        if (wands && Array.isArray(wands)) {
          for (const wand of wands) {
            await tx.wand.upsert({
              where: { slug: wand.slug },
              update: {
                name: wand.name,
                wood: wand.wood,
                core: wand.core,
                length: wand.length,
                characterId: updatedCharacter.id,
              },
              create: {
                name: wand.name,
                slug: wand.slug,
                wood: wand.wood,
                core: wand.core,
                length: wand.length,
                characterId: updatedCharacter.id,
              },
            });
          }
        }

        return tx.character.findUnique({
          where: { id: updatedCharacter.id },
          include: { wands: true, hogwartsHouse: true },
        });
      });

      if (!resultUpdatedCharacter) {
        return c.json({ error: "Character not found" }, 404);
      }

      return c.json(resultUpdatedCharacter as any, 200);
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
