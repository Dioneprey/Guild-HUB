/*
  Warnings:

  - The values [I,V,O] on the enum `FileType` will be removed. If these variants are still used in the database, this will fail.
  - The values [O,S,Q,M] on the enum `TabletopCadence` will be removed. If these variants are still used in the database, this will fail.
  - The values [A,B,C] on the enum `TabletopCommunicationType` will be removed. If these variants are still used in the database, this will fail.
  - The values [B,I,A] on the enum `TabletopExpertise` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileType_new" AS ENUM ('IMAGE', 'VIDEO', 'OTHER');
ALTER TABLE "files" ALTER COLUMN "type" TYPE "FileType_new" USING ("type"::text::"FileType_new");
ALTER TYPE "FileType" RENAME TO "FileType_old";
ALTER TYPE "FileType_new" RENAME TO "FileType";
DROP TYPE "FileType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TabletopCadence_new" AS ENUM ('ONE_SHOT', 'WEEKLY', 'FORTWEEKLY', 'MONTHLY');
ALTER TABLE "tabletop" ALTER COLUMN "cadence" TYPE "TabletopCadence_new" USING ("cadence"::text::"TabletopCadence_new");
ALTER TYPE "TabletopCadence" RENAME TO "TabletopCadence_old";
ALTER TYPE "TabletopCadence_new" RENAME TO "TabletopCadence";
DROP TYPE "TabletopCadence_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TabletopCommunicationType_new" AS ENUM ('VIDEO_VOIP', 'VOIP', 'TEXT');
ALTER TABLE "tabletop" ALTER COLUMN "communication" TYPE "TabletopCommunicationType_new" USING ("communication"::text::"TabletopCommunicationType_new");
ALTER TYPE "TabletopCommunicationType" RENAME TO "TabletopCommunicationType_old";
ALTER TYPE "TabletopCommunicationType_new" RENAME TO "TabletopCommunicationType";
DROP TYPE "TabletopCommunicationType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TabletopExpertise_new" AS ENUM ('BEGINNER', 'INTERMEDIARY', 'ADVANCED');
ALTER TABLE "tabletop" ALTER COLUMN "expertise_level" TYPE "TabletopExpertise_new" USING ("expertise_level"::text::"TabletopExpertise_new");
ALTER TYPE "TabletopExpertise" RENAME TO "TabletopExpertise_old";
ALTER TYPE "TabletopExpertise_new" RENAME TO "TabletopExpertise";
DROP TYPE "TabletopExpertise_old";
COMMIT;
