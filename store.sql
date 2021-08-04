-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 04, 2021 at 05:55 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodetest`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rack`
--

CREATE TABLE `tbl_rack` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `capacity` decimal(10,2) NOT NULL,
  `order_no` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_rack`
--

INSERT INTO `tbl_rack` (`id`, `name`, `capacity`, `order_no`) VALUES
(1, 'R1', '10.00', 3),
(2, 'R2', '20.00', 4),
(3, 'R3', '12.00', 1),
(4, 'R4', '8.00', 2),
(5, 'R5', '20.00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sku`
--

CREATE TABLE `tbl_sku` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `capacity` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_sku`
--

INSERT INTO `tbl_sku` (`id`, `name`, `capacity`) VALUES
(1, 'A', '1.00'),
(2, 'B', '2.00'),
(3, 'C', '0.50'),
(4, 'D', '0.80'),
(5, 'E', '2.50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_storage`
--

CREATE TABLE `tbl_storage` (
  `id` int(11) NOT NULL,
  `rack_id` int(11) NOT NULL,
  `sku_id` int(11) NOT NULL,
  `quantity` int(10) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_rack`
--
ALTER TABLE `tbl_rack`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sku`
--
ALTER TABLE `tbl_sku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_storage`
--
ALTER TABLE `tbl_storage`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_rack`
--
ALTER TABLE `tbl_rack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_sku`
--
ALTER TABLE `tbl_sku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_storage`
--
ALTER TABLE `tbl_storage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
