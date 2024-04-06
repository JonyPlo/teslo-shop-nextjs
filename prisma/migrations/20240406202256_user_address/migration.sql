/*
  Warnings:

  - You are about to drop the column `idUser` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `podtalCode` on the `UserAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postalCode` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_idUser_fkey";

-- DropIndex
DROP INDEX "UserAddress_idUser_key";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "idUser",
DROP COLUMN "podtalCode",
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
