/*
  Warnings:

  - You are about to drop the column `hogwartsHouseId` on the `Character` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_hogwartsHouseId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "hogwartsHouseId",
ADD COLUMN     "hogwartsHouseSlug" TEXT;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_hogwartsHouseSlug_fkey" FOREIGN KEY ("hogwartsHouseSlug") REFERENCES "HogwartsHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
