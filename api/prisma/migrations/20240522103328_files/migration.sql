-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('I', 'V', 'O');

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "FileType";
