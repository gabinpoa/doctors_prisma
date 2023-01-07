/*
  Warnings:

  - You are about to drop the column `start_date` on the `Surgery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Surgery" DROP COLUMN "start_date",
ALTER COLUMN "label" DROP NOT NULL;
