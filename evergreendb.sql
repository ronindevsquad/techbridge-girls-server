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
  `street` varchar(45) NOT NULL,
  `street_ext` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`proposal_id`),
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
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banks` (
  `account` int(11) NOT NULL,
  `routing` int(11) NOT NULL,
  `maker_id` binary(16) NOT NULL DEFAULT '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',
  `supplier_id` binary(16) NOT NULL DEFAULT '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',
  PRIMARY KEY (`maker_id`,`supplier_id`),
  UNIQUE KEY `maker_id_UNIQUE` (`maker_id`),
  UNIQUE KEY `supplier_id_UNIQUE` (`supplier_id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  UNIQUE KEY `routing_UNIQUE` (`routing`),
  KEY `fk_bankaccount_maker1_idx` (`maker_id`),
  KEY `fk_bankaccount_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_bankaccount_maker1` FOREIGN KEY (`maker_id`) REFERENCES `makers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_bankaccount_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `maker_id` binary(16) NOT NULL DEFAULT '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',
  `supplier_id` binary(16) NOT NULL DEFAULT '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`supplier_id`,`maker_id`),
  UNIQUE KEY `maker_id_UNIQUE` (`maker_id`),
  UNIQUE KEY `supplier_id_UNIQUE` (`supplier_id`),
  KEY `fk_creditcards_maker1_idx` (`maker_id`),
  KEY `fk_creditcards_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_creditcards_maker1` FOREIGN KEY (`maker_id`) REFERENCES `makers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_creditcards_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `machine_labor_rates`
--

