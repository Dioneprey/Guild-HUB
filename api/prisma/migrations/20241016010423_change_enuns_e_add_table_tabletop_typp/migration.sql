/*
  Warnings:

  - The values [M,F,O] on the enum `GenderOptions` will be removed. If these variants are still used in the database, this will fail.
  - The values [A,U] on the enum `RoleOptions` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `tabletop` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GenderOptions_new" AS ENUM ('MALE', 'FEMALE', 'OTHER');
ALTER TABLE "players" ALTER COLUMN "gender" TYPE "GenderOptions_new" USING ("gender"::text::"GenderOptions_new");
ALTER TYPE "GenderOptions" RENAME TO "GenderOptions_old";
ALTER TYPE "GenderOptions_new" RENAME TO "GenderOptions";
DROP TYPE "GenderOptions_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RoleOptions_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "players" ALTER COLUMN "role" TYPE "RoleOptions_new" USING ("role"::text::"RoleOptions_new");
ALTER TYPE "RoleOptions" RENAME TO "RoleOptions_old";
ALTER TYPE "RoleOptions_new" RENAME TO "RoleOptions";
DROP TYPE "RoleOptions_old";
COMMIT;

-- DropIndex
DROP INDEX "tabletop_owner_id_players_limit_tabletop_system_id_type_min_idx";

-- AlterTable
ALTER TABLE "tabletop" DROP COLUMN "type",
ADD COLUMN     "tabletop_type_id" INTEGER;

-- AlterTable
ALTER TABLE "tabletop_location" ADD COLUMN     "title" TEXT,
ALTER COLUMN "street_name" SET DATA TYPE TEXT,
ALTER COLUMN "street_number" SET DATA TYPE TEXT,
ALTER COLUMN "neighborhood" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "TabletopType";

-- CreateTable
CREATE TABLE "tabletop_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tabletop_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tabletop_owner_id_players_limit_tabletop_system_id_tabletop_idx" ON "tabletop"("owner_id", "players_limit", "tabletop_system_id", "tabletop_type_id", "min_age");

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_tabletop_type_id_fkey" FOREIGN KEY ("tabletop_type_id") REFERENCES "tabletop_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
