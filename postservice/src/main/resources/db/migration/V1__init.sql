CREATE TABLE `address` (
                           `id` int NOT NULL AUTO_INCREMENT,
                           `city` varchar(100) DEFAULT NULL,
                           `zip_code` varchar(100) DEFAULT NULL,
                           `street` varchar(100) DEFAULT NULL,
                           `home_number` varchar(100) DEFAULT NULL,
                           `flat_number` varchar(100) DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           UNIQUE KEY `id_UNIQUE` (`id`)
);


CREATE TABLE `posts` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `title` varchar(100) DEFAULT NULL,
                         `description` varchar(1000) DEFAULT NULL,
                         `start_date` date DEFAULT NULL,
                         `end_date` date DEFAULT NULL,
                         `status` varchar(45) DEFAULT NULL,
                         `animal_description` varchar(90) DEFAULT NULL,
                         `creation_date` TIMESTAMP DEFAULT NULL,
                         `address_id` int NOT NULL,
                         INDEX (address_id),
                         FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `id_UNIQUE` (`id`)
);

ALTER TABLE `posts`
    ADD COLUMN `image` LONGBLOB NULL AFTER `address_id`;

ALTER TABLE `posts`
    ADD COLUMN `creator_user_name` varchar(45) NOT NULL;

ALTER TABLE `posts`
    ADD COLUMN `taker_user_name` varchar(45) DEFAULT NULL;

ALTER TABLE `posts`
    ADD COLUMN `phone_number` varchar(45) DEFAULT NULL;

