import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const element of object) {
    // TODO: wands
  }

  for (const element of object) {
    // TODO: houses
  }

  for (const element of object) {
    // TODO: actors
  }

  for (const character of dataCharacters) {
    const upsertCharacter = await prisma.character.upsert({
      where: {
        slug: character.slug,
      },
      update: {
        ...character,
        alternateNames,
        house: {
          conn,
        },
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
        patronus: character.patronus || "",
        hogwartsStudent: character.hogwartsStudent,
        hogwartsStaff: character.hogwartsStaff,
        actor: character.actor,
        alternateActors: character.alternateActors,
        alive: character.alive,
        image: character.image,
      },
      include: { wands: true },
    });

    // TODO: connect each wands to character

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
