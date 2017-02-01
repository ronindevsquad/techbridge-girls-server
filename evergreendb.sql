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
  `filename` varchar(200) NOT NULL,
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
INSERT INTO `files` VALUES ('143bdf0d5b90c471aec1c3a728fc7439',0,'2017-01-31 13:17:10','2017-01-31 13:17:10','��>`\��\�۹zv3]\�'),('18890e79b5596e41a1878180dd2866d4',0,'2017-01-29 15:42:26','2017-01-29 15:42:26','3 æ|æ®À'),('255b89f083b171319734636b05d62192',0,'2017-01-30 15:59:30','2017-01-30 15:59:30','#ªePçHæ³æ\�'),('29f7ebbab62a5ac56b9f14676bf1de72',0,'2017-01-29 15:40:13','2017-01-29 15:40:13','G6Àæ|æµì'),('2c3f0ae98baa45ecde62077145450905',0,'2017-01-30 16:02:24','2017-01-30 16:02:24','låPçHæ©'),('3b728226553f81de2def4fdd6452d1f1',0,'2017-01-29 15:49:36','2017-01-29 15:49:36','4æ}æ«'),('4a55a0b9c2b6df87c2deb2e40b967b45',0,'2017-01-29 15:49:00','2017-01-29 15:49:00','Æ\\ æ}æ«\�'),('5f1ed9e83a392a7c474ebaa48c7a5672',0,'2017-01-29 15:42:26','2017-01-29 15:42:26','3 æ|æ®À'),('82683ccc6c5e139c21b50b110b14c43c',0,'2017-01-29 15:40:13','2017-01-29 15:40:13','G6Àæ|æµì'),('883db5f1c144637f8bc2b33848f18a53',0,'2017-01-31 13:17:10','2017-01-31 13:17:10','��>`\��\�۹zv3]\�'),('8b8d395c7c0a6e0fc8da475b1bf54095',0,'2017-01-30 16:03:49','2017-01-30 16:03:49','½Ò¨àçHæ'),('8f7c04bf138b065e120526edead10318',1,'2017-01-31 13:17:10','2017-01-31 13:17:10','��>`\��\�۹zv3]\�'),('949b5ba9aaf0ebd16347811294956987',0,'2017-01-30 15:59:30','2017-01-30 15:59:30','#ªePçHæ³æ\�'),('9d6b07bf145b8322486ead97ffd89cf0',0,'2017-01-30 15:59:30','2017-01-30 15:59:30','#ªePçHæ³æ\�'),('a14597bd0cbcff4b101352e508c60e45',0,'2017-01-31 13:17:10','2017-01-31 13:17:10','��>`\��\�۹zv3]\�'),('a83b4987a091320d6e40f414db3d9561',1,'2017-01-29 15:49:00','2017-01-29 15:49:00','Æ\\ æ}æ«\�'),('ac5045f6631dec135825c7cbe545b81c',1,'2017-01-30 16:03:49','2017-01-30 16:03:49','½Ò¨àçHæ'),('ae9a1d5962466f3d212bb0ed78072544',0,'2017-01-29 15:49:36','2017-01-29 15:49:36','4æ}æ«'),('b207b13386d5fb6ac1143a5752002201',1,'2017-01-30 16:02:24','2017-01-30 16:02:24','låPçHæ©'),('c52b9b6f4109571a91ef06cbb1cfe3bd',1,'2017-01-29 15:49:36','2017-01-29 15:49:36','4æ}æ«'),('c9f1656c6076444fdf535fb2325163c7',1,'2017-01-29 15:40:13','2017-01-29 15:40:13','G6Àæ|æµì'),('d25542e03d71971c074dbc4c0033e4ff',1,'2017-01-29 15:42:26','2017-01-29 15:42:26','3 æ|æ®À'),('d38f16c9b0a2c5e0ec45d9d369778272',0,'2017-01-30 15:59:30','2017-01-30 15:59:30','#ªePçHæ³æ\�'),('d6dcfde584b6eb30c30a687925c0cb27',1,'2017-01-30 15:59:30','2017-01-30 15:59:30','#ªePçHæ³æ\�'),('f85f99eede4e86c468d25cb5831029cf',0,'2017-01-29 15:49:00','2017-01-29 15:49:00','Æ\\ æ}æ«\�');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `labor_costs`
--

