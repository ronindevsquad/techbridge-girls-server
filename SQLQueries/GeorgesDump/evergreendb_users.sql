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
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('}ﬂá\›\·\ƒ\ÊÉHê+4´\"',1,'tkw molding gmbh ','Dummy','0@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂç?\·\ƒ\ÊÉHê+4´\"',1,'none','Dummy','1@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂé3\·\ƒ\ÊÉHê+4´\"',1,'hi-p poland','Dummy','2@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂéˇ\·\ƒ\ÊÉHê+4´\"',1,'pai shing','Dummy','3@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂè\À\·\ƒ\ÊÉHê+4´\"',1,'good mark','Dummy','4@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂêî\·\ƒ\ÊÉHê+4´\"',1,'hi-p(xm)','Dummy','5@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂël\·\ƒ\ÊÉHê+4´\"',1,'yineng','Dummy','6@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂí(\·\ƒ\ÊÉHê+4´\"',1,'ka shui metal co.ltd.','Dummy','7@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂí˙\·\ƒ\ÊÉHê+4´\"',1,'flextronics sales & marketing (a-p) ltd.','Dummy','8@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂì∑\·\ƒ\ÊÉHê+4´\"',1,'best precision co','Dummy','9@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂïú\·\ƒ\ÊÉHê+4´\"',1,'flex','Dummy','10@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂñe\·\ƒ\ÊÉHê+4´\"',1,'dynacast(dongguan)ltd','Dummy','11@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂó\·\ƒ\ÊÉHê+4´\"',1,'ka shui metal co. ltd.','Dummy','12@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('}ﬂó\⁄\·\ƒ\ÊÉHê+4´\"',1,'shenzhen changhong technology co., ltd.','Dummy','13@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-23 15:34:32','2017-01-23 15:34:32'),('≠ú;π\·≥\ÊÉHê+4´\"',0,'Savin Racks','George','george@miranda.com','$2a$10$s3Obd9w.kMFotLUb6gEdsuOG/8YKkry85NIwKVt7am.zamISl/Wkq',NULL,'2017-01-23 13:34:10','2017-01-23 13:34:10'),('ÒàR2\·≥\ÊÉHê+4´\"',1,'Make Racks','Dummy','dummy@dummy.com','$2a$10$OJzNp6VpKylIRl.A/BQsVOkTUHcSY.ms.vrtOKi/GwpmEPVRjJkMC',NULL,'2017-01-23 13:36:04','2017-01-23 13:36:04');
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

-- Dump completed on 2017-01-23 18:16:27
