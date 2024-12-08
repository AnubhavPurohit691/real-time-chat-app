/*
  Warnings:

  - The `conversationsId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `participantsId` column on the `conversation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "conversationsId",
ADD COLUMN     "conversationsId" INTEGER[];

-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "participantsId",
ADD COLUMN     "participantsId" INTEGER[];
