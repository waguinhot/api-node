-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO `User` (`id`, `email`, `name`, `password`) 
VALUES (1, 'example@email.com', 'anceloti', '$2b$10$7opxLnCLVVbiu9J9wC5H..YebRkicCTUwZ4hC5BDiKFVcpWvU8QHq');