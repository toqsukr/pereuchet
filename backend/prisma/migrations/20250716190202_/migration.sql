/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_id_key";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "login" TEXT NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("login");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_login_key" ON "Admin"("login");
