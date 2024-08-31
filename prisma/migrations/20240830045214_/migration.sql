/*
  Warnings:

  - You are about to drop the column `badgesCount` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "badgesCount";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "moment" SET DATA TYPE TEXT;
