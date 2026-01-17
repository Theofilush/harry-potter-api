/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Character` table. All the data in the column will be lost.
  - Added the required column `birtDate` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "birthDate",
ADD COLUMN     "birtDate" VARCHAR(300) NOT NULL;
