/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfBirth` on the `Character` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthYear` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "dateOfBirth",
DROP COLUMN "yearOfBirth",
ADD COLUMN     "birthDate" VARCHAR(300) NOT NULL,
ADD COLUMN     "birthYear" VARCHAR(300) NOT NULL;
