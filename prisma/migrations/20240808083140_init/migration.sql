/*
  Warnings:

  - You are about to drop the column `class` on the `article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classification]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classification` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Article_class_key` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `class`,
    ADD COLUMN `classification` VARCHAR(191) NOT NULL,
    MODIFY `tag` VARCHAR(191) NOT NULL DEFAULT '-';

-- CreateIndex
CREATE UNIQUE INDEX `Article_classification_key` ON `Article`(`classification`);
