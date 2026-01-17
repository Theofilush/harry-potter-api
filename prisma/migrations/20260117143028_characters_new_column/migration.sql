/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Character` table. All the data in the column will be lost.
  - Added the required column `actor` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alive` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alternateNames` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ancestry` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyeColour` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairColour` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hogwartsStaff` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hogwartsStudent` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronus` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wand` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wizard` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfBirth` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
DROP COLUMN "email",
ADD COLUMN     "actor" VARCHAR(300) NOT NULL,
ADD COLUMN     "alive" BOOLEAN NOT NULL,
ADD COLUMN     "alternateNames" VARCHAR(300) NOT NULL,
ADD COLUMN     "ancestry" VARCHAR(300) NOT NULL,
ADD COLUMN     "dateOfBirth" VARCHAR(300) NOT NULL,
ADD COLUMN     "eyeColour" VARCHAR(300) NOT NULL,
ADD COLUMN     "gender" VARCHAR(300) NOT NULL,
ADD COLUMN     "hairColour" VARCHAR(300) NOT NULL,
ADD COLUMN     "hogwartsStaff" BOOLEAN NOT NULL,
ADD COLUMN     "hogwartsStudent" BOOLEAN NOT NULL,
ADD COLUMN     "house" VARCHAR(300) NOT NULL,
ADD COLUMN     "image" VARCHAR(300) NOT NULL,
ADD COLUMN     "patronus" VARCHAR(300) NOT NULL,
ADD COLUMN     "species" VARCHAR(300) NOT NULL,
ADD COLUMN     "wand" VARCHAR(300) NOT NULL,
ADD COLUMN     "wizard" BOOLEAN NOT NULL,
ADD COLUMN     "yearOfBirth" VARCHAR(300) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Character_id_seq";
