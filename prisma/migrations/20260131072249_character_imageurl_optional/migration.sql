/*
  Warnings:

  - You are about to drop the column `image` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "image",
ADD COLUMN     "imageUrl" VARCHAR(300);
