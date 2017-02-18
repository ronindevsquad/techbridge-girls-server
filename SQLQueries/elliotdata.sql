CREATE DATABASE  IF NOT EXISTS `evergreendb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `evergreendb`;
-- MySQL dump 10.13  Distrib 5.6.17, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: evergreendb
-- ------------------------------------------------------
-- Server version	5.5.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banks` (
  `account` varchar(255) DEFAULT NULL,
  `routing` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_banks_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cards` (
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `ccv` varchar(255) DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `fk_creditcards_supplier1_idx` (`user_id`),
  CONSTRAINT `fk_cards_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `filename` varchar(255) NOT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`filename`),
  UNIQUE KEY `filename_UNIQUE` (`filename`),
  KEY `fk_files_proposals1_idx` (`proposal_id`),
  CONSTRAINT `fk_files_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES ('03fb236dcfd97e238b707d9b8c3d0071',0,'2017-02-16 19:29:23','2017-02-16 19:29:23','FÌ‰¿Ù¡Êø:és®Íò'),('0ca0ebb22d3c04c979531bb747891c8e',0,'2017-02-16 20:09:19','2017-02-16 20:09:19','⁄ÊÄ`Ù∆ÊäiçÃb⁄¶'),('1715d3ad2ac7f174e351dbcbfbd0bbcd',0,'2017-02-16 19:26:51','2017-02-16 19:26:51','Ï\\‡Ù¿Êø:és®Íò'),('251327c134f91de8d9be2a69bbfb022f',0,'2017-02-16 19:46:49','2017-02-16 19:46:49','∂K`Ù√Ê≥)ıÂ¥†Ï¶'),('4473df570e7d5cee6cf111b2b5f8851c',0,'2017-02-16 20:26:00','2017-02-16 20:26:00','/…ˇ∞Ù…Ê∏Îc‘o∫¸K'),('4828dc30d7073f10b315cf91e7da1ee5',0,'2017-02-16 20:26:11','2017-02-16 20:26:11','5ÈêÙ…Ê∏Îc‘o∫¸K'),('4cf7ec39bb98164d7ad6fee648eaba6b',0,'2017-02-16 19:45:41','2017-02-16 19:45:41','ç{\n∞Ù√Ê≥)ıÂ¥†Ï¶'),('5fd51a6e515844972910ffbc2e8c6715',0,'2017-02-16 21:25:45','2017-02-16 21:25:45','à|Ó–Ù—Ê™„_±Hù#\''),('77c30cf8d4066aa056d8e8a2b1b2d928',0,'2017-02-16 21:01:58','2017-02-16 21:01:58','5™ÄÙŒÊäÔæ·˝†'),('7ff166d97eb22ab1a7e84985e90a679c',0,'2017-02-16 20:25:34','2017-02-16 20:25:34','’8êÙ…Ê∏Îc‘o∫¸K'),('81e6bf0e6f5526d72e88f7642ec5f6cd',0,'2017-02-16 20:25:21','2017-02-16 20:25:21','a\0Ù…Ê∏Îc‘o∫¸K'),('93965a90ecb913849881663d2124f7fe',0,'2017-02-16 20:23:29','2017-02-16 20:23:29','’≥›pÙ»Ê∏Îc‘o∫¸K'),('a894b1493e0a48dcef29152a644a172d',0,'2017-02-16 19:29:51','2017-02-16 19:29:51','W0ÚÙ¡Êø:és®Íò'),('b8ab8a1516edc7faf1d075d70574237c',0,'2017-02-16 20:06:35','2017-02-16 20:06:35','yRÚ¿Ù∆ÊäiçÃb⁄¶'),('c21be1d1b5907b3efe87357161536144',0,'2017-02-16 20:19:26','2017-02-16 20:19:26','DÛIÙ»Ê∂[ô_˘+Jœ'),('f173d760ee309992ac96581fe200a40f',0,'2017-02-16 23:01:08','2017-02-16 23:01:08','€ILÙﬁÊû˚)ó≥-R-');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `labor_costs`
--

DROP TABLE IF EXISTS `labor_costs`;
/*!50001 DROP VIEW IF EXISTS `labor_costs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `labor_costs` (
  `proposal_id` tinyint NOT NULL,
  `UnitCost` tinyint NOT NULL,
  `YieldLoss` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `labors`
--

DROP TABLE IF EXISTS `labors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labors` (
  `id` binary(16) NOT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `labor` varchar(255) DEFAULT NULL,
  `time` decimal(12,6) DEFAULT NULL,
  `yield` decimal(5,2) DEFAULT NULL,
  `rate` decimal(12,6) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_labors_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_labors_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labors`
--

LOCK TABLES `labors` WRITE;
/*!40000 ALTER TABLE `labors` DISABLE KEYS */;
INSERT INTO `labors` VALUES ('gïBÙ◊Ê∞x±o,îd',0,'Chemical Etching',66.000000,66.00,66.000000,66,'2017-02-16 22:05:06','2017-02-16 22:05:06','à|Ó–Ù—Ê™„_±Hù#\'','›øv∞Ù÷Êè∆cwƒ®Z.'),('g´˛Ù◊Ê∞x±o,îd',1,'Robot',66.000000,66.00,66.000000,66,'2017-02-16 22:05:06','2017-02-16 22:05:06','à|Ó–Ù—Ê™„_±Hù#\'','›øv∞Ù÷Êè∆cwƒ®Z.'),('{ım4ÙŒÊ∞x±o,îd',0,'Die Casting 200T',77.000000,77.00,77.000000,77,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('{ım‘ÙŒÊ∞x±o,îd',0,'Blasting, Uni-Directional Small',77.000000,77.00,77.000000,77,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('{ıÖ⁄ÙŒÊ∞x±o,îd',1,'Electrical Engineering',77.000000,77.00,77.000000,77,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('{ıÜ\\ÙŒÊ∞x±o,îd',1,'Painting',77.000000,77.00,77.000000,77,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('∑Êp^ÙŒÊ∞x±o,îd',0,'Cleaning (Ultrasonic)',99.000000,99.00,99.000000,99,'2017-02-16 21:05:36','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),('∑ÊqÙŒÊ∞x±o,îd',0,'Cleaning Machine, In-Line',99.000000,99.00,99.000000,99,'2017-02-16 21:05:36','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),('∑Ê¶ÙŒÊ∞x±o,îd',1,'Glueing',99.000000,99.00,99.000000,99,'2017-02-16 21:05:36','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),('Ë‘1∞ÙŒÊ∞x±o,îd',0,'CNC Horizontal Machining',66.000000,66.00,66.000000,66,'2017-02-16 21:06:58','2017-02-16 21:06:58','5™ÄÙŒÊäÔæ·˝†','…Ä ÄÙŒÊäÔæ·˝†'),('Ë‘k–ÙŒÊ∞x±o,îd',1,'VHB',66.000000,66.00,66.000000,66,'2017-02-16 21:06:58','2017-02-16 21:06:58','5™ÄÙŒÊäÔæ·˝†','…Ä ÄÙŒÊäÔæ·˝†'),('ˆ	Ä‹ÙﬁÊ∞x±o,îd',0,'Cleaning (Ultrasonic)',22.000000,77.00,34.000000,123,'2017-02-16 23:01:52','2017-02-16 23:01:52','€ILÙﬁÊû˚)ó≥-R-','›øv∞Ù÷Êè∆cwƒ®Z.'),('ˆ	Ω|ÙﬁÊ∞x±o,îd',1,'Inspection',66.000000,43.68,22.000000,99,'2017-02-16 23:01:52','2017-02-16 23:01:52','€ILÙﬁÊû˚)ó≥-R-','›øv∞Ù÷Êè∆cwƒ®Z.');
/*!40000 ALTER TABLE `labors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `material_costs`
--

DROP TABLE IF EXISTS `material_costs`;
/*!50001 DROP VIEW IF EXISTS `material_costs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `material_costs` (
  `proposal_id` tinyint NOT NULL,
  `material_cost` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `id` binary(16) NOT NULL,
  `material` varchar(255) DEFAULT NULL,
  `weight` decimal(12,6) DEFAULT NULL,
  `cost` decimal(12,6) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_materials_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_materials_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES ('gÉ‡Ù◊Ê∞x±o,îd','HDPE',66.000000,65.860000,'2017-02-16 22:05:06','2017-02-16 22:05:06','à|Ó–Ù—Ê™„_±Hù#\'','›øv∞Ù÷Êè∆cwƒ®Z.'),('{ıW\"ÙŒÊ∞x±o,îd','POM',77.000000,77.000000,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('{ıXäÙŒÊ∞x±o,îd','ABS',77.000000,77.000000,'2017-02-16 21:03:56','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),('∑Êb⁄ÙŒÊ∞x±o,îd','PEI',99.000000,99.000000,'2017-02-16 21:05:36','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),('∑Êc¢ÙŒÊ∞x±o,îd','PE',99.000000,99.000000,'2017-02-16 21:05:36','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),('Ë‘$rÙŒÊ∞x±o,îd','PC',66.000000,66.000000,'2017-02-16 21:06:58','2017-02-16 21:06:58','5™ÄÙŒÊäÔæ·˝†','…Ä ÄÙŒÊäÔæ·˝†'),('ˆ	p8ÙﬁÊ∞x±o,îd','LCP',123.000000,3.000000,'2017-02-16 23:01:52','2017-02-16 23:01:52','€ILÙﬁÊû˚)ó≥-R-','›øv∞Ù÷Êè∆cwƒ®Z.');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` binary(16) NOT NULL,
  `message` text,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_messages_proposals1_idx` (`proposal_id`),
  KEY `fk_messages_users1_idx` (`user_id`),
  CONSTRAINT `fk_messages_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `status` tinyint(1) DEFAULT NULL,
  `sga` decimal(12,2) DEFAULT NULL,
  `tooling` decimal(12,2) DEFAULT NULL,
  `profit` decimal(12,2) DEFAULT NULL,
  `overhead` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `completion` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`proposal_id`,`user_id`),
  KEY `fk_offer_proposals1_idx` (`proposal_id`),
  KEY `fk_offer_supplier1_idx` (`user_id`),
  CONSTRAINT `fk_offer_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_supplier1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,77.00,77.00,77.00,77.00,7777.00,77,'2017-02-16 21:03:07','2017-02-16 21:03:56','5™ÄÙŒÊäÔæ·˝†','V<F–ÙŒÊäÔæ·˝†'),(1,35.00,56.00,99.00,33.00,9999.00,22,'2017-02-16 21:04:48','2017-02-16 21:05:36','5™ÄÙŒÊäÔæ·˝†','îÈ2–ÙŒÊäÔæ·˝†'),(1,13.00,67.00,6666.00,323.56,7666.00,57,'2017-02-16 21:06:20','2017-02-16 21:06:58','5™ÄÙŒÊäÔæ·˝†','…Ä ÄÙŒÊäÔæ·˝†'),(0,NULL,NULL,NULL,NULL,NULL,NULL,'2017-02-16 22:05:24','2017-02-16 22:05:24','5™ÄÙŒÊäÔæ·˝†','›øv∞Ù÷Êè∆cwƒ®Z.'),(-1,NULL,NULL,NULL,NULL,NULL,NULL,'2017-02-16 21:26:00','2017-02-16 22:05:50','à|Ó–Ù—Ê™„_±Hù#\'','…Ä ÄÙŒÊäÔæ·˝†'),(2,16.00,44.00,66.00,57.00,4000.00,12,'2017-02-16 22:04:04','2017-02-16 22:05:50','à|Ó–Ù—Ê™„_±Hù#\'','›øv∞Ù÷Êè∆cwƒ®Z.'),(0,NULL,NULL,NULL,NULL,NULL,NULL,'2017-02-16 21:26:06','2017-02-16 21:26:06','ç{\n∞Ù√Ê≥)ıÂ¥†Ï¶','…Ä ÄÙŒÊäÔæ·˝†'),(2,135.00,666.00,14.00,134.00,15.00,55,'2017-02-16 23:01:15','2017-02-16 23:02:11','€ILÙﬁÊû˚)ó≥-R-','›øv∞Ù÷Êè∆cwƒ®Z.');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes` (
  `process` varchar(255) NOT NULL,
  PRIMARY KEY (`process`),
  UNIQUE KEY `process_UNIQUE` (`process`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
INSERT INTO `processes` VALUES ('Automation'),('Batch & Fill'),('Blow Molding'),('CNC'),('Cut & Sew'),('Die Casting'),('Die Cutting'),('Fiber Molding'),('Injection Molding'),('Laser Welding'),('Printing'),('Screen Printing'),('Thermaforming');
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposal_processes`
--

DROP TABLE IF EXISTS `proposal_processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposal_processes` (
  `process` varchar(255) NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`process`,`proposal_id`),
  KEY `fk_processes_has_proposals_proposals1_idx` (`proposal_id`),
  KEY `fk_processes_has_proposals_processes1_idx` (`process`),
  CONSTRAINT `fk_processes_has_proposals_processes1` FOREIGN KEY (`process`) REFERENCES `processes` (`process`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_processes_has_proposals_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposal_processes`
--

LOCK TABLES `proposal_processes` WRITE;
/*!40000 ALTER TABLE `proposal_processes` DISABLE KEYS */;
INSERT INTO `proposal_processes` VALUES ('Automation','a\0Ù…Ê∏Îc‘o∫¸K','2017-02-16 20:25:21','2017-02-16 20:25:21'),('Automation','’8êÙ…Ê∏Îc‘o∫¸K','2017-02-16 20:25:34','2017-02-16 20:25:34'),('Automation','/…ˇ∞Ù…Ê∏Îc‘o∫¸K','2017-02-16 20:26:00','2017-02-16 20:26:00'),('Automation','5™ÄÙŒÊäÔæ·˝†','2017-02-16 21:01:58','2017-02-16 21:01:58'),('Automation','5ÈêÙ…Ê∏Îc‘o∫¸K','2017-02-16 20:26:11','2017-02-16 20:26:11'),('Automation','FÌ‰¿Ù¡Êø:és®Íò','2017-02-16 19:29:23','2017-02-16 19:29:23'),('Automation','W0ÚÙ¡Êø:és®Íò','2017-02-16 19:29:51','2017-02-16 19:29:51'),('Automation','yRÚ¿Ù∆ÊäiçÃb⁄¶','2017-02-16 20:06:35','2017-02-16 20:06:35'),('Automation','à|Ó–Ù—Ê™„_±Hù#\'','2017-02-16 21:25:45','2017-02-16 21:25:45'),('Automation','ç{\n∞Ù√Ê≥)ıÂ¥†Ï¶','2017-02-16 19:45:41','2017-02-16 19:45:41'),('Automation','∂K`Ù√Ê≥)ıÂ¥†Ï¶','2017-02-16 19:46:49','2017-02-16 19:46:49'),('Automation','’≥›pÙ»Ê∏Îc‘o∫¸K','2017-02-16 20:23:29','2017-02-16 20:23:29'),('Automation','€ILÙﬁÊû˚)ó≥-R-','2017-02-16 23:01:08','2017-02-16 23:01:08'),('Automation','Ï\\‡Ù¿Êø:és®Íò','2017-02-16 19:26:51','2017-02-16 19:26:51'),('Batch & Fill','Ï\\‡Ù¿Êø:és®Íò','2017-02-16 19:26:51','2017-02-16 19:26:51'),('Cut & Sew','DÛIÙ»Ê∂[ô_˘+Jœ','2017-02-16 20:19:26','2017-02-16 20:19:26'),('Cut & Sew','’≥›pÙ»Ê∏Îc‘o∫¸K','2017-02-16 20:23:29','2017-02-16 20:23:29'),('Laser Welding','⁄ÊÄ`Ù∆ÊäiçÃb⁄¶','2017-02-16 20:09:19','2017-02-16 20:09:19'),('Screen Printing','yRÚ¿Ù∆ÊäiçÃb⁄¶','2017-02-16 20:06:35','2017-02-16 20:06:35'),('Screen Printing','⁄ÊÄ`Ù∆ÊäiçÃb⁄¶','2017-02-16 20:09:19','2017-02-16 20:09:19'),('Thermaforming','yRÚ¿Ù∆ÊäiçÃb⁄¶','2017-02-16 20:06:35','2017-02-16 20:06:35'),('Thermaforming','⁄ÊÄ`Ù∆ÊäiçÃb⁄¶','2017-02-16 20:09:19','2017-02-16 20:09:19');
/*!40000 ALTER TABLE `proposal_processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposals`
--

DROP TABLE IF EXISTS `proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposals` (
  `id` binary(16) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `completion` date DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `audience` tinyint(1) DEFAULT NULL,
  `info` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_proposals_users1_idx` (`user_id`),
  CONSTRAINT `fk_proposals_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposals`
--

LOCK TABLES `proposals` WRITE;
/*!40000 ALTER TABLE `proposals` DISABLE KEYS */;
INSERT INTO `proposals` VALUES ('a\0Ù…Ê∏Îc‘o∫¸K',0,'Maker\'s product',10000,'2017-09-19','235',0,'Let our network of suppliers know what else you need','2017-02-16 20:25:21','2017-02-16 20:25:21','Í∑<0ÙØÊ°_^['),('’8êÙ…Ê∏Îc‘o∫¸K',0,'Maker\'s product',10000,'2017-09-19','345',0,'Let our network of suppliers know what else you need','2017-02-16 20:25:34','2017-02-16 20:25:34','Í∑<0ÙØÊ°_^['),('/…ˇ∞Ù…Ê∏Îc‘o∫¸K',0,'Maker\'s product',10000,'2017-09-19','135',0,'Let our network of suppliers know what else you need','2017-02-16 20:26:00','2017-02-16 20:26:00','Í∑<0ÙØÊ°_^['),('5™ÄÙŒÊäÔæ·˝†',0,'Genuine Maker\'s product',111,'2017-09-19','234',0,'Let our network of suppliers know what else you need','2017-02-16 21:01:58','2017-02-16 21:01:58',')ÀÔÙŒÊäÔæ·˝†'),('5ÈêÙ…Ê∏Îc‘o∫¸K',0,'Maker\'s product',10000,'2017-09-19','15',0,'Let our network of suppliers know what else you need','2017-02-16 20:26:11','2017-02-16 20:26:11','Í∑<0ÙØÊ°_^['),('DÛIÙ»Ê∂[ô_˘+Jœ',0,'Maker\'s product',10000,'2017-09-19','8739',1,'Let our network of suppliers know what else you need','2017-02-16 20:19:26','2017-02-16 20:19:26','Í∑<0ÙØÊ°_^['),('FÌ‰¿Ù¡Êø:és®Íò',0,'Maker\'s product',10000,'2017-09-19','134',0,'Let our network of suppliers know what else you need','2017-02-16 19:29:23','2017-02-16 19:29:23','Í∑<0ÙØÊ°_^['),('W0ÚÙ¡Êø:és®Íò',0,'Maker\'s product',10000,'2017-09-19','134',1,'Let our network of suppliers know what else you need','2017-02-16 19:29:51','2017-02-16 19:29:51','Í∑<0ÙØÊ°_^['),('yRÚ¿Ù∆ÊäiçÃb⁄¶',0,'Maker\'s product',10000,'2017-09-19','876',1,'Let our network of suppliers know what else you need','2017-02-16 20:06:35','2017-02-16 20:06:35','Í∑<0ÙØÊ°_^['),('à|Ó–Ù—Ê™„_±Hù#\'',2,'Genuine Maker\'s product',10000,'2017-09-19','245',0,'Let our network of suppliers know what else you need','2017-02-16 21:25:45','2017-02-16 22:05:50',')ÀÔÙŒÊäÔæ·˝†'),('ç{\n∞Ù√Ê≥)ıÂ¥†Ï¶',0,'Maker\'s product',10000,'2017-09-19','23423',1,'Let our network of suppliers know what else you need','2017-02-16 19:45:41','2017-02-16 19:45:41','Í∑<0ÙØÊ°_^['),('∂K`Ù√Ê≥)ıÂ¥†Ï¶',0,'Maker\'s product',10000,'2017-09-19','123',1,'Let our network of suppliers know what else you need','2017-02-16 19:46:49','2017-02-16 19:46:49','Í∑<0ÙØÊ°_^['),('’≥›pÙ»Ê∏Îc‘o∫¸K',0,'Maker\'s product',10000,'2017-09-19','254',1,'Let our network of suppliers know what else you need','2017-02-16 20:23:29','2017-02-16 20:23:29','Í∑<0ÙØÊ°_^['),('⁄ÊÄ`Ù∆ÊäiçÃb⁄¶',0,'Maker\'s product',345345,'2017-09-19','222',1,'Let our network of suppliers know what else you need','2017-02-16 20:09:19','2017-02-16 20:09:19','Í∑<0ÙØÊ°_^['),('€ILÙﬁÊû˚)ó≥-R-',2,'Genuine Maker\'s product',10000,'2018-10-10','134',0,'Let our network of suppliers know what else you need','2017-02-16 23:01:08','2017-02-16 23:02:10',')ÀÔÙŒÊäÔæ·˝†'),('Ï\\‡Ù¿Êø:és®Íò',0,'Maker\'s product',10000,'2017-09-19','123',0,'Let our network of suppliers know what else you need','2017-02-16 19:26:51','2017-02-16 19:26:51','Í∑<0ÙØÊ°_^[');
/*!40000 ALTER TABLE `proposals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` binary(16) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `input` int(11) DEFAULT NULL,
  `output` int(11) DEFAULT NULL,
  `shipped` int(11) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_reports_offers1_idx` (`user_id`,`proposal_id`),
  CONSTRAINT `fk_reports_offers1` FOREIGN KEY (`user_id`, `proposal_id`) REFERENCES `offers` (`user_id`, `proposal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urls`
--

DROP TABLE IF EXISTS `urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urls` (
  `homepage` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `supplier_id_UNIQUE` (`user_id`),
  KEY `fk_urls_suppliers1_idx` (`user_id`),
  CONSTRAINT `fk_urls_suppliers1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urls`
--

LOCK TABLES `urls` WRITE;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_processes`
--

DROP TABLE IF EXISTS `user_processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_processes` (
  `process` varchar(255) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`process`,`user_id`),
  KEY `fk_processes_has_users_users1_idx` (`user_id`),
  KEY `fk_processes_has_users_processes1_idx` (`process`),
  CONSTRAINT `fk_processes_has_users_processes1` FOREIGN KEY (`process`) REFERENCES `processes` (`process`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_processes_has_users_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_processes`
--

LOCK TABLES `user_processes` WRITE;
/*!40000 ALTER TABLE `user_processes` DISABLE KEYS */;
INSERT INTO `user_processes` VALUES ('Automation','V<F–ÙŒÊäÔæ·˝†','2017-02-16 21:02:55','2017-02-16 21:02:55'),('Automation','îÈ2–ÙŒÊäÔæ·˝†','2017-02-16 21:04:40','2017-02-16 21:04:40'),('Automation','…Ä ÄÙŒÊäÔæ·˝†','2017-02-16 21:06:10','2017-02-16 21:06:10'),('Automation','ÀˇË0Ù∂Êêê´`¥<^','2017-02-16 18:14:25','2017-02-16 18:14:25'),('Automation','›øv∞Ù÷Êè∆cwƒ®Z.','2017-02-16 22:03:58','2017-02-16 22:03:58'),('Batch & Fill','îÈ2–ÙŒÊäÔæ·˝†','2017-02-16 21:04:40','2017-02-16 21:04:40'),('Batch & Fill','…Ä ÄÙŒÊäÔæ·˝†','2017-02-16 21:06:10','2017-02-16 21:06:10');
/*!40000 ALTER TABLE `user_processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (')ÀÔÙŒÊäÔæ·˝†',0,'Genuine Maker','Genuine Person','g@m.com','$2a$10$uetRKUuWxdOAqWxYgk.hy.RUGqMrEMS3rila2pNJDibVqMTVWaMai',NULL,NULL,NULL,'2017-02-16 21:01:38','2017-02-16 21:01:38'),('V<F–ÙŒÊäÔæ·˝†',1,'Lawrence','Lawrence','l@s.com','$2a$10$2eY9WBIThGfRokHz0ZueMuZfCRuLqMq.HI50s5NGUg2OuezT3Qlpa',NULL,NULL,NULL,'2017-02-16 21:02:52','2017-02-16 21:02:52'),('îÈ2–ÙŒÊäÔæ·˝†',1,'Victor','Victory','v@s.com','$2a$10$NJ/o/z7xdCrbm0b/74d9nO6mB3ZITzyKKMqHgNbPD5fpi5M.DQwAW',NULL,NULL,NULL,'2017-02-16 21:04:38','2017-02-16 21:04:38'),('…Ä ÄÙŒÊäÔæ·˝†',1,'Kevin','Kevin','k@s.com','$2a$10$9Ks35uwBSdIN3AcsIwfFw.Hgr3BmCtqVdo6tezVmqa8z2NguDWMZO',NULL,NULL,NULL,'2017-02-16 21:06:06','2017-02-16 21:06:06'),('ÀˇË0Ù∂Êêê´`¥<^',1,'Supplier','Supplier Peson','s@s.com','$2a$10$fmJkJrYbB6qxm12Zvfn7ROnMMWVjOio3DN9HYrLTUmAptowoRxPTq',NULL,NULL,NULL,'2017-02-16 18:14:22','2017-02-16 18:14:22'),('›øv∞Ù÷Êè∆cwƒ®Z.',1,'Howard','Howard','h@s.com','$2a$10$Jnrsyr/flK.c/i22i43ozOnD5u50J6Z3YC/mlozJCif497fgThmRK',NULL,NULL,NULL,'2017-02-16 22:03:56','2017-02-16 22:03:56'),('Í∑<0ÙØÊ°_^[',0,'Maker','Maker Contact Person','m@m.com','$2a$10$87RZ3KLtZiBQPfwi2kWfq.tFobGJqc5SKOkBaEc6Lqc6n2jt5U.bW',NULL,NULL,NULL,'2017-02-16 17:25:07','2017-02-16 17:25:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `labor_costs`
--

/*!50001 DROP TABLE IF EXISTS `labor_costs`*/;
/*!50001 DROP VIEW IF EXISTS `labor_costs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `labor_costs` AS select `l`.`proposal_id` AS `proposal_id`,sum(((`l`.`rate` / 3600) * `l`.`time`)) AS `UnitCost`,(case when (sum(((1 - (`l`.`yield` / 100)) * `m`.`material_cost`)) < 0) then 0 else sum(((1 - (`l`.`yield` / 100)) * `m`.`material_cost`)) end) AS `YieldLoss` from (`labors` `l` join `material_costs` `m` on((`l`.`proposal_id` = `m`.`proposal_id`))) group by `l`.`proposal_id`,`l`.`user_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `material_costs`
--

/*!50001 DROP TABLE IF EXISTS `material_costs`*/;
/*!50001 DROP VIEW IF EXISTS `material_costs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `material_costs` AS select `materials`.`proposal_id` AS `proposal_id`,sum(`materials`.`cost`) AS `material_cost` from `materials` group by `materials`.`proposal_id`,`materials`.`user_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-17  1:11:47
