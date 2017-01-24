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
INSERT INTO `proposals` VALUES ('5	\›\·\ƒ\ÊÉHê+4´\"',0,'fedoras',2000,'2017-06-14 13:34:10',95112,NULL,NULL,NULL,NULL,'2017-01-23 15:32:30','2017-01-23 15:32:30','≠ú;π\·≥\ÊÉHê+4´\"'),('\√\”$¶\·µ\ÊÉHê+4´\"',0,'fleshlights',101,'2017-02-23 13:34:10',94551,NULL,NULL,NULL,NULL,'2017-01-23 13:49:07','2017-01-23 13:49:07','≠ú;π\·≥\ÊÉHê+4´\"'),('\ÿg£®\·µ\ÊÉHê+4´\"',0,'sex dolls',50,'2017-05-23 13:34:10',95112,NULL,NULL,NULL,NULL,'2017-01-23 13:49:41','2017-01-23 13:49:41','≠ú;π\·≥\ÊÉHê+4´\"');
/*!40000 ALTER TABLE `proposals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-23 18:16:28
