-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-06-23 14:53:31
-- 伺服器版本: 5.6.26
-- PHP 版本： 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `tdt_news`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cluster_tag`
--

CREATE TABLE IF NOT EXISTS `cluster_tag` (
  `fakeId` int(11) NOT NULL,
  `cluster_id` int(11) NOT NULL,
  `tag` varchar(1000) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `cluster_tag`
--

INSERT INTO `cluster_tag` (`fakeId`, `cluster_id`, `tag`) VALUES
(1, 1, '蔡英文'),
(2, 1, '當選'),
(3, 2, '蔡英文'),
(4, 2, '寵物'),
(5, 3, '林書豪'),
(6, 4, '林書豪'),
(7, 4, '籃球'),
(8, 4, '蔡英文'),
(9, 3, '寵物');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `content` mediumtext CHARACTER SET utf8,
  `summary` mediumtext CHARACTER SET utf8 NOT NULL,
  `cluster_id` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `summary`, `cluster_id`, `time`) VALUES
(1, '蔡英文當選', '當選了\r\n當選當選了\r\n當選當選了\r\n當選當選了\r\n當選當選了\r\n當選', '', 1, '2016-06-21 00:00:00'),
(2, '蔡英文養寵物', '養寵物 寵物覺得被養\r\n                                                                                       好癢', '', 2, '2016-06-11 00:00:00'),
(3, '林書豪想養寵物', '他有錢\r\n他想養寵物\r\nㄏ他有錢\r\n他想養寵物\r\nㄏ他有錢\r\n他想養寵物\r\nㄏ他有錢\r\n他想養寵物\r\nㄏ', '', 3, '2016-06-01 00:00:00'),
(4, '林書豪跟蔡英文打籃球', '書豪愛打籃球\r\n打籃球很棒\r\n真的很棒書豪愛打籃球\r\n打籃球很棒\r\n真的很棒書豪愛打籃球\r\n打籃球很棒\r\n真的很棒', '', 4, '2016-06-14 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `tag_news_count`
--

CREATE TABLE IF NOT EXISTS `tag_news_count` (
  `fake_id` int(11) NOT NULL,
  `tag` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `tag_news_count`
--

INSERT INTO `tag_news_count` (`fake_id`, `tag`, `count`) VALUES
(2, '蔡英文', 1000),
(3, '林書豪', 800),
(4, '寵物', 500),
(5, '寵物', 500);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `cluster_tag`
--
ALTER TABLE `cluster_tag`
  ADD PRIMARY KEY (`fakeId`),
  ADD KEY `cid` (`cluster_id`),
  ADD KEY `tag` (`tag`(255));

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cid` (`cluster_id`);

--
-- 資料表索引 `tag_news_count`
--
ALTER TABLE `tag_news_count`
  ADD PRIMARY KEY (`fake_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `cluster_tag`
--
ALTER TABLE `cluster_tag`
  MODIFY `fakeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- 使用資料表 AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- 使用資料表 AUTO_INCREMENT `tag_news_count`
--
ALTER TABLE `tag_news_count`
  MODIFY `fake_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
