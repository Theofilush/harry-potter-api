// import { z } from "zod";
import { z } from "@hono/zod-openapi";

export const WandSchema = z.object({
  id: z.string().min(1).optional().openapi({ example: "01ARZ3NDEKTSV4RRFFQ69G5FAV" }),
  name: z.string().min(1).nullable().openapi({ example: "Harry Potter Holly" }),
  slug: z.string().min(1).nullable().openapi({ example: "harry-potter-holly" }),
  wood: z.string().min(1).nullable().openapi({ example: "holly" }),
  core: z.string().min(1).nullable().openapi({ example: "phoenix feather" }),
  length: z.number().nonnegative().nullable().openapi({ example: 11 }),
  createdAt: z.date().optional().openapi({ example: "2026-01-18T14:43:15.388Z" }),
  updatedAt: z.date().optional().openapi({ example: "2026-01-18T15:09:08.238Z" }),
});

export const CharacterSchema = z.object({
  id: z.string().min(1).openapi({ example: "01ARZ3NDEKTSV4RRFFQ69G5FAV" }),
  name: z.string().min(1).nullable().openapi({ example: "Harry Potter" }),
  slug: z.string().min(1).openapi({ example: "harry-potter" }),
  alternateNames: z.string().min(1).openapi({ example: "The Boy Who Lived" }),
  // TODO: alternateNames: z.array(z.string()),
  species: z.string().min(1).openapi({ example: "human" }),
  gender: z.string().min(1).openapi({ example: "male" }),
  house: z.string().min(1).openapi({ example: "Gryffindor" }),
  birthDate: z.date().nullable().openapi({ example: "1980-07-31T00:00:00.000Z" }),
  birthYear: z.number().nullable().openapi({ example: 1980 }),
  ancestry: z.string().min(1).nullable().openapi({ example: "half-blood" }),
  eyeColour: z.string().min(1).nullable().openapi({ example: "hazel" }),
  hairColour: z.string().min(1).openapi({ example: "dark brown" }),
  patronus: z.string().min(1).nullable().openapi({ example: "stag" }),
  actor: z.string().min(1).openapi({ example: "Daniel Radcliffe" }),
  alternateActors: z.string().min(1).nullable().openapi({ example: "" }),
  imageUrl: z.string().min(1).nullable().openapi({ example: "https://ik.imagekit.io/hpapi/harry.jpg" }),
  // TODO: alternateActors: z.array(z.string()),
  isWizard: z.boolean().nullable().openapi({ example: true }),
  isHogwartsStudent: z.boolean().nullable().openapi({ example: true }),
  isHogwartsStaff: z.boolean().nullable().openapi({ example: true }),
  isAlive: z.boolean().nullable().openapi({ example: true }),

  wands: z
    .array(WandSchema)
    .nullable()
    .optional()
    .openapi({
      example: [{ wood: "holly", core: "phoenix feather", length: 11 }],
    }),
  createdAt: z.date().openapi({ example: "2026-01-18T14:43:15.388Z" }),
  updatedAt: z.date().openapi({ example: "2026-01-18T15:09:08.238Z" }),
});

export const CharacterCreateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  house: z.string().nullable().optional(),
  patronus: z.string().nullable().optional(),
  wands: z.array(WandSchema).optional(),
});

export const CharacterUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  house: z.string().nullable().optional(),
  patronus: z.string().nullable().optional(),
  wands: z.array(WandSchema).optional(),
});

export const ErrorSchema = z.object({ error: z.string() });
export const SuccessSchema = z.object({ message: z.string() });

export const CharactersSchema = z.array(CharacterSchema);

export type Character = z.infer<typeof CharacterSchema>;
export type Characters = z.infer<typeof CharactersSchema>;
