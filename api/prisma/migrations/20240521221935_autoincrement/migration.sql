/*
  Warnings:

  - The primary key for the `tabletop_entry_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tabletop_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users_chats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users_friends_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users_friends_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "users_chats_user_id_idx";

-- AlterTable
ALTER TABLE "tabletop_entry_requests" DROP CONSTRAINT "tabletop_entry_requests_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tabletop_entry_requests_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tabletop_users" DROP CONSTRAINT "tabletop_users_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tabletop_users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users_chats" DROP CONSTRAINT "users_chats_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_chats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users_friends_requests" DROP CONSTRAINT "users_friends_requests_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_friends_requests_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "users_chats_user_id_chat_id_idx" ON "users_chats"("user_id", "chat_id");
