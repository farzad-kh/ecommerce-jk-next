/*
  Warnings:

  - You are about to drop the column `userId` on the `UserProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- DropIndex
DROP INDEX "UserProduct_userId_key";

-- AlterTable
ALTER TABLE "UserProduct" DROP COLUMN "userId";
