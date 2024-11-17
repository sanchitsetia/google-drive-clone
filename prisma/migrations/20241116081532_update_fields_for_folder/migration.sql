/*
  Warnings:

  - Added the required column `parentFolder` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentFolder" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