DROP TABLE IF EXISTS `labor_costs`;
/*!50001 DROP VIEW IF EXISTS `labor_costs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `labor_costs` AS SELECT 
 1 AS `proposal_id`,
 1 AS `UnitCost`,
 1 AS `YieldLoss`*/;
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
  `labor` varchar(45) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `yield` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_labors_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_labors_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labors`
--

LOCK TABLES `labors` WRITE;
/*!40000 ALTER TABLE `labors` DISABLE KEYS */;
/*!40000 ALTER TABLE `labors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `material_costs`
--

DROP TABLE IF EXISTS `material_costs`;
/*!50001 DROP VIEW IF EXISTS `material_costs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `material_costs` AS SELECT 
 1 AS `proposal_id`,
 1 AS `material_cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `id` binary(16) NOT NULL,
  `material` varchar(45) DEFAULT NULL,
  `weight` decimal(12,5) DEFAULT NULL,
  `cost` decimal(12,5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_materials_offers1_idx` (`proposal_id`,`user_id`),
  CONSTRAINT `fk_materials_offers1` FOREIGN KEY (`proposal_id`, `user_id`) REFERENCES `offers` (`proposal_id`, `user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
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
  `message` varchar(1000) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_messages_proposals1_idx` (`proposal_id`),
  KEY `fk_messages_users1_idx` (`user_id`),
  CONSTRAINT `fk_messages_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('\0Ëí\rææ~','okay',0,'2017-01-29 17:10:19','2017-01-29 17:10:19','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('øòÚææ','10101010',0,'2017-01-29 17:10:23','2017-01-29 17:10:23','Æ\\ æ}æ«\�','çoöæzæ~'),('& ææ~','testet',0,'2017-01-29 17:11:22','2017-01-29 17:11:22','Æ\\ æ}æ«\�','çoöæzæ~'),('(¯Pææ~','okokoko',0,'2017-01-29 17:11:26','2017-01-29 17:11:26','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('+&!ææ~ ','fkkkkk',0,'2017-01-29 17:04:20','2017-01-29 17:04:20','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('T*£ææ~\�','bd',0,'2017-01-29 17:05:29','2017-01-29 17:05:29','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('xmÌææ~','testing',0,'2017-01-29 17:06:30','2017-01-29 17:06:30','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('~:ææ~\�','hi',0,'2017-01-29 17:06:40','2017-01-29 17:06:40','Æ\\ æ}æ«\�','çoöæzæ~'),('Ë¥ææ','why',0,'2017-01-29 17:14:10','2017-01-29 17:14:10','Æ\\ æ}æ«\�','çoöæzæ~'),('\r7Ùææ~','why not',0,'2017-01-29 17:14:16','2017-01-29 17:14:16','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('¦úFææ','gas',0,'2017-01-29 17:00:10','2017-01-29 17:00:10','Æ\\ æ}æ«\�','çoöæzæ~'),('ØÙææ\�','lol',0,'2017-01-29 17:00:27','2017-01-29 17:00:27','Æ\\ æ}æ«\�','çoöæzæ~'),('Öd;àææ\�','test',0,'2017-01-29 17:17:16','2017-01-29 17:17:16','Æ\\ æ}æ«\�','çoöæzæ~'),('Øææ','test',0,'2017-01-29 17:17:19','2017-01-29 17:17:19','Æ\\ æ}æ«\�','çoöæzæ~'),('Øðææ','with',0,'2017-01-29 17:17:20','2017-01-29 17:17:20','Æ\\ æ}æ«\�','çoöæzæ~'),('Ùe\0ææ\�','new',0,'2017-01-29 17:17:21','2017-01-29 17:17:21','Æ\\ æ}æ«\�','çoöæzæ~'),('Ú5ðææ\�','uuid',0,'2017-01-29 17:17:22','2017-01-29 17:17:22','Æ\\ æ}æ«\�','çoöæzæ~'),('ß¥ ææ\�','it w',0,'2017-01-29 17:17:31','2017-01-29 17:17:31','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('àD@ææÈ','work',0,'2017-01-29 17:17:32','2017-01-29 17:17:32','Æ\\ æ}æ«\�','ÚÁòßæ}æ'),('à´(0ææ\�','s',0,'2017-01-29 17:17:33','2017-01-29 17:17:33','Æ\\ æ}æ«\�','ÚÁòßæ}æ');
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
  `profit` decimal(12,2) DEFAULT NULL,
  `overhead` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `tooling` decimal(12,2) DEFAULT NULL,
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
  `process` varchar(45) NOT NULL,
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
INSERT INTO `proposal_processes` VALUES ('Automation','��>`\��\�۹zv3]\�','2017-01-31 13:17:10','2017-01-31 13:17:10'),('Batch & Fill','Æ\\ æ}æ«\�','2017-01-29 15:49:00','2017-01-29 15:49:00'),('Blow Molding','#ªePçHæ³æ\�','2017-01-30 15:59:30','2017-01-30 15:59:30'),('Blow Molding','Æ\\ æ}æ«\�','2017-01-29 15:49:00','2017-01-29 15:49:00'),('Blow Molding','½Ò¨àçHæ','2017-01-30 16:03:49','2017-01-30 16:03:49'),('CNC','låPçHæ©','2017-01-30 16:02:24','2017-01-30 16:02:24'),('Cut & Sew','#ªePçHæ³æ\�','2017-01-30 15:59:30','2017-01-30 15:59:30'),('Die Cutting','låPçHæ©','2017-01-30 16:02:24','2017-01-30 16:02:24'),('Injection Molding','4æ}æ«','2017-01-29 15:49:36','2017-01-29 15:49:36'),('Printing','��>`\��\�۹zv3]\�','2017-01-31 13:17:10','2017-01-31 13:17:10'),('Printing','½Ò¨àçHæ','2017-01-30 16:03:49','2017-01-30 16:03:49'),('Thermaforming','4æ}æ«','2017-01-29 15:49:36','2017-01-29 15:49:36');
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
  `product` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `completion` datetime DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `audience` tinyint(1) DEFAULT NULL,
  `info` varchar(1000) DEFAULT NULL,
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
  `process` varchar(45) NOT NULL,
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
INSERT INTO `user_processes` VALUES ('Automation','2W��\��\�۹zv3]\�','2017-01-31 13:21:19','2017-01-31 13:21:19'),('Automation','�\'��\��\�۹zv3]\�','2017-01-31 13:18:06','2017-01-31 13:18:06'),('Batch & Fill','@q½ææ~\�','2017-01-29 16:06:41','2017-01-29 16:06:41'),('Batch & Fill','ÚÁòßæ}æ','2017-01-29 15:50:35','2017-01-29 15:50:35'),('Blow Molding','�\'��\��\�۹zv3]\�','2017-01-31 13:18:06','2017-01-31 13:18:06'),('Cut & Sew','@q½ææ~\�','2017-01-29 16:06:41','2017-01-29 16:06:41'),('Cut & Sew','2W��\��\�۹zv3]\�','2017-01-31 13:21:19','2017-01-31 13:21:19'),('Cut & Sew','ÚÁòßæ}æ','2017-01-29 15:50:35','2017-01-29 15:50:35'),('Die Casting','ÚÁòßæ}æ','2017-01-29 15:50:35','2017-01-29 15:50:35'),('Injection Molding','@q½ææ~\�','2017-01-29 16:06:41','2017-01-29 16:06:41'),('Printing','2W��\��\�۹zv3]\�','2017-01-31 13:21:19','2017-01-31 13:21:19'),('Printing','�\'��\��\�۹zv3]\�','2017-01-31 13:18:06','2017-01-31 13:18:06');
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
  `company` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
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
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `labor_costs`
--

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

-- Dump completed on 2017-01-31 22:37:57
