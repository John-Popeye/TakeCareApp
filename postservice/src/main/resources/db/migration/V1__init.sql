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
                         `creation_date` date DEFAULT NULL,
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


INSERT INTO `address` VALUES (1,'Wrocław','52-131','Drabika','75','78'),(2,'Test','test','test','test','test');
INSERT INTO `posts` VALUES (1,'dupa','test','2012-12-20','2012-12-20','open','test','2014-01-20',1,NULL, 'user', NULL),(2,'Test','test','2022-12-01','2022-12-21','Created',NULL,'2022-12-28',2,NULL, 'user', NULL);