DROP TABLE IF EXISTS `machine_labor_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machine_labor_rates` (
  `id` binary(16) NOT NULL,
  `offer_id` binary(16) NOT NULL,
  `name` varchar(45) NOT NULL,
  `cycle_time` varchar(45) NOT NULL,
  `yield` varchar(45) NOT NULL,
  `machine_laborrate` varchar(45) NOT NULL,
  `laborer` varchar(45) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`offer_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_machine_labor_offer1_idx` (`offer_id`),
  CONSTRAINT `fk_machine_labor_offer1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_labor_rates`
--

LOCK TABLES `machine_labor_rates` WRITE;
/*!40000 ALTER TABLE `machine_labor_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `machine_labor_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `makers`
--

DROP TABLE IF EXISTS `makers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `makers` (
  `id` binary(16) NOT NULL,
  `company` varchar(45) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makers`
--

LOCK TABLES `makers` WRITE;
/*!40000 ALTER TABLE `makers` DISABLE KEYS */;
/*!40000 ALTER TABLE `makers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `id` binary(16) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `cost` decimal(12,2) NOT NULL,
  `unit_cost` decimal(12,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `offer_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`,`offer_id`),
  KEY `fk_raw_material_offer1_idx` (`offer_id`),
  CONSTRAINT `fk_raw_material_offer1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `message_supplier` varchar(45) DEFAULT NULL,
  `pdf_attach_s` varchar(45) DEFAULT NULL,
  `jpg_attach_m` varchar(45) DEFAULT NULL,
  `message_maker` varchar(45) DEFAULT NULL,
  `pdf_attach_m` varchar(45) DEFAULT NULL,
  `jpg_attach_s` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `supplier_id` binary(16) DEFAULT NULL,
  `maker_id` binary(16) DEFAULT NULL,
  `proposal_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_message_supplier1_idx` (`supplier_id`),
  KEY `fk_message_maker1_idx` (`maker_id`),
  KEY `fk_message_proposals1_idx` (`proposal_id`),
  CONSTRAINT `fk_message_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_maker1` FOREIGN KEY (`maker_id`) REFERENCES `makers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `id` binary(16) NOT NULL,
  `sga` varchar(45) DEFAULT NULL,
  `profit` decimal(12,2) NOT NULL,
  `overhead` decimal(12,2) NOT NULL,
  `service` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `proposal_id` binary(16) NOT NULL,
  `supplier_id` binary(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`,`proposal_id`,`supplier_id`),
  KEY `fk_offer_proposals1_idx` (`proposal_id`),
  KEY `fk_offer_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_offer_proposals1` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`process`),
  UNIQUE KEY `process_UNIQUE` (`process`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes_has_suppliers`
--

DROP TABLE IF EXISTS `processes_has_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes_has_suppliers` (
  `supplier_id` binary(16) NOT NULL,
  `processes_process` varchar(45) NOT NULL,
  PRIMARY KEY (`supplier_id`,`processes_process`),
  KEY `fk_processes_has_supplier_supplier1_idx` (`supplier_id`),
  KEY `fk_processes_has_suppliers_processes1_idx` (`processes_process`),
  CONSTRAINT `fk_processes_has_supplier_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_processes_has_suppliers_processes1` FOREIGN KEY (`processes_process`) REFERENCES `processes` (`process`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes_has_suppliers`
--

LOCK TABLES `processes_has_suppliers` WRITE;
/*!40000 ALTER TABLE `processes_has_suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `processes_has_suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposals`
--

DROP TABLE IF EXISTS `proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposals` (
  `id` binary(16) NOT NULL,
  `item` varchar(45) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `completion` datetime NOT NULL,
  `attachment` varchar(45) DEFAULT NULL,
  `nda` varchar(45) DEFAULT NULL,
  `maker_id` binary(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_proposals_maker1_idx` (`maker_id`),
  CONSTRAINT `fk_proposals_maker1` FOREIGN KEY (`maker_id`) REFERENCES `makers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `input` varchar(45) NOT NULL,
  `output` varchar(45) NOT NULL,
  `shipping` varchar(45) NOT NULL,
  `note` varchar(255) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_at` varchar(45) NOT NULL,
  `supplier_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`,`supplier_id`),
  KEY `fk_daily_prod_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_daily_prod_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `reports_has_materials`
--

DROP TABLE IF EXISTS `reports_has_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports_has_materials` (
  `report_id` binary(16) NOT NULL,
  `material_id` binary(16) NOT NULL,
  PRIMARY KEY (`report_id`,`material_id`),
  KEY `fk_daily_prod_has_raw_material_raw_material1_idx` (`material_id`),
  KEY `fk_daily_prod_has_raw_material_daily_prod1_idx` (`report_id`),
  CONSTRAINT `fk_daily_prod_has_raw_material_daily_prod1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_daily_prod_has_raw_material_raw_material1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports_has_materials`
--

LOCK TABLES `reports_has_materials` WRITE;
/*!40000 ALTER TABLE `reports_has_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports_has_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` binary(16) NOT NULL,
  `company` varchar(45) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (';¡·°\Ò6\æ‘[ H\Â|2','hjk','hk','jkja@ia.cs','$2a$10$8EPsei0fuVnQXmFCPNlyseK3cAHuKC1UiBcsWuxFKPgy/7Piqh1T6',NULL,'2017-01-03 20:24:30','2017-01-03 20:24:30'),('g?E\Ò5\æ‘[ H\Â|2','Coding Dojo','Philip Vo','philiptranbavo@gmail.com','$2a$10$Ov3nEtNrEWSrHvOyPZYnjOK2zRSNDR1COFClXYvF9ymGBqUhj7k7G',NULL,'2017-01-03 20:18:34','2017-01-03 20:18:34'),('pdJú\Ò6\æ‘[ H\Â|2','mnjk','njk','kl@as.c','$2a$10$MprfvxfuFkDsmg5WAweWJe3fxfBylYuPc1/fAxrQmiTCmticS/Wp6',NULL,'2017-01-03 20:25:59','2017-01-03 20:25:59'),('’‚,ñ\Ò5\æ‘[ H\Â|2','Apply','Steve Jobs','steve@jobs.com','$2a$10$CycikiZJLnTOCiTAWIrzn.NZkqKotnfKH8lf6yibmf9lhRLw9NAGm',NULL,'2017-01-03 20:19:47','2017-01-03 20:19:47'),('Àx†\Ò6\æ‘[ H\Â|2','supplier','supp','as@sa.cp','$2a$10$drOOKUIsf3IBDV19uk3BiOAUMKzxwuqMeJ72eVrphjLRPmXjMOike',NULL,'2017-01-03 20:28:13','2017-01-03 20:28:13'),('öÁË˜\Ò7\æ‘[ H\Â|2','mkl','nljk','nlk@mlk.co','$2a$10$hTwIz1SoFxjdNICkCLeZgergKu43IWmJav8es7wsusFqAO2o1s0aO',NULL,'2017-01-03 20:36:54','2017-01-03 20:36:54');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
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
  `supplier_id` binary(16) DEFAULT NULL,
  `maker_id` binary(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  UNIQUE KEY `supplier_id_UNIQUE` (`supplier_id`),
  UNIQUE KEY `maker_id_UNIQUE` (`maker_id`),
  KEY `fk_urls_suppliers1_idx` (`supplier_id`),
  KEY `fk_urls_makers1_idx` (`maker_id`),
  CONSTRAINT `fk_urls_suppliers1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_urls_makers1` FOREIGN KEY (`maker_id`) REFERENCES `makers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urls`
--

LOCK TABLES `urls` WRITE;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-04 15:16:37
