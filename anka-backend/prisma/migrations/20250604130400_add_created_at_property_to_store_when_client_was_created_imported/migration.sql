-- AlterTable
ALTER TABLE `allocations` MODIFY `invested_value` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `assets` MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clients` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
