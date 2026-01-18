-- CreateTable
CREATE TABLE "Wand" (
    "id" TEXT NOT NULL,
    "wood" VARCHAR(300) NOT NULL,
    "core" VARCHAR(300) NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Wand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wand" ADD CONSTRAINT "Wand_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
