/*
  Warnings:

  - A unique constraint covering the columns `[userId,doctorId]` on the table `AppointmentSlot` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `appointmentslot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `appointmentslot` DROP FOREIGN KEY `AppointmentSlot_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `appointmentslot` DROP FOREIGN KEY `AppointmentSlot_userId_fkey`;

-- DropIndex
DROP INDEX `AppointmentSlot_doctorId_day_time_key` ON `appointmentslot`;

-- DropIndex
DROP INDEX `AppointmentSlot_userId_fkey` ON `appointmentslot`;

-- AlterTable
ALTER TABLE `appointmentslot` MODIFY `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AppointmentSlot_userId_doctorId_key` ON `AppointmentSlot`(`userId`, `doctorId`);

-- AddForeignKey
ALTER TABLE `AppointmentSlot` ADD CONSTRAINT `AppointmentSlot_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;