-- CreateEnum
CREATE TYPE "GenderOptions" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "RoleOptions" AS ENUM ('A', 'U');

-- CreateEnum
CREATE TYPE "TabletopType" AS ENUM ('P', 'O', 'H');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "nickname" VARCHAR(50),
    "bio" VARCHAR(1000),
    "gender" "GenderOptions",
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "avatar_url" VARCHAR(1000),
    "city_id" VARCHAR(20),
    "country_id" VARCHAR(20),
    "birthdate" TIMESTAMP(3),
    "registration_validated_at" TIMESTAMP(3),
    "registration_completed_at" TIMESTAMP(3),
    "role" "RoleOptions",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_friends" (
    "id" VARCHAR(50) NOT NULL,
    "requester_id" VARCHAR(50) NOT NULL,
    "receiver_id" VARCHAR(50) NOT NULL,
    "friendship_start_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_friends_requests" (
    "id" VARCHAR(50) NOT NULL,
    "requester_id" VARCHAR(50) NOT NULL,
    "receiver_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_friends_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_chats" (
    "chat_id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_chats_pkey" PRIMARY KEY ("chat_id","user_id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" SERIAL NOT NULL,
    "chatId" VARCHAR(50) NOT NULL,
    "sender_id" VARCHAR(50) NOT NULL,
    "content" TEXT,
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
    "description" VARCHAR(500),
    "players_limit" SMALLINT,
    "system_name" VARCHAR(100),
    "avatar_url" VARCHAR(1000),
    "min_age" SMALLINT,
    "type" "TabletopType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tabletop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabletop_users" (
    "tabletop_id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tabletop_users_pkey" PRIMARY KEY ("tabletop_id","user_id")
);

-- CreateTable
CREATE TABLE "tabletop_entry_requests" (
    "tabletop_id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tabletop_entry_requests_pkey" PRIMARY KEY ("tabletop_id","user_id")
);

-- CreateTable
CREATE TABLE "tabletop_map_marks" (
    "id" VARCHAR(50) NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "city_id" VARCHAR(20),
    "country_id" VARCHAR(20),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "tabletop_map_marks_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- CreateIndex
CREATE INDEX "users_friends_requester_id_receiver_id_idx" ON "users_friends"("requester_id", "receiver_id");

-- CreateIndex
CREATE INDEX "users_friends_requests_requester_id_receiver_id_idx" ON "users_friends_requests"("requester_id", "receiver_id");

-- CreateIndex
CREATE INDEX "users_chats_user_id_idx" ON "users_chats"("user_id");

-- CreateIndex
CREATE INDEX "chat_messages_sender_id_content_chatId_idx" ON "chat_messages"("sender_id", "content", "chatId");

-- CreateIndex
CREATE INDEX "tabletop_owner_id_players_limit_system_name_type_min_age_idx" ON "tabletop"("owner_id", "players_limit", "system_name", "type", "min_age");

-- CreateIndex
CREATE INDEX "cities_id_uf_idx" ON "cities"("id", "uf");

-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");

-- CreateIndex
CREATE INDEX "states_uf_idx" ON "states"("uf");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends" ADD CONSTRAINT "users_friends_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends" ADD CONSTRAINT "users_friends_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends_requests" ADD CONSTRAINT "users_friends_requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends_requests" ADD CONSTRAINT "users_friends_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_chats" ADD CONSTRAINT "users_chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_chats" ADD CONSTRAINT "users_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages_views" ADD CONSTRAINT "chat_messages_views_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages_views" ADD CONSTRAINT "chat_messages_views_viewer_id_fkey" FOREIGN KEY ("viewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_users" ADD CONSTRAINT "tabletop_users_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_users" ADD CONSTRAINT "tabletop_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_entry_requests" ADD CONSTRAINT "tabletop_entry_requests_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_entry_requests" ADD CONSTRAINT "tabletop_entry_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_map_marks" ADD CONSTRAINT "tabletop_map_marks_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_map_marks" ADD CONSTRAINT "tabletop_map_marks_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_map_marks" ADD CONSTRAINT "tabletop_map_marks_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_uf_fkey" FOREIGN KEY ("uf") REFERENCES "states"("uf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
