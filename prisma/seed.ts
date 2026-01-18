import { prisma } from "../src/lib/prisma";
import { dataCharacters } from "../src/modules/characters/data";

async function main() {
  for (const character of dataCharacters) {
    const upsertCharacter = await prisma.character.upsert({
      where: {
        slug: character.slug,
      },
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
        wands: character.wands
          ? {
              create: character.wands.map((wand) => ({
                wood: wand.wood ?? "",
                core: wand.core ?? "",
                length: Number(wand.length) || 0,
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
      include: { wands: true },
    });

    if (character.wands) {
      await prisma.wand.deleteMany({
        where: { characterId: upsertCharacter.id },
      });

      await prisma.wand.createMany({
        data: character.wands.map((wand) => ({
          wood: wand.wood ?? "",
          core: wand.core ?? "",
          length: Number(wand.length) || 0,
          characterId: upsertCharacter.id,
        })),
      });
    }

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
