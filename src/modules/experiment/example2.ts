import { prisma } from "../../lib/prisma";

async function main() {
  try {
    const newCharacter = await prisma.character.create({
      data: {
        name: "Bidu Akasha",
        slug: "bidu-akasha",
        email: "",
      },
    });
    console.log("Created character:", newCharacter);

    const allCharacters = await prisma.character.findMany();
    console.log("All characters:", JSON.stringify(allCharacters, null, 2));
  } catch (error) {
    console.error("Failed to create and find characters:");
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
