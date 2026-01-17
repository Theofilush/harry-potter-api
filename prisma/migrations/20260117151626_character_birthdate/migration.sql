/*
  Warnings:

  - You are about to drop the column `birtDate` on the `Character` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "birtDate",
ADD COLUMN     "birthDate" VARCHAR(300) NOT NULL;
