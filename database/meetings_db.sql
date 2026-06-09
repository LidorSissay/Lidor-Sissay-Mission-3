-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 09, 2026 at 08:49 AM
-- Server version: 9.6.0
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meetings_db`
--
CREATE DATABASE IF NOT EXISTS `meetings_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `meetings_db`;

-- --------------------------------------------------------

--
-- Table structure for table `development_teams`
--

CREATE TABLE `development_teams` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `development_teams`
--

INSERT INTO `development_teams` (`id`, `name`, `created_at`, `updated_at`) VALUES
('4a648e1d-63ce-11f1-bacb-6e490d87d80d', 'Team React', '2026-06-09 06:40:12', '2026-06-09 06:40:12'),
('4a64bba2-63ce-11f1-bacb-6e490d87d80d', 'Team Mobile', '2026-06-09 06:40:12', '2026-06-09 06:40:12'),
('4a64cb17-63ce-11f1-bacb-6e490d87d80d', 'Team UI', '2026-06-09 06:40:12', '2026-06-09 06:40:12');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `development_team_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime NOT NULL,
  `description` text NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `development_team_id`, `start_date_time`, `end_date_time`, `description`, `room_name`, `created_at`, `updated_at`) VALUES
('5a7d4872-488c-45d6-92a7-8ad37730dbbd', '4a648e1d-63ce-11f1-bacb-6e490d87d80d', '2026-06-10 07:00:00', '2026-06-10 08:30:00', 'Sprint planning', 'Blue Room', '2026-06-09 08:00:51', '2026-06-09 08:00:51'),
('cea1abf4-edde-4f33-9e1d-f5bbcecae3aa', '4a648e1d-63ce-11f1-bacb-6e490d87d80d', '2026-06-11 05:24:00', '2026-06-11 06:16:00', 'Karaoke KARAHANA', 'ROOM101FROM984', '2026-06-09 08:29:39', '2026-06-09 08:30:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `development_teams`
--
ALTER TABLE `development_teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `development_team_id` (`development_team_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`development_team_id`) REFERENCES `development_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
