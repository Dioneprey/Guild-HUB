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
