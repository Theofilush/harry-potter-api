import { prisma } from "../../lib/prisma";

async function main() {
  //   const newCharacter = await prisma.character.create({
  //     data: {
  //       name: "Bidu Akasha",
  //       slug: "bidu-akasha",
  //       email: "",
  //     },
  //   });
  //   console.log("Created user:", newCharacter);

  const allCharacters = await prisma.character.findMany();
  console.log("All users:", JSON.stringify(allCharacters, null, 2));
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
