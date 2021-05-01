-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2021 at 02:42 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asadzade`
--

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

CREATE TABLE `coins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dname` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double(15,8) NOT NULL DEFAULT '0.00000000',
  `balance` double(15,8) NOT NULL DEFAULT '0.00000000',
  `slider` tinyint(1) NOT NULL DEFAULT '0',
  `list` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coins`
--

INSERT INTO `coins` (`id`, `name`, `fullname`, `dname`, `price`, `balance`, `slider`, `list`, `status`) VALUES
(1, 'BTC', 'Bitcoin', 'بیت کوین', 56123.34000000, 1.05000000, 1, 1, 1),
(2, 'ETH', 'Ethereum', 'اتریوم', 2742.10000000, 2.00000000, 1, 1, 1),
(3, 'BCH', 'Bitcoin Cash', 'بیت کوین کش', 944.37000000, 5.00000000, 1, 1, 1),
(4, 'DOGE', 'DogeCoin', 'دوج کوین', 0.31600000, 10000.00000000, 1, 1, 1),
(5, 'DASH', 'Dash', 'دش', 313.73000000, 10.00000000, 1, 1, 1),
(6, 'LTC', 'Litecoin', 'لایت کوین', 267.83000000, 15.00000000, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `constans`
--

CREATE TABLE `constans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('home','user','admin','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'home'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `constans`
--

INSERT INTO `constans` (`id`, `key`, `value`, `category`) VALUES
(1, 'title', 'صرافی', 'home'),
(2, 'search', 'دنبال چیزی می‌گردید؟ اینجا پیدا می‌کنید', 'home'),
(3, 'trading', 'تریدینگ هوشمند', 'home'),
(4, 'tradingDesc', 'بصورت اتومات و هوشمند، فقط در سود عالی معاملات خود را انجام دهید!', 'home'),
(5, 'kycTrading', 'سرعت و  شفافیت در معــاملات', 'home'),
(6, 'kycTradingDesc', 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد', 'home'),
(7, 'kycTrading', 'سرعت و شافیت در معاملات', 'home'),
(8, 'kycTradingDesc', 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و ،', 'home'),
(9, 'kycTradingBtn', 'درآمدزایی با ارز دیجیتال را شروع کنید', 'home'),
(10, 'kyc1', 'ثبت‌ نام سریع', 'home'),
(11, 'kyc2', 'انتخاب ارز مورد نظر', 'home'),
(12, 'kyc3', 'احراز هویت برای فروش', 'home'),
(13, 'kyc4', 'درخواست خرید سریع', 'home'),
(14, 'kyc5', 'انجام تراکنش در لحظه', 'home'),
(15, 'kyc6', 'بونوس و هدایا', 'home'),
(16, 'safeTitle', 'امنیت +‌ سرعت', 'home'),
(17, 'safeDesc', 'با کنکوردکس همیشه هوشمندانه و سریع\r\nآنلاین ترید کنید و فرصت‌ها را شکار کنید!', 'home'),
(18, 'safe1', 'خدمات مشاوره و آموزش', 'home'),
(19, 'safe2', 'تخصص، تجربه و اعتبار', 'home'),
(20, 'safe3', 'برند مورد اعتماد کاربران', 'home'),
(21, 'safe4', 'انجام بیش از هزاران تراکنش', 'home'),
(22, 'safe5', 'رضایت مشتریان', 'home'),
(23, 'safe6', 'برند مورد اعتماد کاربران', 'home'),
(24, 'newsTitle', 'اخبار داغ از دنیای ارزهای دیجیتال', 'home');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2021_01_15_100000_create_coins_table', 1),
(2, '2021_01_15_100000_create_login_table', 1),
(3, '2021_01_15_100000_create_temp_user_table', 1),
(4, '2021_01_15_100000_create_users_table', 1),
(5, '2021_01_15_100000_create_constans_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `temp_users`
--

CREATE TABLE `temp_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fa',
  `referral` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `try` tinyint(4) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tell` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` enum('fa','en','ar','tr') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fa',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `constans`
--
ALTER TABLE `constans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temp_users`
--
ALTER TABLE `temp_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_name_unique` (`name`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `constans`
--
ALTER TABLE `constans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `temp_users`
--
ALTER TABLE `temp_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
