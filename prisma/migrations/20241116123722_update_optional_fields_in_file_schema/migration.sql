/*
  Warnings:

  - You are about to drop the column `isRoot` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "isRoot",
ALTER COLUMN "mimeType" DROP NOT NULL,
ALTER COLUMN "s3Key" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "uploadStatus" DROP NOT NULL;
