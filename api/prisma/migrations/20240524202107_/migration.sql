/*
  Warnings:

  - Added the required column `full_name` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "full_name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "countryId" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "tabletop_location" ADD COLUMN     "state_id" VARCHAR(20);

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
