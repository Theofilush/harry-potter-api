// import { z } from "zod";
import { z } from "@hono/zod-openapi";

export const WandSchema = z.object({
  wood: z.string().min(1).nullable().openapi({ example: "holly" }),
  core: z.string().min(1).nullable().openapi({ example: "phoenix feather" }),
  length: z.number().nonnegative().openapi({ example: 11 }),
});

export const CharacterSchema = z.object({
  id: z.string().min(1).openapi({ example: "7b8c1b10-a6c1-45c6-a3cc-b7ee135e1ff6" }),
  name: z.string().min(1).openapi({ example: "Harry Potter" }),
  slug: z.string().min(1).openapi({ example: "harry-potter" }),
  alternateNames: z.string().min(1).openapi({ example: "The Boy Who Lived" }),
  // alternateNames: z.array(z.string()),
  species: z.string().min(1).openapi({ example: "human" }),
  gender: z.string().min(1).openapi({ example: "male" }),
  house: z.string().min(1).nullable().openapi({ example: "Gryffindor" }),
  birthDate: z.date().nullable().openapi({ example: "1980-07-31T00:00:00.000Z" }),
  birthYear: z.number().nullable().openapi({ example: 1980 }),
  wizard: z.boolean().openapi({ example: true }),
  ancestry: z.string().min(1).nullable().openapi({ example: "half-blood" }),
  eyeColour: z.string().min(1).nullable().openapi({ example: "hazel" }),
  hairColour: z.string().min(1).nullable().openapi({ example: "dark brown" }),
  wands: z
    .array(WandSchema)
    .optional()
    .nullable()
    .openapi({
      example: [{ wood: "holly", core: "phoenix feather", length: 11 }],
    }),
  patronus: z.string().min(1).nullable().openapi({ example: "stag" }),
  hogwartsStudent: z.boolean().openapi({ example: true }),
  hogwartsStaff: z.boolean().openapi({ example: true }),
  actor: z.string().min(1).openapi({ example: "Daniel Radcliffe" }),
  alternateActors: z.string().min(1).nullable().openapi({ example: "" }),
  // alternateActors: z.array(z.string()),
  alive: z.boolean().openapi({ example: true }),
  image: z.string().min(1).openapi({ example: "https://ik.imagekit.io/hpapi/harry.jpg" }),
  createdAt: z.date().openapi({ example: "2026-01-18T14:43:15.388Z" }),
  updatedAt: z.date().nullable().openapi({ example: "2026-01-18T15:09:08.238Z" }),
});

export const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

export const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi("User");

export const CharactersSchema = z.array(CharacterSchema);

export type Character = z.infer<typeof CharacterSchema>;
export type Characters = z.infer<typeof CharactersSchema>;
