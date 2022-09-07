/*
  Warnings:

  - Made the column `postUserId` on table `Interaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "postUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_postUserId_fkey" FOREIGN KEY ("postUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
