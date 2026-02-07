import { z } from "@hono/zod-openapi";

export const HogwartsHouseSchema = z.object({
  id: z.string().min(1).openapi({ example: "01ARZ3NDEKTSV4RRFFQ69G5FAV" }),
  slug: z.string().min(1).openapi({ example: "gryffindor" }),
  name: z.string().min(1).openapi({ example: "Gryffindor" }),
  emoji: z.string().min(1).openapi({ example: "🦁" }),
  founder: z.string().min(1).openapi({ example: "Godric Gryffindor" }),
  animal: z.string().min(1).openapi({ example: "Lion" }),
  createdAt: z.date().openapi({ example: "2026-02-07T15:47:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2026-02-07T15:47:00.000Z" }),
});

export const HogwartsHouseCreateSchema = z.object({
  slug: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  emoji: z.string().min(1).max(10),
  founder: z.string().min(1).max(100),
  animal: z.string().min(1).max(50),
});

export const HogwartsHouseUpdateSchema = z.object({
  slug: z.string().min(1).max(50).optional(),
  name: z.string().min(1).max(50).optional(),
  emoji: z.string().min(1).max(10).optional(),
  founder: z.string().min(1).max(100).optional(),
  animal: z.string().min(1).max(50).optional(),
});

export const HogwartsHousesSchema = z.array(HogwartsHouseSchema);
export type HogwartsHouse = z.infer<typeof HogwartsHouseSchema>;
export type HogwartsHouses = z.infer<typeof HogwartsHousesSchema>;
