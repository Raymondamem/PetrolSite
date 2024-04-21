-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 08:43 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petrol_site_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `_id` int(11) NOT NULL,
  `_amount` decimal(10,2) DEFAULT NULL,
  `_litre` decimal(10,2) DEFAULT NULL,
  `_userid` varchar(255) DEFAULT NULL,
  `_createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`_id`, `_amount`, `_litre`, `_userid`, `_createdat`) VALUES
(1, '1000.00', '2.86', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:27:50'),
(2, '433.00', '1.24', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:34:38'),
(3, '344.00', '0.98', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:34:42'),
(4, '1112.00', '3.18', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:35:26'),
(5, '454.00', '1.30', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:35:35'),
(6, '5656.00', '16.16', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:35:38'),
(7, '43543.00', '124.41', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:35:47'),
(8, '5465.00', '15.61', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-04-21 18:35:57'),
(9, '5465.00', '15.61', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-05-21 18:38:18'),
(10, '344.00', '0.98', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-05-21 18:38:25'),
(11, '1000.00', '2.86', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-05-21 18:38:31'),
(12, '1112.00', '3.18', '637c94c9-6fd8-4930-b326-17c6d474f449', '2024-05-21 18:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` varchar(255) NOT NULL,
  `_name` varchar(255) DEFAULT NULL,
  `_email` varchar(255) DEFAULT NULL,
  `_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`_id`, `_name`, `_email`, `_password`) VALUES
('637c94c9-6fd8-4930-b326-17c6d474f449', 'Raymond Aondoakura Amem', 'raymondamem525@gmail.com', '$2a$10$5CmlMQdd0UVeq1DBvacOPueqw7Q6cHag7rlT4bR30ZOlKdlM3lowa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `_userid` (`_userid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`_userid`) REFERENCES `user` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
