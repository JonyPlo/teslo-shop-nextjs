/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_idUser_key" ON "UserAddress"("idUser");
