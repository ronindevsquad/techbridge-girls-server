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
INSERT INTO `files` VALUES ('82fef112f2760f2d81d542f5a904ac96',0,'2017-02-20 18:21:30','2017-02-20 18:21:30','t∑;ê˜‹Êé≈]xáãx4');
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
  `time` decimal(14,7) DEFAULT NULL,
  `yield` decimal(5,2) DEFAULT NULL,
  `rate` decimal(14,7) DEFAULT NULL,
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
INSERT INTO `labors` VALUES ('iR36˜·Ê¨!ö\rq',0,'Cleaning (Ultrasonic)',88.0000000,88.00,88.0000000,88,'2017-02-20 18:56:58','2017-02-20 18:56:58','t∑;ê˜‹Êé≈]xáãx4','Ú\ná˜‡Ê≠g·˘°ˇë√'),('iRD¸˜·Ê¨!ö\rq',1,'Silkscreen',88.0000000,88.00,88.0000000,88,'2017-02-20 18:56:58','2017-02-20 18:56:58','t∑;ê˜‹Êé≈]xáãx4','Ú\ná˜‡Ê≠g·˘°ˇë√'),('°Ãv¶˜ﬂÊ¨!ö\rq',0,'Chemical Etching',66.0000000,66.00,66.0000000,66,'2017-02-20 18:44:14','2017-02-20 18:44:14','t∑;ê˜‹Êé≈]xáãx4','=⁄RP˜›Êé≈]xáãx4'),('°Ãä¶˜ﬂÊ¨!ö\rq',1,'Oven',66.0000000,66.00,66.0000000,66,'2017-02-20 18:44:14','2017-02-20 18:44:14','t∑;ê˜‹Êé≈]xáãx4','=⁄RP˜›Êé≈]xáãx4'),('∞¿,˜·Ê¨!ö\rq',0,'Cleaning Machine, In-Line',90.0000000,90.00,90.0000000,90,'2017-02-20 18:58:57','2017-02-20 18:58:57','t∑;ê˜‹Êé≈]xáãx4','êÂ}@˜·Ê≠g·˘°ˇë√'),('∞…å˜·Ê¨!ö\rq',1,'Oven',90.0000000,90.00,90.0000000,90,'2017-02-20 18:58:57','2017-02-20 18:58:57','t∑;ê˜‹Êé≈]xáãx4','êÂ}@˜·Ê≠g·˘°ˇë√'),('Ïü˜·Ê¨!ö\rq',0,'Blasting, Uni-Directional Heavy',44.0000000,44.00,44.0000000,44,'2017-02-20 19:00:39','2017-02-20 19:00:39','t∑;ê˜‹Êé≈]xáãx4','À[(0˜·Ê≠g·˘°ˇë√'),('Ïüö˜·Ê¨!ö\rq',0,'CNC Machining',99.0000000,99.00,99.0000000,99,'2017-02-20 19:00:39','2017-02-20 19:00:39','t∑;ê˜‹Êé≈]xáãx4','À[(0˜·Ê≠g·˘°ˇë√'),('Ïü¥˜·Ê¨!ö\rq',1,'Packing',4567.0000000,78.00,56.0000000,88,'2017-02-20 19:00:39','2017-02-20 19:00:39','t∑;ê˜‹Êé≈]xáãx4','À[(0˜·Ê≠g·˘°ˇë√');
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
  `weight` decimal(14,7) DEFAULT NULL,
  `cost` decimal(14,7) DEFAULT NULL,
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
INSERT INTO `materials` VALUES ('iR ä˜·Ê¨!ö\rq','PC',88.0000000,88.0000000,'2017-02-20 18:56:58','2017-02-20 18:56:58','t∑;ê˜‹Êé≈]xáãx4','Ú\ná˜‡Ê≠g·˘°ˇë√'),('iR!\\˜·Ê¨!ö\rq','PEI',88.0000000,88.0000000,'2017-02-20 18:56:58','2017-02-20 18:56:58','t∑;ê˜‹Êé≈]xáãx4','Ú\ná˜‡Ê≠g·˘°ˇë√'),('°Ãc“˜ﬂÊ¨!ö\rq','ABS',66.0000000,66.0000000,'2017-02-20 18:44:14','2017-02-20 18:44:14','t∑;ê˜‹Êé≈]xáãx4','=⁄RP˜›Êé≈]xáãx4'),('°ÃdÃ˜ﬂÊ¨!ö\rq','PMMA',66.0000000,66.0000000,'2017-02-20 18:44:14','2017-02-20 18:44:14','t∑;ê˜‹Êé≈]xáãx4','=⁄RP˜›Êé≈]xáãx4'),('∞≤˜·Ê¨!ö\rq','PMMA',90.0000000,90.0000000,'2017-02-20 18:58:57','2017-02-20 18:58:57','t∑;ê˜‹Êé≈]xáãx4','êÂ}@˜·Ê≠g·˘°ˇë√'),('Ïû¸ˆ˜·Ê¨!ö\rq','PA - Nylon',4.0000000,11.0000000,'2017-02-20 19:00:39','2017-02-20 19:00:39','t∑;ê˜‹Êé≈]xáãx4','À[(0˜·Ê≠g·˘°ˇë√');
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
  `first` decimal(14,7) DEFAULT NULL,
  `follow` decimal(14,7) DEFAULT NULL,
  `cavitation` smallint(3) DEFAULT NULL,
  `days` smallint(3) DEFAULT NULL,
  `life` decimal(10,7) DEFAULT NULL,
  `sga` decimal(14,7) DEFAULT NULL,
  `profit` decimal(14,7) DEFAULT NULL,
  `overhead` decimal(14,7) DEFAULT NULL,
  `tpp` decimal(14,7) DEFAULT NULL,
  `total` decimal(14,7) DEFAULT NULL,
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
INSERT INTO `offers` VALUES (1,66.0000000,66.0000000,66,66,66.0000000,66.0000000,66.0000000,66.0000000,66.0000000,660.0000000,66,'2017-02-20 18:36:06','2017-02-20 18:44:14','t∑;ê˜‹Êé≈]xáãx4','=⁄RP˜›Êé≈]xáãx4'),(1,90.0000000,90.0000000,90,90,90.0000000,90.0000000,909.0000000,90.0000000,90.0000000,900.0000000,9,'2017-02-20 18:58:23','2017-02-20 18:58:57','t∑;ê˜‹Êé≈]xáãx4','êÂ}@˜·Ê≠g·˘°ˇë√'),(0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-02-20 19:05:35','2017-02-20 19:05:35','t∑;ê˜‹Êé≈]xáãx4','ó¯p˜‚Ê≠g·˘°ˇë√'),(1,48.0000000,45.0000000,3,35,73.0000000,3453.0000000,345.0000000,355.0000000,3737.0000000,2000.0000000,29,'2017-02-20 18:59:51','2017-02-20 19:00:39','t∑;ê˜‹Êé≈]xáãx4','À[(0˜·Ê≠g·˘°ˇë√'),(1,88.0000000,88.0000000,88,88,88.0000000,88.0000000,88.0000000,88.0000000,88.0000000,888.0000000,88,'2017-02-20 18:56:23','2017-02-20 18:56:58','t∑;ê˜‹Êé≈]xáãx4','Ú\ná˜‡Ê≠g·˘°ˇë√');
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
INSERT INTO `proposal_processes` VALUES ('Automation','t∑;ê˜‹Êé≈]xáãx4','2017-02-20 18:21:30','2017-02-20 18:21:30');
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
INSERT INTO `proposals` VALUES ('t∑;ê˜‹Êé≈]xáãx4',0,'Ronin Dev\'s product',10000,'2017-09-19','123',0,'Let our network of suppliers know what else you need','2017-02-20 18:21:30','2017-02-20 18:21:30','_ä˜⁄Êé≈]xáãx4');
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
INSERT INTO `user_processes` VALUES ('Automation','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Automation','êÂ}@˜·Ê≠g·˘°ˇë√','2017-02-20 18:58:08','2017-02-20 18:58:08'),('Automation','ó¯p˜‚Ê≠g·˘°ˇë√','2017-02-20 19:05:28','2017-02-20 19:05:28'),('Automation','À[(0˜·Ê≠g·˘°ˇë√','2017-02-20 18:59:46','2017-02-20 18:59:46'),('Automation','Ú\ná˜‡Ê≠g·˘°ˇë√','2017-02-20 18:56:08','2017-02-20 18:56:08'),('Batch & Fill','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Batch & Fill','êÂ}@˜·Ê≠g·˘°ˇë√','2017-02-20 18:58:08','2017-02-20 18:58:08'),('Batch & Fill','ó¯p˜‚Ê≠g·˘°ˇë√','2017-02-20 19:05:28','2017-02-20 19:05:28'),('Batch & Fill','À[(0˜·Ê≠g·˘°ˇë√','2017-02-20 18:59:46','2017-02-20 18:59:46'),('Blow Molding','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Blow Molding','À[(0˜·Ê≠g·˘°ˇë√','2017-02-20 18:59:46','2017-02-20 18:59:46'),('CNC','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Cut & Sew','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Die Casting','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Die Cutting','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Fiber Molding','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Injection Molding','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Laser Welding','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Printing','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Screen Printing','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16'),('Thermaforming','=⁄RP˜›Êé≈]xáãx4','2017-02-20 18:27:16','2017-02-20 18:27:16');
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
INSERT INTO `users` VALUES ('=⁄RP˜›Êé≈]xáãx4',1,'Ronin','Ronin Supplier','r@s.com','$2a$10$NCU5Evt24J/cM30ckOxYyOGvS3J9Fo/SUj/yvqqIMsCVLSuHhv7ji','https://s3-us-west-1.amazonaws.com/ronintestbucket/picturefolder/c1102e91ae6a2ebf7f4fdf0d50f6dc1c',NULL,NULL,'2017-02-20 18:27:07','2017-02-20 18:50:45'),('_ä˜⁄Êé≈]xáãx4',0,'Ronin Dev','Elliot Young','elliotsyoung@gmail.com','$2a$10$NCU5Evt24J/cM30ckOxYyOGvS3J9Fo/SUj/yvqqIMsCVLSuHhv7ji','https://s3-us-west-1.amazonaws.com/ronintestbucket/picturefolder/2a9cb1f49f0942414d28f709b3f00a05',NULL,NULL,'2017-02-20 18:06:35','2017-02-20 19:03:03'),('êÂ}@˜·Ê≠g·˘°ˇë√',1,'Foxcon','Deng Xi','f@s.com','$2a$10$mvIDT6Jv4C7ryW..XRcgOOxqWbvArD357MKSkLuMGyfgwU09lI/OC','https://s3-us-west-1.amazonaws.com/ronintestbucket/picturefolder/d1896590ba671208967a391190a5262d',NULL,NULL,'2017-02-20 18:58:05','2017-02-20 18:58:17'),('ó¯p˜‚Ê≠g·˘°ˇë√',1,'Lead Supply','Larry','l@s.com','$2a$10$GKMTFG6uzsRuJ7d6Ngh8Z.Ch9wCfAIn5T/i0W.tSiy5hIWuSFdCD2',NULL,NULL,NULL,'2017-02-20 19:05:25','2017-02-20 19:05:25'),('À[(0˜·Ê≠g·˘°ˇë√',1,'Gus 3D Supply','Gustavo','g@s.com','$2a$10$/lMXfOHRa1n.Lg4pUraL6eZPfP5zypTkXmUDnll6nU22Fsoka8mm2',NULL,NULL,NULL,'2017-02-20 18:59:43','2017-02-20 18:59:43'),('Ú\ná˜‡Ê≠g·˘°ˇë√',1,'Samurai Supply','Samurai Contact','s@s.com','$2a$10$HC3DDXD3dh45O6MPiK.Z.OiReE3fFV61k9dP7QB8wbxDrxATA1aIC','https://s3-us-west-1.amazonaws.com/ronintestbucket/picturefolder/0ea2428e31cde1934716d8507cad20e5',NULL,NULL,'2017-02-20 18:53:38','2017-02-20 18:56:16');
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

-- Dump completed on 2017-02-20 22:17:33
