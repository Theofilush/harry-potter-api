/*
  Warnings:

  - You are about to drop the column `alive` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `hogwartsStaff` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `hogwartsStudent` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `wizard` on the `Character` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `slug` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(150)`.
  - You are about to alter the column `actor` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(150)`.
  - You are about to alter the column `alternateNames` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(150)`.
  - You are about to alter the column `ancestry` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.
  - You are about to alter the column `eyeColour` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(30)`.
  - You are about to alter the column `gender` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(20)`.
  - You are about to alter the column `hairColour` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(30)`.
  - You are about to alter the column `house` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(50)`.
  - You are about to alter the column `patronus` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.
  - You are about to alter the column `species` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(50)`.
  - You are about to alter the column `alternateActors` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(150)`.
  - You are about to alter the column `imageUrl` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(255)`.
  - You are about to alter the column `wood` on the `Wand` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(50)`.
  - You are about to alter the column `core` on the `Wand` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(50)`.
  - A unique constraint covering the columns `[slug]` on the table `Wand` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Wand" DROP CONSTRAINT "Wand_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "alive",
DROP COLUMN "hogwartsStaff",
DROP COLUMN "hogwartsStudent",
DROP COLUMN "wizard",
ADD COLUMN     "isAlive" BOOLEAN,
ADD COLUMN     "isHogwartsStaff" BOOLEAN,
ADD COLUMN     "isHogwartsStudent" BOOLEAN,
ADD COLUMN     "isWizard" BOOLEAN,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "actor" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "alternateNames" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "ancestry" DROP NOT NULL,
ALTER COLUMN "ancestry" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "eyeColour" DROP NOT NULL,
ALTER COLUMN "eyeColour" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "gender" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "hairColour" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "house" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "patronus" DROP NOT NULL,
ALTER COLUMN "patronus" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "species" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "birthYear" DROP NOT NULL,
ALTER COLUMN "alternateActors" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "imageUrl" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Wand" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" VARCHAR(150) DEFAULT 'Unknown Wand',
ADD COLUMN     "slug" VARCHAR(150),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "wood" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "core" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "Wand_slug_key" ON "Wand"("slug");

-- AddForeignKey
ALTER TABLE "Wand" ADD CONSTRAINT "Wand_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
