-- AlterTable
ALTER TABLE `todo` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'OPEN';