import { z } from "zod";

export const HouseSchema = z.enum(["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]).nullable();

export const GenderSchema = z.string();

export const SpeciesSchema = z.string();

export const AncestrySchema = z.enum(["pure-blood", "half-blood", "muggleborn", "squib"]).nullable();

export const WandSchema = z.object({
  wood: z.string().nullable(),
  core: z.string().nullable(),
  length: z.number().nullable(),
});

export const CharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  alternate_names: z.array(z.string()),
  species: SpeciesSchema,
  gender: GenderSchema,
  house: HouseSchema,
  dateOfBirth: z.string().nullable(),
  yearOfBirth: z.number().nullable(),
  wizard: z.boolean(),
  ancestry: AncestrySchema,
  eyeColour: z.string().nullable(),
  hairColour: z.string().nullable(),
  wand: WandSchema,
  patronus: z.string().nullable(),
  hogwartsStudent: z.boolean(),
  hogwartsStaff: z.boolean(),
  actor: z.string(),
  alternate_actors: z.array(z.string()),
  alive: z.boolean(),
  image: z.string().url(),
});

export type Character = z.infer<typeof CharacterSchema>;
