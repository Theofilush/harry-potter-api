/*
  Warnings:

  - Changed the type of `birthYear` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "birthYear",
ADD COLUMN     "birthYear" INTEGER NOT NULL;
