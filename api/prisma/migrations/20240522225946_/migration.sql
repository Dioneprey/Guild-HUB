/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_avatar_file_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_cover_file_id_fkey";

-- AlterTable
ALTER TABLE "tabletop" ALTER COLUMN "avatar_file_id" SET DATA TYPE TEXT,
ALTER COLUMN "cover_file_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "files_key_key" ON "files"("key");

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_cover_file_id_fkey" FOREIGN KEY ("cover_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;
