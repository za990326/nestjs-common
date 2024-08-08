-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `display` BOOLEAN NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Article_title_key`(`title`),
    UNIQUE INDEX `Article_class_key`(`class`),
    UNIQUE INDEX `Article_tag_key`(`tag`),
    UNIQUE INDEX `Article_order_key`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
