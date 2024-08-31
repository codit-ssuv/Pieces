/*
  Warnings:

  - You are about to drop the column `description` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the column `memoryMoment` on the `Memory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "description",
DROP COLUMN "likes",
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "likes",
DROP COLUMN "memoryMoment",
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moment" TIMESTAMP(3);
