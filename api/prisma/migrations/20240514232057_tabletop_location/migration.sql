/*
  Warnings:

  - You are about to drop the `tabletop_map_marks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tabletop_map_marks" DROP CONSTRAINT "tabletop_map_marks_city_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_map_marks" DROP CONSTRAINT "tabletop_map_marks_country_id_fkey";

-- DropForeignKey
ALTER TABLE "tabletop_map_marks" DROP CONSTRAINT "tabletop_map_marks_tabletop_id_fkey";

-- DropTable
DROP TABLE "tabletop_map_marks";

-- CreateTable
CREATE TABLE "tabletop_location" (
    "id" VARCHAR(50) NOT NULL,
    "tabletop_id" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(20),
    "city_id" VARCHAR(20),
    "country_id" VARCHAR(20),
    "street_name" VARCHAR(20),
    "street_number" VARCHAR(10),
    "neighborhood" VARCHAR(200),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "tabletop_location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_location" ADD CONSTRAINT "tabletop_location_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
