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
INSERT INTO `offers` VALUES (0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','5	\Ý\แ\ฤ\ๆH+4ซ\"','}฿“ท\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','5	\Ý\แ\ฤ\ๆH+4ซ\"','}฿•\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','5	\Ý\แ\ฤ\ๆH+4ซ\"','}฿–e\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','5	\Ý\แ\ฤ\ๆH+4ซ\"','}฿—\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','5	\Ý\แ\ฤ\ๆH+4ซ\"','}฿—\ฺ\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,4000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿\Ý\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,4000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿?\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,5000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿3\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,5000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿ÿ\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,5000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿\ห\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,9000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ร\ำ$ฆ\แต\ๆH+4ซ\"','}฿”\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,9000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ุgฃจ\แต\ๆH+4ซ\"','}฿‘l\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ุgฃจ\แต\ๆH+4ซ\"','}฿’(\แ\ฤ\ๆH+4ซ\"'),(0,NULL,NULL,NULL,6000.00,'2017-01-23 15:36:29','2017-01-23 15:36:29','\ุgฃจ\แต\ๆH+4ซ\"','}฿’๚\แ\ฤ\ๆH+4ซ\"');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-23 18:16:30
