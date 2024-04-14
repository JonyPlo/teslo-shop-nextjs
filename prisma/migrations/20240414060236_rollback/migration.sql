/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_orderItemId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "orderItemId";
