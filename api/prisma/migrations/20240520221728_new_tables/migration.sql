/*
  Warnings:

  - The values [P,O,H] on the enum `TabletopType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `avatar_url` on the `tabletop` table. All the data in the column will be lost.
  - You are about to drop the column `system_name` on the `tabletop` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TabletopExpertise" AS ENUM ('B', 'I', 'A');

-- CreateEnum
CREATE TYPE "TabletopCadence" AS ENUM ('O', 'S', 'Q', 'M');

-- AlterEnum
BEGIN;
CREATE TYPE "TabletopType_new" AS ENUM ('R', 'W', 'B');
ALTER TABLE "tabletop" ALTER COLUMN "type" TYPE "TabletopType_new" USING ("type"::text::"TabletopType_new");
ALTER TYPE "TabletopType" RENAME TO "TabletopType_old";
ALTER TYPE "TabletopType_new" RENAME TO "TabletopType";
DROP TYPE "TabletopType_old";
COMMIT;

-- DropIndex
DROP INDEX "tabletop_owner_id_players_limit_system_name_type_min_age_idx";

-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "image_file_id" TEXT;

-- AlterTable
ALTER TABLE "tabletop" DROP COLUMN "avatar_url",
DROP COLUMN "system_name",
ADD COLUMN     "avatar_file_id" VARCHAR(1000),
ADD COLUMN     "cadence" "TabletopCadence",
ADD COLUMN     "cover_id" VARCHAR(1000),
ADD COLUMN     "expertise_level" "TabletopExpertise",
ADD COLUMN     "has_dungeon_master" BOOLEAN,
ADD COLUMN     "online" BOOLEAN,
ADD COLUMN     "tabletop_system_id" VARCHAR(50);

-- AlterTable
ALTER TABLE "tabletop_users" ADD COLUMN     "game_master" BOOLEAN;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
ADD COLUMN     "avatar_file_d" VARCHAR(1000);

-- CreateTable
CREATE TABLE "tabletop_system" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tabletop_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "key" VARCHAR(100),
    "path" VARCHAR(100),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tabletop_owner_id_players_limit_tabletop_system_id_type_min_idx" ON "tabletop"("owner_id", "players_limit", "tabletop_system_id", "type", "min_age");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_file_d_fkey" FOREIGN KEY ("avatar_file_d") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_image_file_id_fkey" FOREIGN KEY ("image_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_tabletop_system_id_fkey" FOREIGN KEY ("tabletop_system_id") REFERENCES "tabletop_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
