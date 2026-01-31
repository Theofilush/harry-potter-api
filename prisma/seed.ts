import { cuid } from "zod";
import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const character of dataCharacters) {
    const { wands, ...characterData } = character;
    await prisma.character.upsert({
      where: { slug: character.slug },
      update: {
        ...characterData,
      },
      create: {
        ...characterData,
      },
      include: { wands: true },
    });

    console.log(`🧙 ${character.name}`);
  }

  for (const character of dataCharacters) {
    for (const wand of character.wands) {
      await prisma.wand.upsert({
        where: { slug: wand.slug },
        update: {
          name: wand.name,
          slug: wand.slug,
          wood: wand.wood,
          core: wand.core,
          length: wand.length,
          character: { connect: { slug: character.slug } },
        },
        create: {
          slug: wand.slug,
          name: wand.name,
          wood: wand.wood,
          core: wand.core,
          length: wand.length,
          character: { connect: { slug: character.slug } },
        },
      });
      console.log(` 🪄  ${wand.slug}-wand`);
    }
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
