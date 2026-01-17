import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const character of dataCharacters) {
    await prisma.character.upsert({
      update: {
        name: character.name,
        slug: character.slug,
        // species: character.species,
      },
      create: {
        name: character.name,
        slug: character.slug,
        // species: character.species,
      },
      where: {
        slug: character.slug,
      },
    });
    console.log(`Created character: ${character.name}`);
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
