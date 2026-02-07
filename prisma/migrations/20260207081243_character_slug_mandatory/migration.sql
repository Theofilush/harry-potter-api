/*
  Warnings:

  - Made the column `slug` on table `Wand` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Wand" ALTER COLUMN "slug" SET NOT NULL;
