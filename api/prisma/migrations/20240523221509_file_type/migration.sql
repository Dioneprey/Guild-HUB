-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatar_file_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar_file_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;
