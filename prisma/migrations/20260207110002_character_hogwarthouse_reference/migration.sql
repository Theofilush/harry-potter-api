-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_hogwartsHouseSlug_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_hogwartsHouseSlug_fkey" FOREIGN KEY ("hogwartsHouseSlug") REFERENCES "HogwartsHouse"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
