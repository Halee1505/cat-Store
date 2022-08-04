-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 28, 2022 lúc 11:38 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `cat_store`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `name`) VALUES
(6, 'linh.nguyen1505@gmail.com', '', 'aa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL,
  `ad1` text DEFAULT NULL,
  `ad2` text DEFAULT NULL,
  `ad3` text DEFAULT NULL,
  `ad4` text DEFAULT NULL,
  `ad5` text DEFAULT NULL,
  `discount` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `advertisement`
--

INSERT INTO `advertisement` (`id`, `ad1`, `ad2`, `ad3`, `ad4`, `ad5`, `discount`) VALUES
(1, 'http://res.cloudinary.com/vitamim/image/upload/v1658302436/vitamim/xhfqwog83tlg18bfgmjk.jpg', 'http://res.cloudinary.com/vitamim/image/upload/v1658302529/vitamim/xf4edznyztv3rqgq1c0i.jpg', 'http://res.cloudinary.com/vitamim/image/upload/v1658302529/vitamim/scp0a5mkkrjlxa46edit.jpg', 'http://res.cloudinary.com/vitamim/image/upload/v1658302530/vitamim/v5jqdnqwktgjyzv6eyub.jpg', 'http://res.cloudinary.com/vitamim/image/upload/v1658302529/vitamim/uzbpvvwwoza8ou8yromc.jpg', 'http://res.cloudinary.com/vitamim/image/upload/v1658302268/vitamim/mkcjr2uigzlcssonw84i.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalog`
--

CREATE TABLE `catalog` (
  `id` int(11) NOT NULL,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `catalog`
--

INSERT INTO `catalog` (`id`, `name`) VALUES
(43, 'Giày'),
(42, 'Quần'),
(41, 'Áo'),
(44, 'Túi'),
(46, 'Ốp điện thoại'),
(47, 'Phụ kiện');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messenger`
--

CREATE TABLE `messenger` (
  `id` int(11) NOT NULL,
  `user_id` text NOT NULL,
  `to_id` text NOT NULL,
  `from_id` text NOT NULL,
  `message` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `messenger`
--

INSERT INTO `messenger` (`id`, `user_id`, `to_id`, `from_id`, `message`, `date_created`) VALUES
(5, '38', 'admin', '38', 'meow meow', '2022-07-25 00:00:00'),
(6, '38', 'admin', '38', 'asasas', '2022-07-25 00:00:00'),
(8, '38', '38', 'admin', 'Xin chào bạn', '2022-07-25 00:00:00'),
(9, '38', '38', 'admin', 'Bạn cần giúp gì ạ', '2022-07-25 00:00:00'),
(10, '38', 'admin', '38', 'à không bạn', '2022-07-25 00:00:00'),
(14, '38', 'admin', '38', 'đấm nhau k', '2022-07-25 00:00:00'),
(15, '38', '38', 'admin', 'không :)))', '2022-07-25 00:00:00'),
(32, '38', '38', 'admin', 'dasda', '2022-07-25 00:00:00'),
(38, '38', 'admin', '38', 'lô', '2022-07-25 00:00:00'),
(39, '38', '38', 'admin', 'lô', '2022-07-25 00:00:00'),
(40, '38', 'admin', '38', 'lôa', '2022-07-25 00:00:00'),
(41, '38', '38', 'admin', 'lôaa', '2022-07-25 00:00:00'),
(42, '38', 'admin', '38', 'lôaấ', '2022-07-25 00:00:00'),
(43, '38', '38', 'admin', 'qq', '2022-07-25 00:00:00'),
(45, '38', 'admin', '38', 'đấ', '2022-07-25 00:00:00'),
(212, '30', 'admin', '30', '1', '2022-07-26 14:52:05'),
(213, '30', 'admin', '30', '2', '2022-07-26 14:52:06'),
(214, '30', 'admin', '30', '3', '2022-07-26 14:52:06'),
(215, '30', 'admin', '30', '4', '2022-07-26 14:52:07'),
(216, '30', 'admin', '30', '5', '2022-07-26 14:52:08'),
(217, '30', 'admin', '30', '6', '2022-07-26 14:52:09'),
(218, '30', 'admin', '30', '7', '2022-07-26 14:52:10'),
(219, '30', 'admin', '30', '8', '2022-07-26 14:52:10'),
(220, '30', 'admin', '30', '9', '2022-07-26 14:52:11'),
(221, '30', 'admin', '30', '0', '2022-07-26 14:52:12'),
(222, '30', '30', 'admin', '0', '2022-07-26 14:52:32'),
(223, '30', '30', 'admin', '9', '2022-07-26 14:52:32'),
(224, '30', '30', 'admin', '8', '2022-07-26 14:52:33'),
(225, '30', '30', 'admin', '7', '2022-07-26 14:52:33'),
(226, '30', '30', 'admin', '6', '2022-07-26 14:52:33'),
(227, '30', '30', 'admin', '5', '2022-07-26 14:52:33'),
(228, '30', '30', 'admin', '4', '2022-07-26 14:52:34'),
(229, '30', '30', 'admin', '3', '2022-07-26 14:52:34'),
(230, '30', '30', 'admin', '2', '2022-07-26 14:52:34'),
(231, '30', '30', 'admin', '1', '2022-07-26 14:52:35'),
(232, '30', '30', 'admin', 'fgfg\\', '2022-07-26 14:53:06'),
(233, '30', 'admin', '30', 'd', '2022-07-26 16:18:50'),
(234, '30', 'admin', '30', 'â', '2022-07-26 16:26:30'),
(235, '30', 'admin', '30', 'ds', '2022-07-26 16:26:36'),
(236, '30', 'admin', '30', 'đ', '2022-07-26 16:26:40'),
(237, '30', 'admin', '30', 'â', '2022-07-26 16:26:42'),
(238, '30', 'admin', '30', 'd', '2022-07-26 16:26:52'),
(239, '30', 'admin', '30', 'chó', '2022-07-26 16:26:55'),
(240, '30', '30', 'admin', 'á', '2022-07-26 16:27:42'),
(241, '30', 'admin', '30', 'a', '2022-07-26 16:30:44'),
(242, '30', '30', 'admin', 'á', '2022-07-26 16:30:49'),
(243, '30', '30', 'admin', 'sa', '2022-07-26 16:30:52'),
(244, '30', 'admin', '30', 'a', '2022-07-26 16:34:40'),
(245, '30', 'admin', '30', 'sadadasdadasasd', '2022-07-26 16:38:28'),
(246, '30', 'admin', '30', 'a', '2022-07-26 16:38:30'),
(247, '30', 'admin', '30', 'a', '2022-07-26 16:39:25'),
(252, '30', 'admin', '30', 'á', '2022-07-27 16:56:21'),
(253, '30', 'admin', '30', 'as', '2022-07-27 16:56:33'),
(254, '30', 'admin', '30', 'âs', '2022-07-27 16:56:48'),
(255, '30', 'admin', '30', 'as', '2022-07-27 16:56:51'),
(256, '30', 'admin', '30', 'sasa', '2022-07-27 16:56:53'),
(257, '30', 'admin', '30', 'âs', '2022-07-27 16:56:55'),
(258, '30', 'admin', '30', 'âsasa', '2022-07-27 16:56:59'),
(259, '30', 'admin', '30', 'âs', '2022-07-27 16:57:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(255) NOT NULL,
  `classify_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `amount` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `transaction_id` int(255) DEFAULT NULL,
  `status` text COLLATE utf8_bin NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `classify_id`, `qty`, `amount`, `transaction_id`, `status`) VALUES
(8, 38, 69, 46, 1, '10000.0000', NULL, 'pending'),
(7, 38, 71, 48, 1, '10000.0000', NULL, 'pending'),
(9, 38, 70, 47, 2, '2.0000', NULL, 'pending'),
(10, 38, 74, 54, 3, '3000000.0000', NULL, 'pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(255) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `gender` text COLLATE utf8_unicode_ci NOT NULL,
  `discount` int(11) DEFAULT 0,
  `description` text COLLATE utf8_unicode_ci NOT NULL DEFAULT 'No description !!!',
  `created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `catalog_id`, `name`, `price`, `gender`, `discount`, `description`, `created`) VALUES
(72, 47, 'Bạn gái akatsuki 4', '100000.0000', 'Male', NULL, '', '2022-07-20'),
(71, 47, 'Bạn gái akatsuki 3', '10000.0000', 'Male', NULL, '', '2022-07-20'),
(70, 47, 'bạn trai akatsuki', '1.0000', 'Female', NULL, '', '2022-07-20'),
(69, 47, 'Bạn gái akatsuki 2', '10000.0000', 'Male', NULL, '', '2022-07-20'),
(68, 47, 'Bạn gái akatsuki', '1000.0000', 'Male', NULL, '', '2022-07-20'),
(67, 41, 'Áo akatsuki 4', '200.0000', 'Unisex', NULL, '', '2022-07-20'),
(66, 41, 'Áo akatsuki 3', '0.0000', 'Unisex', NULL, '', '2022-07-20'),
(65, 41, 'Áo akatsuki 2', '200.0000', 'Unisex', NULL, '', '2022-07-20'),
(64, 41, 'Áo akatsuki 1', '200.0000', 'Unisex', NULL, '', '2022-07-20'),
(63, 46, 'Ốp điện thoại m3', '100.0000', 'Unisex', NULL, '', '2022-07-20'),
(62, 46, 'Ốp điện thoại m2', '100.0000', 'Unisex', NULL, '', '2022-07-20'),
(61, 46, 'Ốp điện thoại m1', '100.0000', 'Unisex', NULL, '', '2022-07-20'),
(60, 41, 'Áo Wibu', '12.0000', 'Male', NULL, 'Wibu never die', '2022-07-20'),
(73, 47, 'Idol coslay', '10.0000', 'Male', NULL, 'No description!!!', '2022-07-21'),
(74, 47, 'Bạn gái idol', '1000000.0000', 'Male', NULL, 'Nếu là một fan của bộ truyện Naruto, chắc hẳn cái tên tổ chức Akatsuki đã không còn quá xa lạ với tất cả mọi người. Là một nhóm quy tụ toàn những thành viên có các năng lực đặc biệt, có mục đích là truy lùng, bắt giữ các vĩ thú để thực hiện cho một âm mưu đen tối, Akatsuki dường như không mang lại cái nhìn quá tốt đẹp dành cho đông đảo các fan của manga. Và khi bộ truyện Naruto khép lại, tên của tổ chức này cũng dần chìm vào quên lãng. Nhưng mới đây thôi, một cô nàng hot girl đã bất ngờ khiến cho từ khóa \'Akatsuki\' trở nên hot hơn bao giờ hết, nhờ vào bộ cosplay siêu gợi cảm của mình.\n', '2022-07-21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` text NOT NULL,
  `color` text NOT NULL,
  `link_img` text NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `size`
--

INSERT INTO `size` (`id`, `product_id`, `size`, `color`, `link_img`, `count`) VALUES
(33, 57, 'x', '#ff0000', 'http://res.cloudinary.com/vitamim/image/upload/v1658289732/vitamim/lpvstc1lwbwdihzamlxd.jpg', 3),
(34, 57, 's', '#00ff40', 'http://res.cloudinary.com/vitamim/image/upload/v1658289732/vitamim/sswsrrhmaagyry1rjaud.jpg', 3),
(35, 57, 'm', '#eeff00', 'http://res.cloudinary.com/vitamim/image/upload/v1658289732/vitamim/mnnvhertsl8up35lzdxn.jpg', 3),
(36, 60, 'x', '#ff0000', 'http://res.cloudinary.com/vitamim/image/upload/v1658291528/vitamim/dwv3jzd5tcmfmjkjid5s.jpg', 4),
(37, 60, 'l', '#66ff00', 'http://res.cloudinary.com/vitamim/image/upload/v1658291528/vitamim/mpn2idgn7ohlaqoy0rfc.webp', 2),
(38, 61, '', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304017/vitamim/hsdfbwnz5zmqvmshzz0v.jpg', 10),
(39, 62, '', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304063/vitamim/cqrpokspiagoiqxzwe8f.jpg', 10),
(40, 63, '', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304097/vitamim/rjpayu71k7fivmnkfhvh.jpg', 10),
(41, 64, 'oversize', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304146/vitamim/ewxx65fgiyczejfulfv4.jpg', 100),
(42, 65, 'oversize', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304215/vitamim/jtv1om6dzhxoetuj8eoh.jpg', 10),
(43, 66, 'oversize', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304247/vitamim/xmolxljjz4ajjpcp1ta5.jpg', 10),
(44, 67, 'oversize', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304297/vitamim/bdcrnbq0eultjstlb42n.jpg', 10),
(45, 68, 'oversize', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304361/vitamim/dcidxajcwj7zijmprkqy.jpg', 0),
(46, 69, 'fit size', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304390/vitamim/uax6uxeukc3wwuuizdkx.webp', 1),
(47, 70, 'big size', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304430/vitamim/kmpoqzoh6fdfqdrbd8rc.jpg', 2),
(48, 71, 'fit size', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658304472/vitamim/yoxvufxl0pwuawwqg233.jpg', 1),
(49, 72, 'fit size', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658333559/vitamim/w5sfetunklwo8lekr57p.jpg', 4),
(50, 73, 'fit size', '#000000', 'http://res.cloudinary.com/vitamim/image/upload/v1658387108/vitamim/rems6cda1q8lpct0pt9w.jpg', 1),
(51, 73, 'over size', '#ff0000', 'http://res.cloudinary.com/vitamim/image/upload/v1658387108/vitamim/rjzerotcocrghycf72bn.jpg', 2),
(52, 73, 'big size', '#f3d5af', 'http://res.cloudinary.com/vitamim/image/upload/v1658387108/vitamim/az5f3vwracx2hxwlfqxj.jpg', 3),
(53, 74, 'fit', '#ffffff', 'http://res.cloudinary.com/vitamim/image/upload/v1658395499/vitamim/n5dfvy6downnaiy7khjq.webp', 4),
(54, 74, 'cover', '#8b7f68', 'http://res.cloudinary.com/vitamim/image/upload/v1658395498/vitamim/vhmf9aykd9h7w7tudtre.jpg', 5),
(55, 74, 'big', '#c29b88', 'http://res.cloudinary.com/vitamim/image/upload/v1658395498/vitamim/f13hlfraqcpzdoaoxzoh.jpg', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(50) COLLATE utf8_bin NOT NULL,
  `user_phone` varchar(20) COLLATE utf8_bin NOT NULL,
  `user_address` text COLLATE utf8_bin NOT NULL,
  `amount` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `payment` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `payment_info` text COLLATE utf8_bin NOT NULL,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  `security` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `avatar` text COLLATE utf8_unicode_ci DEFAULT 'https://cdn-icons-png.flaticon.com/512/983/983929.png?w=360',
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `avatar`, `name`, `email`, `phone`, `address`, `password`, `created`) VALUES
(35, 'https://cdn-icons-png.flaticon.com/512/983/983929.png?w=360', NULL, 'asbxaac', NULL, NULL, '123123123', '2022-07-20'),
(38, 'http://res.cloudinary.com/vitamim/image/upload/v1658395216/vitamim/tjoryv0esiqprjq4vuki.webp', 'Linh Nguyễn Hải', 'a', '0395114189', 'thôn 2 xã Liên Lộc-Thủ Đức-Thanh Hóa', '1', '2022-07-20'),
(30, 'http://res.cloudinary.com/vitamim/image/upload/v1658801499/vitamim/neda7kj9s2s4svjfuz0u.webp', 'Linh Version 2', 'linh.nguyen1505@gmail.com', NULL, '--', '1212', '2022-07-19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlist`
--

CREATE TABLE `wishlist` (
  `user_id` int(255) NOT NULL,
  `id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `wishlist`
--

INSERT INTO `wishlist` (`user_id`, `id`, `product_id`) VALUES
(38, 59, 69),
(38, 61, 74);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `messenger`
--
ALTER TABLE `messenger`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `messenger`
--
ALTER TABLE `messenger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=260;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
