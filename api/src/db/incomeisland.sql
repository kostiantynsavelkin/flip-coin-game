/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : incomeisland

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 30/12/2021 06:49:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NULL DEFAULT NULL,
  `property_id` int(10) NULL DEFAULT NULL,
  `pay_price` int(10) NULL DEFAULT NULL,
  `current_value` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES (1, 34, 6, 100, 100);
INSERT INTO `history` VALUES (2, 34, 1, 200, 500);

-- ----------------------------
-- Table structure for property
-- ----------------------------
DROP TABLE IF EXISTS `property`;
CREATE TABLE `property`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `map_size` int(11) NULL DEFAULT NULL,
  `total_plots` int(11) NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  `description` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '0: not allow, 1: allow',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of property
-- ----------------------------
INSERT INTO `property` VALUES (1, 'apartment', 100, 100, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);
INSERT INTO `property` VALUES (2, 'houses', 2, 250, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);
INSERT INTO `property` VALUES (3, 'mansions', 5, 750, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);
INSERT INTO `property` VALUES (4, 'ranches', 12, 1875, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);
INSERT INTO `property` VALUES (5, 'places', 35, 5625, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);
INSERT INTO `property` VALUES (6, 'penthouse', 45, 5625, 950, 0, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1);

-- ----------------------------
-- Table structure for property_image
-- ----------------------------
DROP TABLE IF EXISTS `property_image`;
CREATE TABLE `property_image`  (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `filename` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of property_image
-- ----------------------------
INSERT INTO `property_image` VALUES (0, 0, '');
INSERT INTO `property_image` VALUES (1, 1, '1.png');
INSERT INTO `property_image` VALUES (3, 3, '3.png');
INSERT INTO `property_image` VALUES (4, 4, '4.png');
INSERT INTO `property_image` VALUES (5, 5, '5.png');
INSERT INTO `property_image` VALUES (6, 6, '6.png');
INSERT INTO `property_image` VALUES (7, 1, '3.png');
INSERT INTO `property_image` VALUES (8, 1, '4.png');
INSERT INTO `property_image` VALUES (9, 2, '6.png');
INSERT INTO `property_image` VALUES (10, 2, '2.png');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avartar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `country` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `walletAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isVerified` int(1) NOT NULL,
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `innerwalletaddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `innerprivatekey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Nikola Pavlovic', 'pavlovicn@gmail.com', 0, '$2a$08$ZYK7kTT93PO4lcl10z0kDO/OwoCD/Su1H4sNXhS7XUiYFhiHV2jOK', 'jlCWaXv4AQ.png', 'Aruba', '0x5747a7f258Bd38908A551CE6d76b8C2A428D7586', 1, '966334', '', '', NULL);
INSERT INTO `user` VALUES (6, 'Andrey Ignakento', 'pavlovicn9515@gmail.com', 3, '$2a$08$5VvGN23o2WUKh3Wc9Px3O.pytUlFF.rJSRIHobtgKE0V5IzjHxenu', 'LXL2P2AROV.png', 'Armenia', '0x5747a7f258Bd38908A551CE6d76b8C2A428D7586', 1, '715425', '', '', NULL);
INSERT INTO `user` VALUES (7, 'Wei Duma', 'author@gmail.com', 2, '$2a$08$AIsUGX0aJevVNs8BqJpw9.7T/cEyDgX0jiSqGdUtLGDMsfHetok.G', 'freelancer.png', 'Andorra', 'sb-kskdk7014056@personal.example.com', 0, '866595', '', '', NULL);
INSERT INTO `user` VALUES (8, 'Wang Ling', 'godknight122@gmail.comA', 3, '$2a$08$EZMacPYiKliMbFAVgD5DpOktHDidgkwofTkD5lcVplXMt05PNJeIm', 'S4jvMfclw1.png', 'AD', '0xE044ac9691fa801D7794db48b5A062c7Fb23D297', 1, '631225', '', '', NULL);
INSERT INTO `user` VALUES (9, 'Obama Chiba', 'obama.chiba@gmail.com', 2, '$2a$08$jAn0TRYdAG8GRO726ONmJux/3BIUK0ejhexzniBThIdvHEMpbRFhG', NULL, NULL, '', 0, '972905', '', '', NULL);
INSERT INTO `user` VALUES (12, 'Lena', 'lena@gmail.com', 1, '$2a$08$ZYK7kTT93PO4lcl10z0kDO/OwoCD/Su1H4sNXhS7XUiYFhiHV2jOK', 'J2_m.png', 'United Arab Emirates', '', 0, '', '', '', NULL);
INSERT INTO `user` VALUES (13, 'Lee Ares', 'Agodknight122@gmail.com', 3, '$2a$08$Cd8h/bVMR9IHbqTBcVdSDerNHTQeRGinL1YFoIkJYBVvFtLy5oMfG', NULL, NULL, '', 0, '', '', '', NULL);
INSERT INTO `user` VALUES (14, 'Lee Ares', 'Adodknight122@gmail.com', 3, '$2a$08$YAZPqvXjWb7W95HKuwX.FeSY1L5rMj.AvlWCcvQP2spfFGDlDkGA6', NULL, NULL, '', 0, '', '', '', NULL);
INSERT INTO `user` VALUES (15, 'TT TT', 'test.godknight11222@gmail.com', 3, '$2a$08$DsH3eRGtXL.tuMmV9i20B.Z7OF/DJ8Mun75Q2BY0LXw3wUU7wjZ5W', NULL, NULL, NULL, 1, '140095', '', '', NULL);
INSERT INTO `user` VALUES (17, 'AAAAAAAA AAAAAAAAA', 'goldhunter0905@gmail.com', 3, '$2a$08$.Tla0nKiqXVuZu92pu.OCO98wPfvgifAOYKwvM5MoKzl7ZcC8zSty', NULL, NULL, NULL, 1, '831298', '', '', NULL);
INSERT INTO `user` VALUES (18, 'AAA AAA', 'AAA@gmail.com', 3, '$2a$08$9y8QZ/B8nKXFpas5uNzP7uDF6kAxvuPQQRae9ND09d4GZCNSbIQiO', NULL, NULL, NULL, 0, '501831', '', '', NULL);
INSERT INTO `user` VALUES (19, 'test undefined', 'test@gmail.com', 3, '$2a$08$uT/xib8HHvBnzbUuypoUK.iDhUj//K6iZvIIFnegwO155Lm3rURCi', NULL, NULL, NULL, 0, '853736', '', '', NULL);
INSERT INTO `user` VALUES (20, '123 ', '123@gmail.com', 3, '$2a$08$nn5af4aqdja14P9V0ewbYO0E9mrRFkfz3191BWsFBLfe5kk6fDAsu', NULL, NULL, NULL, 0, '100168', '', '', NULL);
INSERT INTO `user` VALUES (25, 'Phantom Lancer', 'godknight122@gmail.com', 3, '$2a$08$LCqn/aLwvak96QnSeVprh.u2XVWum6zJUX6CLH3DBBF2SLpyMha2e', NULL, NULL, NULL, 1, '466454', '0x2c611084c3bab06702382f0571acac4672045c82', '0xdf4af32239320dd38ef03048650f239f261cec44bd53c13c979d5e646ecd5f74', NULL);
INSERT INTO `user` VALUES (31, 'Jenis Porters', 'dsafuanova15@gmail.com', 1, '$2a$08$Lo5HaIMDB/XF4LGtlK9Wpu/azFLrXaVPv4jfNa.BspjVgi4g9me7m', 'w4JD7POS2l.png', 'United Arab Emirates', '0xE044ac9691fa801D7794db48b5A062c7Fb23D297', 1, '876224', '0x83ff650314dd051488382a363eac7332abd2e3d7', '0x9bf74876e655d428fe52f9082f7ae6771f98bdf48569d8348415a0a9ea63caf9', 'Jenis');
INSERT INTO `user` VALUES (32, 'dsfsadfasdfasdfasdf', 'jlkasdfjlkasdjf@gmail.com', 1, '$2a$08$puUot0V4i8OkSmEXjURFKe8rngEW9xFejWhhgqsmobaXP8nCcxTBq', NULL, NULL, '0x5747a7f258Bd38908A551CE6d76b8C2A428D7586', 1, '', '0x848ea2ce0cbc42ca93c3be5ca07f2e5a88ca4e00', '0x6a6ee15272182422577c1b1673db737ffb558f4f1e78b75afdea220c3ae85f7a', 'asdfasdfasdf');
INSERT INTO `user` VALUES (33, 'lkajsdflkjsdkl', 'dddidkl@gmail.com', 1, '$2a$08$NOtLJxprc/jov/.fLwdSd.SA4gwQirDY.DPSc7MLbYb44HHJvvqx.', NULL, NULL, '0x5747a7f258Bd38908A551CE6d76b8C2A428D7586', 0, '', '0x02c46753a820fe7d0a10465aea2b36b416f5b968', '0x7ce931d72b01c6948fe00b376995ba04573947f0b98254f87a83e51da5541511', 'jkljasdlkfjasdlkf');
INSERT INTO `user` VALUES (34, 'Jain Braim', 'smssfkasfdjlk@gmail.com', 3, '$2a$08$boaLfsyKh8/L0y.C4hph2uKckUzO0x0f6xXkk.HmBF4yZv8pn34GG', 'HqniJorkzH.png', 'Bangladesh', '0x9C3C905433673a36405E5Ca99CF27D08B4D38F6d', 0, '', '0xf91d55ae3dd5303ad5f9cf4acfc4a357acfffd61', '0xdef85b9f039b325d2a661d7eaf9e0dd8a28358929411b93bed42e58b2b48a9a1', 'Jenis');

SET FOREIGN_KEY_CHECKS = 1;
