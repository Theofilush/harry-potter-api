import { cuid } from "zod";
import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const character of dataCharacters) {
    await prisma.character.upsert({
      where: { slug: character.slug },
      update: {
        ...character,
        wands: character.wands
          ? {
              upsert: character.wands.map((wand) => ({
                where: { slug: wand.slug },
                update: {
                  name: wand.name ?? "Unknown Wand",
                  slug: wand.slug ?? `wand-${cuid()}`,
                  wood: wand.wood ?? "",
                  core: wand.core ?? "",
                  length: wand.length ?? 0,
                },
                create: {
                  name: wand.name ?? "Unknown Wand",
                  slug: wand.slug ?? `wand-${cuid()}`,
                  wood: wand.wood ?? "",
                  core: wand.core ?? "",
                  length: wand.length ?? 0,
                },
              })),
            }
          : undefined,
      },
      create: {
        ...character,
        wands: character.wands
          ? {
              create: character.wands.map((wand) => ({
                name: wand.name ?? "Unknown Wand",
                slug: wand.slug ?? `wand-${cuid()}`,
                wood: wand.wood ?? "",
                core: wand.core ?? "",
                length: wand.length ?? 0,
              })),
            }
          : undefined,
      },
      include: { wands: true },
    });

    console.log(`🧙 ${character.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
