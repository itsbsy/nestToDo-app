/*
  Warnings:

  - You are about to alter the column `status` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'DONE') NOT NULL;
