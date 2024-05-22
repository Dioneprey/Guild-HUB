-- CreateEnum
CREATE TYPE "TabletopCommunicationType" AS ENUM ('A', 'B', 'C');

-- AlterTable
ALTER TABLE "tabletop" ADD COLUMN     "communication" "TabletopCommunicationType",
ADD COLUMN     "online_plataform_id" INTEGER,
ADD COLUMN     "timezone_id" INTEGER;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_online_plataform_id_fkey" FOREIGN KEY ("online_plataform_id") REFERENCES "online_game_plataform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop" ADD CONSTRAINT "tabletop_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "timezone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
