-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "hogwartsHouseId" TEXT;

-- CreateTable
CREATE TABLE "HogwartsHouse" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "emoji" VARCHAR(10) NOT NULL,
    "founder" VARCHAR(100) NOT NULL,
    "animal" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HogwartsHouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HogwartsHouse_slug_key" ON "HogwartsHouse"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "HogwartsHouse_name_key" ON "HogwartsHouse"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_hogwartsHouseId_fkey" FOREIGN KEY ("hogwartsHouseId") REFERENCES "HogwartsHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
