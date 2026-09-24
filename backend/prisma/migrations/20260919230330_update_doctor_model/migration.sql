/*
  Warnings:

  - Added the required column `availableSlot` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `availableSlot` JSON NOT NULL;

-- AddForeignKey
ALTER TABLE `AppointmentSlot` ADD CONSTRAINT `AppointmentSlot_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
