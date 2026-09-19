/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,day,time]` on the table `AppointmentSlot` will be added. If there are existing duplicate values, this will fail.
*/

-- DropForeignKey
ALTER TABLE `appointmentslot` DROP FOREIGN KEY `AppointmentSlot_userId_fkey`;

-- DropIndex
DROP INDEX `AppointmentSlot_userId_doctorId_key` ON `appointmentslot`;

-- AlterTable
ALTER TABLE `appointmentslot` MODIFY `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AppointmentSlot_doctorId_day_time_key` ON `AppointmentSlot`(`doctorId`, `day`, `time`);

-- AddForeignKey
ALTER TABLE `AppointmentSlot` ADD CONSTRAINT `AppointmentSlot_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;