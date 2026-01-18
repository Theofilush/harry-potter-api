import { z } from "zod";

export const WandSchema = z.object({
  wood: z.string().min(1).nullable(),
  core: z.string().min(1).nullable(),
  length: z.number().nonnegative,
});

export const CharacterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  alternateNames: z.string().min(1).nullable(),
  // alternateNames: z.array(z.string()),
  species: z.string().min(1),
  gender: z.string().min(1),
  house: z.string().min(1).nullable(),
  birthDate: z.date().nullable(),
  birthYear: z.number().nullable(),
  wizard: z.boolean(),
  ancestry: z.string().min(1).nullable(),
  eyeColour: z.string().min(1).nullable(),
  hairColour: z.string().min(1).nullable(),
  wands: z.array(WandSchema).optional().nullable(),
  patronus: z.string().min(1).nullable(),
  hogwartsStudent: z.boolean(),
  hogwartsStaff: z.boolean(),
  actor: z.string().min(1),
  alternateActors: z.string().min(1).nullable(),
  // alternateActors: z.array(z.string()),
  alive: z.boolean(),
  image: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const CharactersSchema = z.array(CharacterSchema);

export type Character = z.infer<typeof CharacterSchema>;
export type Characters = z.infer<typeof CharactersSchema>;
