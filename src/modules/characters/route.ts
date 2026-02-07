import { dataCharacters } from "./data";
import { prisma } from "../../lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CharactersSchema, CharacterSchema, CharacterUpdateSchema, CharacterCreateSchema, ErrorSchema, SuccessSchema, CharacterIdParamSchema, CharacterSlugParamSchema } from "./schema";

let characters = dataCharacters;

export const characterRoute = new OpenAPIHono();

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
    request: {
      params: CharacterSlugParamSchema,
    },
    responses: {
      200: {
        description: "Retrieve a character by slug",
        content: {
          "application/json": {
            schema: CharacterSchema,
            example: {
              id: "clabcdef1234567890ghijklmn",
              name: "Harry Potter",
              slug: "harry-potter",
              alternateNames: "The Boy Who Lived",
              species: "Human",
              gender: "Male",
              house: "Gryffindor",
              birthDate: "1980-07-31T00:00:00.000Z",
              birthYear: 1980,
              isWizard: true,
              ancestry: "Half-blood",
              eyeColour: "Green",
              hairColour: "Black",
              patronus: "Stag",
              isHogwartsStudent: true,
              isHogwartsStaff: false,
              actor: "Daniel Radcliffe",
              alternateActors: "",
              isAlive: true,
              imageUrl: "https://example.com/images/harry.jpg",
              wands: [
                {
                  wood: "Holly",
                  core: "Phoenix feather",
                  length: 11,
                },
              ],
            },
          },
        },
      },
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
    request: {
      body: {
        content: {
          "application/json": {
            schema: CharacterCreateSchema,
            example: {
              name: "Harry Potter",
              slug: "harry-potter",
              alternateNames: "The Boy Who Lived",
              species: "Human",
              gender: "Male",
              house: "Gryffindor",
              birthDate: "1980-07-31",
              birthYear: 1980,
              isWizard: true,
              ancestry: "Half-blood",
              eyeColour: "Green",
              hairColour: "Black",
              patronus: "Stag",
              isHogwartsStudent: true,
              isHogwartsStaff: false,
              actor: "Daniel Radcliffe",
              alternateActors: [],
              isAlive: true,
              imageUrl: "https://example.com/images/harry.jpg",
              wands: [
                {
                  name: "Harry Wand",
                  slug: "harrys-wand",
                  wood: "Holly",
                  core: "Phoenix feather",
                  length: 11,
                },
              ],
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Character created successfully",
        content: {
          "application/json": {
            schema: CharacterSchema,
            example: {
              id: "clqwerty123456",
              name: "Harry Potter",
              slug: "harry-potter",
              alternateNames: "The Boy Who Lived",
              species: "Human",
              gender: "Male",
              house: "Gryffindor",
              birthDate: "1980-07-31T00:00:00.000Z",
              birthYear: 1980,
              isWizard: true,
              ancestry: "Half-blood",
              eyeColour: "Green",
              hairColour: "Black",
              patronus: "Stag",
              isHogwartsStudent: true,
              isHogwartsStaff: false,
              actor: "Daniel Radcliffe",
              alternateActors: [],
              isAlive: true,
              imageUrl: "https://example.com/images/harry.jpg",
              wands: [
                {
                  id: "wand123",
                  name: "Harry's Wand",
                  slug: "harrys-wand",
                  wood: "Holly",
                  core: "Phoenix feather",
                  length: 11,
                  characterId: "clqwerty123456",
                },
              ],
            },
          },
        },
      },
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
          house: body.house,
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
    request: {
      params: CharacterIdParamSchema,
      body: {
        content: {
          "application/json": {
            schema: CharacterUpdateSchema,
            example: {
              name: "Hermione Granger",
              slug: "hermione-granger",
              alternateNames: "Hermione Jean Granger",
              species: "Human",
              gender: "Female",
              house: "Gryffindor",
              birthDate: "1979-09-19",
              birthYear: 1979,
              isWizard: true,
              ancestry: "Muggle-born",
              eyeColour: "Brown",
              hairColour: "Brown",
              patronus: "Otter",
              isHogwartsStudent: true,
              isHogwartsStaff: false,
              actor: "Emma Watson",
              alternateActors: "",
              isAlive: true,
              imageUrl: "https://example.com/images/hermione.jpg",
              wands: [
                {
                  name: "Hermione Wand",
                  slug: "hermiones-wand",
                  wood: "Vine",
                  core: "Dragon heartstring",
                  length: 10.75,
                },
              ],
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Character updated successfully",
        content: {
          "application/json": {
            schema: CharacterSchema,
            example: {
              id: "clabcdef123456",
              name: "Hermione Granger",
              slug: "hermione-granger",
              alternateNames: "Hermione Jean Granger",
              species: "Human",
              gender: "Female",
              house: "Gryffindor",
              birthDate: "1979-09-19T00:00:00.000Z",
              birthYear: 1979,
              isWizard: true,
              ancestry: "Muggle-born",
              eyeColour: "Brown",
              hairColour: "Brown",
              patronus: "Otter",
              isHogwartsStudent: true,
              isHogwartsStaff: false,
              actor: "Emma Watson",
              alternateActors: "",
              isAlive: true,
              imageUrl: "https://example.com/images/hermione.jpg",
              wands: [
                {
                  id: "wand456",
                  name: "Hermione Wand",
                  slug: "hermiones-wand",
                  wood: "Vine",
                  core: "Dragon heartstring",
                  length: 10.75,
                  characterId: "clabcdef123456",
                },
              ],
            },
          },
        },
      },
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

      const { wands, ...characterData } = body;

      const resultUpdatedCharacter = await prisma.$transaction(async (tx) => {
        const updatedCharacter = await tx.character.update({
          where: { id },
          data: characterData,
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
          include: { wands: true },
        });
      });

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
    request: {
      params: CharacterIdParamSchema,
      body: {
        content: {
          "application/json": {
            schema: CharacterUpdateSchema,
            example: {
              house: "Gryffindor",
              eyeColour: "Brown",
              hairColour: "Brown",
              wands: [
                {
                  name: "Hermione Wand",
                  slug: "hermiones-wand",
                  wood: "Vine",
                  core: "Dragon heartstring",
                  length: 10.75,
                },
              ],
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Character partially updated successfully",
        content: { "application/json": { schema: CharacterSchema } },
        example: {
          id: "clabcdef1234567890ghijklmn",
          name: "Hermione Granger",
          slug: "hermione-granger",
          house: "Gryffindor",
          eyeColour: "Brown",
          hairColour: "Brown",
          wands: [
            {
              id: "wand456",
              name: "Hermione Wand",
              slug: "hermiones-wand",
              wood: "Vine",
              core: "Dragon heartstring",
              length: 10.75,
              characterId: "clabcdef1234567890ghijklmn",
            },
          ],
        },
      },
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
      const { wands, ...characterData } = body;

      const resultUpdatedCharacter = await prisma.$transaction(async (tx) => {
        const updatedCharacter = await tx.character.update({
          where: { id },
          data: characterData,
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
          include: { wands: true },
        });
      });

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
