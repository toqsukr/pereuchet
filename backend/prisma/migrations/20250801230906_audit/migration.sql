/*
  Warnings:

  - You are about to drop the column `date` on the `Record` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Record_id_key";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RecordChange" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "workerID" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordChange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("login") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordChange" ADD CONSTRAINT "RecordChange_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordChange" ADD CONSTRAINT "RecordChange_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "Admin"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
