/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `weChatId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `audit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visitorinfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `audit` DROP FOREIGN KEY `Audit_auditorId_fkey`;

-- DropForeignKey
ALTER TABLE `audit` DROP FOREIGN KEY `Audit_visitId_fkey`;

-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `Department_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `Log_userId_fkey`;

-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `Permission_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_userId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_userId_fkey`;

-- DropForeignKey
ALTER TABLE `visitorinfo` DROP FOREIGN KEY `VisitorInfo_visitId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    DROP COLUMN `weChatId`;

-- DropTable
DROP TABLE `audit`;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `log`;

-- DropTable
DROP TABLE `organization`;

-- DropTable
DROP TABLE `permission`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `visit`;

-- DropTable
DROP TABLE `visitorinfo`;
