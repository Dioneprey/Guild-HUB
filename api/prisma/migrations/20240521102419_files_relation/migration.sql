/*
  Warnings:

  - You are about to drop the column `cover_id` on the `tabletop` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_file_d` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatar_file_d_fkey";

-- AlterTable
ALTER TABLE "tabletop" DROP COLUMN "cover_id",
ADD COLUMN     "cover_file_id" VARCHAR(1000);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_file_d",
ADD COLUMN     "avatar_file_id" VARCHAR(1000);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_cover_file_id_fkey" FOREIGN KEY ("cover_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
