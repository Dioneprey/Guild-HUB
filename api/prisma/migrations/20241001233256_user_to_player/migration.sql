/*
  Warnings:

  - You are about to drop the column `user_id` on the `tabletop_entry_requests` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tabletop_schedule_player_availability` table. All the data in the column will be lost.
  - You are about to drop the `tabletop_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_friends_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_language` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `player_id` to the `tabletop_entry_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `tabletop_schedule_player_availability` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VALIDATE_ACCOUNT');

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages_views" DROP CONSTRAINT "chat_messages_views_viewer_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop" DROP CONSTRAINT "tabletop_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_entry_requests" DROP CONSTRAINT "tabletop_entry_requests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_schedule_player_availability" DROP CONSTRAINT "tabletop_schedule_player_availability_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_users" DROP CONSTRAINT "tabletop_users_tabletop_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_users" DROP CONSTRAINT "tabletop_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatar_file_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_city_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_country_id_fkey";

-- DropForeignKey
ALTER TABLE "users_chats" DROP CONSTRAINT "users_chats_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "users_chats" DROP CONSTRAINT "users_chats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_friends" DROP CONSTRAINT "users_friends_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "users_friends" DROP CONSTRAINT "users_friends_requester_id_fkey";

-- DropForeignKey
ALTER TABLE "users_friends_requests" DROP CONSTRAINT "users_friends_requests_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "users_friends_requests" DROP CONSTRAINT "users_friends_requests_requester_id_fkey";

-- DropForeignKey
ALTER TABLE "users_language" DROP CONSTRAINT "users_language_language_id_fkey";

-- DropForeignKey
ALTER TABLE "users_language" DROP CONSTRAINT "users_language_user_id_fkey";

-- DropIndex
DROP INDEX "tabletop_schedule_player_availability_schedule_id_user_id_idx";

-- AlterTable
ALTER TABLE "tabletop_entry_requests" DROP COLUMN "user_id",
ADD COLUMN     "player_id" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "tabletop_schedule_player_availability" DROP COLUMN "user_id",
ADD COLUMN     "player_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "tabletop_users";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "users_chats";

-- DropTable
DROP TABLE "users_friends";

-- DropTable
DROP TABLE "users_friends_requests";

-- DropTable
DROP TABLE "users_language";

-- CreateTable
CREATE TABLE "players" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "nickname" VARCHAR(50),
    "bio" VARCHAR(1000),
    "gender" "GenderOptions",
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "avatar_file_id" TEXT,
    "city_id" VARCHAR(20),
    "country_id" VARCHAR(20),
    "birthdate" TIMESTAMP(3),
    "registration_validated_at" TIMESTAMP(3),
    "registration_completed_at" TIMESTAMP(3),
    "role" "RoleOptions",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "provider" "AccountProvider" NOT NULL,
    "provider_account_id" TEXT,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_friends" (
    "id" SERIAL NOT NULL,
    "requester_id" VARCHAR(50) NOT NULL,
    "receiver_id" VARCHAR(50) NOT NULL,
    "friendship_start_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "players_friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_friends_requests" (
    "id" SERIAL NOT NULL,
    "requester_id" VARCHAR(50) NOT NULL,
    "receiver_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "players_friends_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_language" (
    "id" SERIAL NOT NULL,
    "player_id" VARCHAR(50) NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "players_language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_chats" (
    "id" SERIAL NOT NULL,
    "chat_id" VARCHAR(50) NOT NULL,
    "player_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_players" (
    "id" SERIAL NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "player_id" VARCHAR(50) NOT NULL,
    "game_master" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tabletop_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "players_id_email_idx" ON "players"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_player_id_key" ON "accounts"("provider", "player_id");

-- CreateIndex
CREATE INDEX "players_friends_requester_id_receiver_id_idx" ON "players_friends"("requester_id", "receiver_id");

-- CreateIndex
CREATE INDEX "players_friends_requests_requester_id_receiver_id_idx" ON "players_friends_requests"("requester_id", "receiver_id");

-- CreateIndex
CREATE INDEX "players_chats_player_id_chat_id_idx" ON "players_chats"("player_id", "chat_id");

-- CreateIndex
CREATE INDEX "tabletop_schedule_player_availability_schedule_id_player_id_idx" ON "tabletop_schedule_player_availability"("schedule_id", "player_id");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_friends" ADD CONSTRAINT "players_friends_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_friends" ADD CONSTRAINT "players_friends_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_friends_requests" ADD CONSTRAINT "players_friends_requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_friends_requests" ADD CONSTRAINT "players_friends_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_language" ADD CONSTRAINT "players_language_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_language" ADD CONSTRAINT "players_language_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_chats" ADD CONSTRAINT "players_chats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_chats" ADD CONSTRAINT "players_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages_views" ADD CONSTRAINT "chat_messages_views_viewer_id_fkey" FOREIGN KEY ("viewer_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_players" ADD CONSTRAINT "tabletop_players_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_players" ADD CONSTRAINT "tabletop_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_entry_requests" ADD CONSTRAINT "tabletop_entry_requests_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule_player_availability" ADD CONSTRAINT "tabletop_schedule_player_availability_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
