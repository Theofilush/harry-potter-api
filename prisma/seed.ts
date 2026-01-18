import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const character of dataCharacters) {
    await prisma.character.upsert({
      update: {
        name: character.name,
        slug: character.slug,
        alternateNames: character.alternateNames || "",
        species: character.species,
        gender: character.gender,
        house: character.house || "",
        birthDate: character.birthDate,
        birthYear: character.birthYear || 0,
        wizard: character.wizard,
        ancestry: character.ancestry || "",
        eyeColour: character.eyeColour || "",
        hairColour: character.hairColour || "",
        // wand: character.wand || "",
        patronus: character.patronus || "",
        hogwartsStudent: character.hogwartsStudent,
        hogwartsStaff: character.hogwartsStaff,
        actor: character.actor,
        alternateActors: character.alternateActors,
        alive: character.alive,
        image: character.image,
      },
      create: {
        name: character.name,
        slug: character.slug,
        alternateNames: character.alternateNames || "",
        species: character.species,
        gender: character.gender,
        house: character.house || "",
        birthDate: character.birthDate,
        birthYear: character.birthYear || 0,
        wizard: character.wizard,
        ancestry: character.ancestry || "",
        eyeColour: character.eyeColour || "",
        hairColour: character.hairColour || "",
        // wand: character.wand || "",
        wands: character.wands
          ? {
              create: character.wands.map((w) => ({
                wood: w.wood,
                core: w.core,
                length: w.length,
              })),
            }
          : undefined,
        patronus: character.patronus || "",
        hogwartsStudent: character.hogwartsStudent,
        hogwartsStaff: character.hogwartsStaff,
        actor: character.actor,
        alternateActors: character.alternateActors,
        alive: character.alive,
        image: character.image,
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
