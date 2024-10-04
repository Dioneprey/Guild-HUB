-- CreateEnum
CREATE TYPE "GenderOptions" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "RoleOptions" AS ENUM ('A', 'U');

-- CreateEnum
CREATE TYPE "TabletopType" AS ENUM ('R', 'W', 'B');

-- CreateEnum
CREATE TYPE "TabletopCommunicationType" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "TabletopExpertise" AS ENUM ('B', 'I', 'A');

-- CreateEnum
CREATE TYPE "TabletopCadence" AS ENUM ('O', 'S', 'Q', 'M');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('I', 'V', 'O');

-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VALIDATE_ACCOUNT');

-- CreateTable
CREATE TABLE "players" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "nickname" VARCHAR(50),
    "bio" VARCHAR(1000),
    "gender" "GenderOptions",
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100),
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
CREATE TABLE "chats" (
    "id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "chat_messages" (
    "id" SERIAL NOT NULL,
    "chatId" VARCHAR(50) NOT NULL,
    "sender_id" VARCHAR(50) NOT NULL,
    "content" TEXT,
    "image_file_id" INTEGER,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages_views" (
    "id" SERIAL NOT NULL,
    "message_id" INTEGER NOT NULL,
    "viewer_id" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop" (
    "id" VARCHAR(50) NOT NULL,
    "owner_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "slug" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "players_limit" SMALLINT,
    "tabletop_system_id" INTEGER,
    "expertise_level" "TabletopExpertise",
    "cadence" "TabletopCadence",
    "avatar_file_id" TEXT,
    "cover_file_id" TEXT,
    "min_age" SMALLINT,
    "has_dungeon_master" BOOLEAN,
    "type" "TabletopType",
    "communication" "TabletopCommunicationType",
    "online_plataform_id" INTEGER,
    "timezone_id" INTEGER,
    "online" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tabletop_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "tabletop_entry_requests" (
    "id" SERIAL NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "player_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tabletop_entry_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_schedule" (
    "id" VARCHAR(50) NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "day_of_week" INTEGER,
    "start_time_minutes" INTEGER,
    "end_time_minutes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tabletop_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_schedule_player_availability" (
    "id" SERIAL NOT NULL,
    "schedule_id" VARCHAR(50) NOT NULL,
    "player_id" TEXT NOT NULL,
    "availability" BOOLEAN,
    "observation" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tabletop_schedule_player_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_location" (
    "id" VARCHAR(50) NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(20),
    "city_id" VARCHAR(20),
    "state_id" VARCHAR(20),
    "country_id" VARCHAR(20),
    "street_name" VARCHAR(20),
    "street_number" VARCHAR(10),
    "neighborhood" VARCHAR(200),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "tabletop_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_system" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tabletop_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_language" (
    "id" SERIAL NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "tabletop_language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "key" VARCHAR(100) NOT NULL,
    "path" VARCHAR(100),
    "type" "FileType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" VARCHAR(20) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "countryId" VARCHAR(20) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" VARCHAR(20) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "countryId" VARCHAR(20) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "online_game_plataform" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "online_game_plataform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezone" (
    "id" SERIAL NOT NULL,
    "timezone" VARCHAR(50),
    "utc" VARCHAR(20),
    "name" VARCHAR(100),

    CONSTRAINT "timezone_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "chat_messages_sender_id_content_chatId_idx" ON "chat_messages"("sender_id", "content", "chatId");

-- CreateIndex
CREATE UNIQUE INDEX "tabletop_slug_key" ON "tabletop"("slug");

-- CreateIndex
CREATE INDEX "tabletop_owner_id_players_limit_tabletop_system_id_type_min_idx" ON "tabletop"("owner_id", "players_limit", "tabletop_system_id", "type", "min_age");

-- CreateIndex
CREATE INDEX "tabletop_schedule_tabletop_id_day_of_week_idx" ON "tabletop_schedule"("tabletop_id", "day_of_week");

-- CreateIndex
CREATE INDEX "tabletop_schedule_player_availability_schedule_id_player_id_idx" ON "tabletop_schedule_player_availability"("schedule_id", "player_id");

-- CreateIndex
CREATE UNIQUE INDEX "files_key_key" ON "files"("key");

-- CreateIndex
CREATE INDEX "cities_id_uf_idx" ON "cities"("id", "uf");

-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");

-- CreateIndex
CREATE INDEX "states_uf_idx" ON "states"("uf");

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
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_image_file_id_fkey" FOREIGN KEY ("image_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages_views" ADD CONSTRAINT "chat_messages_views_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages_views" ADD CONSTRAINT "chat_messages_views_viewer_id_fkey" FOREIGN KEY ("viewer_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_tabletop_system_id_fkey" FOREIGN KEY ("tabletop_system_id") REFERENCES "tabletop_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_avatar_file_id_fkey" FOREIGN KEY ("avatar_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_cover_file_id_fkey" FOREIGN KEY ("cover_file_id") REFERENCES "files"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_online_plataform_id_fkey" FOREIGN KEY ("online_plataform_id") REFERENCES "online_game_plataform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "timezone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_players" ADD CONSTRAINT "tabletop_players_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_players" ADD CONSTRAINT "tabletop_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_entry_requests" ADD CONSTRAINT "tabletop_entry_requests_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_entry_requests" ADD CONSTRAINT "tabletop_entry_requests_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule" ADD CONSTRAINT "tabletop_schedule_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule_player_availability" ADD CONSTRAINT "tabletop_schedule_player_availability_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "tabletop_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule_player_availability" ADD CONSTRAINT "tabletop_schedule_player_availability_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_language" ADD CONSTRAINT "tabletop_language_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_language" ADD CONSTRAINT "tabletop_language_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_uf_fkey" FOREIGN KEY ("uf") REFERENCES "states"("uf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
