/*
  Warnings:

  - Added the required column `unit_amount` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "unit_amount" DOUBLE PRECISION NOT NULL;
