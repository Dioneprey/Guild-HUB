/*
  Warnings:

  - The `image_file_id` column on the `chat_messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `files` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `avatar_file_id` column on the `tabletop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tabletop_system_id` column on the `tabletop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cover_file_id` column on the `tabletop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tabletop_system` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tabletop_system` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `avatar_file_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_image_file_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_avatar_file_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_cover_file_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_tabletop_system_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatar_file_id_fkey";

-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "image_file_id",
ADD COLUMN     "image_file_id" INTEGER;

-- AlterTable
ALTER TABLE "files" DROP CONSTRAINT "files_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "files_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tabletop" DROP COLUMN "avatar_file_id",
ADD COLUMN     "avatar_file_id" INTEGER,
DROP COLUMN "tabletop_system_id",
ADD COLUMN     "tabletop_system_id" INTEGER,
DROP COLUMN "cover_file_id",
ADD COLUMN     "cover_file_id" INTEGER;

-- AlterTable
ALTER TABLE "tabletop_system" DROP CONSTRAINT "tabletop_system_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tabletop_system_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_file_id",
ADD COLUMN     "avatar_file_id" INTEGER;

-- CreateIndex
CREATE INDEX "tabletop_owner_id_players_limit_tabletop_system_id_type_min_idx" ON "tabletop"("owner_id", "players_limit", "tabletop_system_id", "type", "min_age");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_image_file_id_fkey" FOREIGN KEY ("image_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_tabletop_system_id_fkey" FOREIGN KEY ("tabletop_system_id") REFERENCES "tabletop_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_cover_file_id_fkey" FOREIGN KEY ("cover_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
