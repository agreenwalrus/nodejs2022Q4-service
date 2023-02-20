-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "login" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "artist_id" UUID,
    "album_id" UUID,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artist_id" UUID,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_artist" (
    "artist_id" UUID NOT NULL,
    "favoriteId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "favorite_album" (
    "album_id" UUID NOT NULL,
    "favoriteId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "favorite_track" (
    "track_id" UUID NOT NULL,
    "favoriteId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_artist_favoriteId_artist_id_key" ON "favorite_artist"("favoriteId", "artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_album_favoriteId_album_id_key" ON "favorite_album"("favoriteId", "album_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_track_favoriteId_track_id_key" ON "favorite_track"("favoriteId", "track_id");

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artist" ADD CONSTRAINT "favorite_artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artist" ADD CONSTRAINT "favorite_artist_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_album" ADD CONSTRAINT "favorite_album_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_album" ADD CONSTRAINT "favorite_album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_track" ADD CONSTRAINT "favorite_track_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_track" ADD CONSTRAINT "favorite_track_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
