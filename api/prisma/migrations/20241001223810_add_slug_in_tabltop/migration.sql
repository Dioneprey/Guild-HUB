/*
  Warnings:

  - The primary key for the `users_friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users_friends` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `full_name` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "full_name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "countryId" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "tabletop" ADD COLUMN     "slug" VARCHAR(100);

-- AlterTable
ALTER TABLE "tabletop_location" ADD COLUMN     "state_id" VARCHAR(20);

-- AlterTable
ALTER TABLE "users_friends" DROP CONSTRAINT "users_friends_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_friends_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
