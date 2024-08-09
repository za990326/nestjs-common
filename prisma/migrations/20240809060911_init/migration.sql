/*
  Warnings:

  - You are about to drop the column `author` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `classification` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `createTime` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `display` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `updateTime` on the `article` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `close_at` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Article_classification_key` ON `article`;

-- DropIndex
DROP INDEX `Article_order_key` ON `article`;

-- DropIndex
DROP INDEX `Article_tag_key` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `author`,
    DROP COLUMN `classification`,
    DROP COLUMN `createTime`,
    DROP COLUMN `display`,
    DROP COLUMN `order`,
    DROP COLUMN `tag`,
    DROP COLUMN `updateTime`,
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `close_at` DATETIME(3) NOT NULL,
    ADD COLUMN `comments` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `labels` VARCHAR(191) NOT NULL DEFAULT '-',
    ADD COLUMN `locked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `number` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;
