-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
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
INSERT INTO `users` VALUES ('bnn\‚õ\Êì]3Wâ\\/',1,'tkw molding gmbh ','Dummy','0@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bs†\‚õ\Êì]3Wâ\\/',1,'none','Dummy','1@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bt\Í\‚õ\Êì]3Wâ\\/',1,'hi-p poland','Dummy','2@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bv \‚õ\Êì]3Wâ\\/',1,'pai shing','Dummy','3@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bwL\‚õ\Êì]3Wâ\\/',1,'good mark','Dummy','4@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bxÇ\‚õ\Êì]3Wâ\\/',1,'hi-p(xm)','Dummy','5@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('by\÷\‚õ\Êì]3Wâ\\/',1,'yineng','Dummy','6@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('b{\‚õ\Êì]3Wâ\\/',1,'ka shui metal co.ltd.','Dummy','7@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('b|8\‚õ\Êì]3Wâ\\/',1,'flextronics sales & marketing (a-p) ltd.','Dummy','8@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('b}Z\‚õ\Êì]3Wâ\\/',1,'best precision co','Dummy','9@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('b~ê\‚õ\Êì]3Wâ\\/',1,'flex','Dummy','10@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('b\∆\‚õ\Êì]3Wâ\\/',1,'dynacast(dongguan)ltd','Dummy','11@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bÄÚ\‚õ\Êì]3Wâ\\/',1,'ka shui metal co. ltd.','Dummy','12@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('bÇñ\‚õ\Êì]3Wâ\\/',1,'shenzhen changhong technology co., ltd.','Dummy','13@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:10:28','2017-01-24 17:10:28'),('\ÁKr|\‚ö\Êì]3Wâ\\/',1,'Dummy','Dummy','dummy@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NULL,'2017-01-24 17:09:21','2017-01-24 17:09:21'),('\Á\ÂW∫\‡C\ÊÅ˛\Ìrq\ﬁ\nì',0,'Savin Racks','George','george@miranda.com','$2a$10$a6d5tDdAqAgzg29a7Y3fWO6AE3Ph.ioRykSupDs3.NpwpuJwkpLQC',NULL,'2017-01-21 17:41:33','2017-01-21 17:41:33');
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

-- Dump completed on 2017-01-25 21:23:20
