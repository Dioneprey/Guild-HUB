-- CreateTable
CREATE TABLE "users_language" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "users_language_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "users_language" ADD CONSTRAINT "users_language_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_language" ADD CONSTRAINT "users_language_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_language" ADD CONSTRAINT "tabletop_language_tabletop_id_fkey" FOREIGN KEY ("tabletop_id") REFERENCES "tabletop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabletop_language" ADD CONSTRAINT "tabletop_language_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
