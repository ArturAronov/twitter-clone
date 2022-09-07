/*
  Warnings:

  - You are about to drop the column `userId` on the `Interaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_userId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "userId";
