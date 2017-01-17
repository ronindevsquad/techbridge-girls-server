CREATE DATABASE  IF NOT EXISTS `evergreendb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `evergreendb`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: evergreendb
-- ------------------------------------------------------
-- Server version	5.5.49-log

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `street` varchar(45) DEFAULT NULL,
  `street_ext` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`proposal_id`),
  UNIQUE KEY `proposal_id_UNIQUE` (`proposal_id`),
  KEY `fk_addresses_proposals1_idx` (`proposal_id`),
  CONSTRAINT `fk_addresses_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachments` (
  `id` binary(16) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_attachments_proposals1_idx` (`proposal_id`),
  CONSTRAINT `fk_attachments_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banks` (
  `account` int(11) DEFAULT NULL,
  `routing` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  UNIQUE KEY `routing_UNIQUE` (`routing`),
  CONSTRAINT `fk_banks_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `ccv` int(11) DEFAULT NULL,
  `expiration` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `fk_creditcards_supplier1_idx` (`user_id`),
  CONSTRAINT `fk_cards_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `machines`
--

DROP TABLE IF EXISTS `machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machines` (
  `id` binary(16) NOT NULL,
  `machine` varchar(45) DEFAULT NULL,
  `cycle_time` decimal(10,2) DEFAULT NULL,
  `yield` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `laborers` int(11) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_machines_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_machines_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machines`
--

LOCK TABLES `machines` WRITE;
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` VALUES ('Û… û\Ù<æ”“ H\Â|2','Woodcutter',12.00,32,132.00,1,'2017-01-12 19:03:28','2017-01-12 19:03:28','ºY¿\Ù\Ù8æ”“ H\Â|2','M\rD/\Ù8æ”“ H\Â|2');
/*!40000 ALTER TABLE `machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `id` binary(16) NOT NULL,
  `material` varchar(45) DEFAULT NULL,
  `material_cost` decimal(12,2) DEFAULT NULL,
  `unit_cost` decimal(12,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_materials_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_materials_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES ('\Ûx\Ù<æ”“ H\Â|2','Wood',100.00,25.00,'2017-01-12 19:03:28','2017-01-12 19:03:28','ºY¿\Ù\Ù8æ”“ H\Â|2','M\rD/\Ù8æ”“ H\Â|2');
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
  `status` tinyint(1) DEFAULT NULL,
  `pdf_attach_s` varchar(45) DEFAULT NULL,
  `pdf_attach_m` varchar(45) DEFAULT NULL,
  `jpg_attach_s` varchar(45) DEFAULT NULL,
  `jpg_attach_m` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_messages_offers1_idx` (`user_id`,`proposal_id`),
  CONSTRAINT `fk_messages_offers1` FOREIGN KEY (`user_id`, `proposal_id`) REFERENCES `offers` (`user_id`, `proposal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `ndas`
--

DROP TABLE IF EXISTS `ndas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ndas` (
  `id` binary(16) NOT NULL,
  `nda` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_attachments_proposals1_idx` (`proposal_id`),
  CONSTRAINT `fk_attachments_proposals10` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ndas`
--

LOCK TABLES `ndas` WRITE;
/*!40000 ALTER TABLE `ndas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ndas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `status` tinyint(1) DEFAULT NULL,
  `sga` varchar(45) DEFAULT NULL,
  `profit` decimal(12,2) DEFAULT NULL,
  `overhead` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`proposal_id`,`user_id`),
  KEY `fk_offer_proposals1_idx` (`proposal_id`),
  KEY `fk_offer_supplier1_idx` (`user_id`),
  CONSTRAINT `fk_offer_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_supplier1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (0,'idk',123.00,31.00,12123.00,'2017-01-12 19:03:28','2017-01-12 19:03:28','ºY¿\Ù\Ù8æ”“ H\Â|2','M\rD/\Ù8æ”“ H\Â|2');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes` (
  `process` varchar(45) NOT NULL,
  PRIMARY KEY (`process`),
  UNIQUE KEY `process_UNIQUE` (`process`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
INSERT INTO `processes` VALUES ('Automation & Test Equipment'),('Die Casting'),('Formula Batching & Filling'),('Injection Molding'),('Packaging (Primary)'),('Packaging (Secondary)'),('Tooling');
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes_has_proposals`
--

DROP TABLE IF EXISTS `processes_has_proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes_has_proposals` (
  `process_process` varchar(45) NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`process_process`,`proposal_id`),
  KEY `fk_processes_has_proposals_proposals1_idx` (`proposal_id`),
  KEY `fk_processes_has_proposals_processes1_idx` (`process_process`),
  CONSTRAINT `fk_processes_has_proposals_processes1` FOREIGN KEY (`process_process`) REFERENCES `processes` (`process`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_processes_has_proposals_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes_has_proposals`
--

LOCK TABLES `processes_has_proposals` WRITE;
/*!40000 ALTER TABLE `processes_has_proposals` DISABLE KEYS */;
INSERT INTO `processes_has_proposals` VALUES ('Die Casting','ºY¿\Ù\Ù8æ”“ H\Â|2','2017-01-12 18:33:55','2017-01-12 18:33:55'),('Packaging (Primary)','ºY¿\Ù\Ù8æ”“ H\Â|2','2017-01-12 18:33:55','2017-01-12 18:33:55');
/*!40000 ALTER TABLE `processes_has_proposals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes_has_users`
--

DROP TABLE IF EXISTS `processes_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes_has_users` (
  `process_process` varchar(45) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`process_process`,`user_id`),
  KEY `fk_processes_has_users_users1_idx` (`user_id`),
  KEY `fk_processes_has_users_processes1_idx` (`process_process`),
  CONSTRAINT `fk_processes_has_users_processes1` FOREIGN KEY (`process_process`) REFERENCES `processes` (`process`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_processes_has_users_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes_has_users`
--

LOCK TABLES `processes_has_users` WRITE;
/*!40000 ALTER TABLE `processes_has_users` DISABLE KEYS */;
INSERT INTO `processes_has_users` VALUES ('Die Casting','M\rD/\Ù8æ”“ H\Â|2','2017-01-12 18:31:34','2017-01-12 18:31:34'),('Injection Molding','M\rD/\Ù8æ”“ H\Â|2','2017-01-12 18:31:34','2017-01-12 18:31:34'),('Packaging (Secondary)','M\rD/\Ù8æ”“ H\Â|2','2017-01-12 18:31:34','2017-01-12 18:31:34'),('Tooling','M\rD/\Ù8æ”“ H\Â|2','2017-01-12 18:31:34','2017-01-12 18:31:34');
/*!40000 ALTER TABLE `processes_has_users` ENABLE KEYS */;
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
  `sga` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `completion` datetime DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `audience` tinyint(1) DEFAULT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `attachment` varchar(45) DEFAULT NULL,
  `nda` varchar(45) DEFAULT NULL,
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
INSERT INTO `proposals` VALUES ('ºY¿\Ù\Ù8æ”“ H\Â|2',0,'Tables',129012,'2017-01-12 08:00:00',12356,0,'Some additional information',NULL,NULL,'2017-01-12 18:33:54','2017-01-12 18:33:54','•×°©\Ù8æ”“ H\Â|2');
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
  `input` varchar(45) DEFAULT NULL,
  `output` varchar(45) DEFAULT NULL,
  `shipping` varchar(45) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
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
  `twiiter` varchar(255) DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  UNIQUE KEY `supplier_id_UNIQUE` (`user_id`),
  KEY `fk_urls_suppliers1_idx` (`user_id`),
  CONSTRAINT `fk_urls_suppliers1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `company_UNIQUE` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('M\rD/\Ù8æ”“ H\Â|2',1,'Supplier','Supplier','supplier@supplier.com','$2a$10$XIkBGcHyuB5KO87iraYoDOl4EZbn18M27PfaOo149fnKtaFjnQdi6',NULL,'2017-01-12 18:30:51','2017-01-12 18:30:51'),('•×°©\Ù8æ”“ H\Â|2',0,'Maker','Maker','maker@maker.com','$2a$10$4bDg1z0F0dfBMWd2pPQht.Zvs7SND5FE0ihHtm2aBRyUmP5wcyNmS',NULL,'2017-01-12 18:32:53','2017-01-12 18:32:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-12 23:53:11
