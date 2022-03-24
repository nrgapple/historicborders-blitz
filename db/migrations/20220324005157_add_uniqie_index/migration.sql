/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `MapEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MapEvent_id_userId_key" ON "MapEvent"("id", "userId");
