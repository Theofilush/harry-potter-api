import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";
import { hogwartsHouses } from "../src/modules/houses/data";

async function main() {
  for (const house of hogwartsHouses) {
    await prisma.hogwartsHouse.upsert({
      where: { slug: house.slug },
      update: house,
      create: house,
    });
    console.log(`🏫 ${house.name}`);
  }

  for (const character of dataCharacters) {
    const { wands, ...characterData } = character;
    await prisma.character.upsert({
      where: { slug: character.slug },
      update: {
        ...characterData,
        hogwartsHouseSlug: characterData.hogwartsHouseSlug,
      },
      create: {
        ...characterData,
        hogwartsHouseSlug: characterData.hogwartsHouseSlug,
      },
      include: { wands: true },
    });

    console.log(`🧙 ${character.name}`);

    for (const wand of character.wands ?? []) {
      await prisma.wand.upsert({
        where: { slug: wand.slug ?? undefined },
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
