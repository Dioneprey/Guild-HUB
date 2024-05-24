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
    "user_id" TEXT NOT NULL,
    "availability" BOOLEAN,
    "observation" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tabletop_schedule_player_availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tabletop_schedule_tabletop_id_day_of_week_idx" ON "tabletop_schedule"("tabletop_id", "day_of_week");

-- CreateIndex
CREATE INDEX "tabletop_schedule_player_availability_schedule_id_user_id_idx" ON "tabletop_schedule_player_availability"("schedule_id", "user_id");

-- AddForeignKey
ALTER TABLE "tabletop_schedule" ADD CONSTRAINT "tabletop_schedule_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule_player_availability" ADD CONSTRAINT "tabletop_schedule_player_availability_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "tabletop_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_schedule_player_availability" ADD CONSTRAINT "tabletop_schedule_player_availability_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
