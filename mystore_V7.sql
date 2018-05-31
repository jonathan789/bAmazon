-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: mystore_db
-- ------------------------------------------------------
-- Server version	8.0.11

DROP DATABASE IF EXISTS mystore_db;

CREATE database mystore_db;

USE mystore_db;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) DEFAULT NULL,
  `over_head_costs` varchar(100) DEFAULT NULL,
  `product_sales` int(11) DEFAULT NULL,
  `department_sales` int(11) DEFAULT NULL,
  `orders_by_department` int(11) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `orders_by_department_UNIQUE` (`orders_by_department`),
  CONSTRAINT `orders_by_department` FOREIGN KEY (`orders_by_department`) REFERENCES `orders` (`orders_by_department`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Snacks','500',1143,1143,NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `order_num` int(11) NOT NULL AUTO_INCREMENT,
  `order_prod_id` int(11) NOT NULL,
  `shipping` decimal(19,2) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `orders_by_department` int(11) DEFAULT NULL,
  `order_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_num`),
  UNIQUE KEY `orders_by_department_UNIQUE` (`orders_by_department`),
  KEY `item_id_idx` (`order_prod_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`order_prod_id`) REFERENCES `products` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (134,1,8.95,'Snacks','2018-05-29 14:51:55',NULL,4),(135,8,9.95,'Snacks','2018-05-29 14:53:25',NULL,4),(136,5,9.95,'Tools','2018-05-29 14:53:50',NULL,100),(137,8,9.95,'Snacks','2018-05-29 15:04:43',NULL,1),(138,1,8.95,'Snacks','2018-05-29 15:10:05',NULL,100),(139,8,9.95,'Snacks','2018-05-29 15:12:59',NULL,10),(140,1,8.95,'Snacks','2018-05-29 15:17:23',NULL,4),(141,1,8.95,'Snacks','2018-05-29 15:20:23',NULL,124),(142,6,9.95,'Tools','2018-05-29 15:22:05',NULL,460),(143,6,9.95,'Tools','2018-05-29 15:23:19',NULL,5);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `product_sales` int(11) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `shipping` decimal(19,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `wholesale_cost` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Snickers',350,'Snacks',10.00,3.50,3,4.00),(2,'Milky Way',400,'Snacks',12,3.50,5,5.00),(3,'Drill',110,'Tools',35.00,5.95,50,13.00),(4,'Hammer',75,'Tools',20.00,4.95,10,8.00),(5,'Warm socks',40,'Clothing',10.95,4.95,50,3.95),(6,'T-Shirt',50,'Clothing',15.95,4.95,94,7.95);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-29 21:31:42
