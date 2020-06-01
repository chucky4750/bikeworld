-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Mai 2020 um 21:01
-- Server-Version: 10.4.11-MariaDB
-- PHP-Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bikeworld`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ausleihe`
--

CREATE TABLE `ausleihe` (
  `PID` int(11) NOT NULL,
  `KID` int(11) NOT NULL,
  `von` date NOT NULL,
  `bis` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `hersteller`
--

CREATE TABLE `hersteller` (
  `hid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `hersteller`
--

INSERT INTO `hersteller` (`hid`, `name`, `web`, `email`) VALUES
(1, 'Bulls', 'https://www.bulls.de/', 'info@bulls.de'),
(2, 'Winora', 'https://www.winora.com/', 'info@winora-group.de'),
(3, 'KTM', 'https://www.ktm-bikes.at/', 'office@ktm-bikes.de'),
(4, 'Tassimo', 'https://www.tassimo.de/', 'Consumerservice.DACH@jdecoffee.com'),
(5, 'Expressi', 'https://www.mein-expressi.de/', 'expressi-support@expressi.de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `istteilvon`
--

CREATE TABLE `istteilvon` (
  `PID` int(11) NOT NULL,
  `PID_comp2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `is_taken`
--

CREATE TABLE `is_taken` (
  `PID` int(11) NOT NULL,
  `von` date NOT NULL,
  `bis` date NOT NULL,
  `booked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `is_taken`
--

INSERT INTO `is_taken` (`PID`, `von`, `bis`, `booked`) VALUES
(10, '2020-05-29', '2020-05-29', 0),
(10, '2020-05-29', '2020-05-29', 0),
(13, '2020-05-25', '2020-05-28', 0),
(0, '0000-00-00', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kategorie`
--

CREATE TABLE `kategorie` (
  `katid` bigint(20) NOT NULL,
  `beschreibung` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `kategorie`
--

INSERT INTO `kategorie` (`katid`, `beschreibung`) VALUES
(1, 'Mountainbike (MTB)'),
(2, 'Trekking'),
(3, 'Crossrad'),
(4, 'E-MTB'),
(5, 'E-Trekking'),
(6, 'E-Cross');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kunde`
--

CREATE TABLE `kunde` (
  `kid` int(11) NOT NULL,
  `kennung` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `vorname` varchar(255) NOT NULL,
  `nachname` varchar(255) NOT NULL,
  `plz` varchar(5) NOT NULL,
  `ort` varchar(255) NOT NULL,
  `strasse` varchar(255) NOT NULL,
  `hausnr` varchar(10) NOT NULL,
  `konto` varchar(12) NOT NULL,
  `institut` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `kunde`
--

INSERT INTO `kunde` (`kid`, `kennung`, `email`, `vorname`, `nachname`, `plz`, `ort`, `strasse`, `hausnr`, `konto`, `institut`, `pw`) VALUES
(15, '', 'test3@aol.de', '', '', '', '', '', '', '', '', '$2b$10$/jgUVSsLHqDO0vhunetIVe8MKifvinjyE6/Z5YRhovDoxfxwppCQm'),
(1, '1', '1@test.de', 'H', 'R', '3', 'W', 'str', '1', '1', 't', 'test');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produkt`
--

CREATE TABLE `produkt` (
  `pid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `beschreibung` text NOT NULL,
  `preis` double NOT NULL,
  `hid` bigint(20) NOT NULL,
  `katid` bigint(20) NOT NULL,
  `bildpfad` varchar(255) NOT NULL,
  `isHighlight` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `produkt`
--

INSERT INTO `produkt` (`pid`, `name`, `beschreibung`, `preis`, `hid`, `katid`, `bildpfad`, `isHighlight`) VALUES
(1, 'BULLS Nandi Street', '27,5 | black matt/pink', 6, 1, 1, '/images/mtb/1.jpg', 1),
(2, 'BULLS Sharptail Street ', 'Disc 29 | black matt/white', 6, 1, 1, '/images/mtb/2.jpg', 1),
(3, 'BULLS Sharptail 2', 'Disc 27,5 | grau matt/grün', 6, 1, 1, '/images/mtb/3.jpg', 0),
(4, 'BULLS Sharptail 1', 'DISC 29 | GREEN MATT', 6, 2, 1, '/images/mtb/4.jpg', 0),
(5, 'BULLS Sharptail Street', 'DISC 29 | GREEN MATT', 6, 2, 1, '/images/mtb/5.jpg', 0),
(6, 'BULLS Wildtail', 'Disc 29 | black matt', 6, 2, 1, '/images/mtb/6.jpg', 0),
(7, 'BULLS Sharptail Street', 'Disc 29 | black matt/black', 6, 3, 1, '/images/mtb/7.jpg', 0),
(8, 'BULLS Sharptail Street', 'Disc 29 | grey/green', 6, 3, 1, '/images/mtb/8.jpg', 0),
(9, 'Pegasus Solero SL', 'black matt/i-silver', 5, 3, 2, '/images/Trekking/1.jpg', 0),
(10, 'KTM AVENZA', '27 DISC | black matt', 5, 4, 2, '/images/Trekking/2.jpg', 0),
(13, 'Kalkhoff AGATTU XXL', '27 | kombugreen matt', 5, 4, 2, '/images/Trekking/3.jpg', 0),
(14, 'KTM VENETO LIGHT', 'DISC | black matt', 5, 5, 2, '/images/Trekking/4.jpg', 0),
(15, 'Pegasus Solero SL 7 D', 'black matt/i-silver', 4, 5, 3, '/images/City/1.jpg', 0),
(16, 'Pegasus Solero SL 7 H', 'black matt/i-silver', 4, 5, 3, '/images/City/2.jpg', 0),
(17, 'Kalkhoff ENDEAVOUR', 'magicblack matt', 4, 5, 3, '/images/City/3.jpg', 0),
(18, 'Gazelle Van Stael', 'dust grey', 4, 2, 3, '/images/City/4.jpg', 0),
(19, 'BULLS Six50 Evo 1 CX', '(500 Wh) | schwarz matt', 15, 2, 4, '/images/eMTB/1.jpg', 0),
(20, 'Katarga E LT1', '(300 Wh) | hellblau', 15, 2, 4, '/images/eMTB/2.jpg', 0),
(21, 'BULLS Aminga E1', '(400 Wh) | grey matt', 15, 2, 4, '/images/eMTB/3.jpg', 0),
(26, 'Gazelle Arroyo C7+', '(350 Wh) | schwarz', 12, 4, 6, '/images/eCity/2.jpg', 0),
(27, 'Katarga E C7R', '(300 Wh) | grey matt', 12, 4, 6, '/images/eCity/3.jpg', 0),
(28, 'Gazelle GRENOBLE C8', '(400 Wh) | mallard blue', 12, 4, 6, '/images/eCity/4.jpg', 0),
(11, 'BULLS Six50 Evo 2', '(500 Wh) | schwarz', 15, 4, 4, '/images/eMTB/4.jpg', 0),
(23, 'KTM MACINA STYLE', 'black matt', 12, 4, 5, '/images/eTrekking/4.jpg', 0),
(12, 'Pegasus Solero E8', '(500 Wh) | schwarz matt', 12, 4, 5, '/images/eTrekking/1.jpg', 1),
(25, 'Pegasus Macaron E', '(400 Wh) | grau matt', 12, 4, 6, '/images/eCity/1.jpg', 0),
(24, 'KTM Macina Style', 'schwarz matt', 12, 4, 5, '/images/eTrekking/2.jpg', 1),
(22, 'KTM CENTO 10 PLUS', 'white matt', 12, 4, 5, '/images/eTrekking/3.jpg', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnung`
--

CREATE TABLE `rechnung` (
  `rid` bigint(20) NOT NULL,
  `datum` date NOT NULL,
  `uhrzeit` time NOT NULL,
  `kid` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rechnung`
--

INSERT INTO `rechnung` (`rid`, `datum`, `uhrzeit`, `kid`) VALUES
(361588, '2020-05-26', '20:08:33', 15),
(361587, '2020-05-26', '20:05:25', 15),
(361586, '2020-05-26', '20:03:29', 15),
(361585, '2020-05-05', '18:59:47', 10),
(361584, '2020-05-26', '16:47:15', 15),
(361583, '2020-05-26', '15:27:06', 15),
(361582, '2020-05-26', '14:57:11', 15),
(361581, '2020-05-20', '15:12:03', 3),
(361580, '2020-05-20', '14:58:32', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rposten`
--

CREATE TABLE `rposten` (
  `pid` bigint(20) NOT NULL,
  `rid` bigint(20) NOT NULL,
  `anzahl` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rposten`
--

INSERT INTO `rposten` (`pid`, `rid`, `anzahl`) VALUES
(11, 361580, 2),
(7, 361580, 2),
(3, 361581, 2),
(15, 361582, 2),
(13, 361583, 2),
(12, 361583, 2),
(8, 361583, 2),
(13, 361583, 2),
(14, 361584, 1),
(13, 361584, 1),
(12, 361584, 1),
(17, 361584, 2),
(17, 361584, 1),
(14, 361584, 1),
(14, 361584, 1),
(8, 361584, 1),
(17, 361584, 1),
(15, 361584, 1),
(15, 361586, 1),
(12, 361588, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sessions`
--

CREATE TABLE `sessions` (
  `name` text NOT NULL,
  `ip` varchar(50) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `warenkorb`
--

CREATE TABLE `warenkorb` (
  `pid` bigint(20) NOT NULL,
  `kid` bigint(20) NOT NULL,
  `anzahl` int(11) NOT NULL,
  `von` date NOT NULL,
  `bis` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `warenkorb`
--

INSERT INTO `warenkorb` (`pid`, `kid`, `anzahl`, `von`, `bis`) VALUES
(13, 15, 1, '2020-05-25', '2020-05-28');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `hersteller`
--
ALTER TABLE `hersteller`
  ADD PRIMARY KEY (`hid`),
  ADD UNIQUE KEY `name` (`name`,`email`);

--
-- Indizes für die Tabelle `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`katid`);

--
-- Indizes für die Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD PRIMARY KEY (`kid`),
  ADD UNIQUE KEY `kennung` (`kennung`,`email`,`konto`);

--
-- Indizes für die Tabelle `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`pid`);

--
-- Indizes für die Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD PRIMARY KEY (`rid`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `hersteller`
--
ALTER TABLE `hersteller`
  MODIFY `hid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `katid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `kunde`
--
ALTER TABLE `kunde`
  MODIFY `kid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `produkt`
--
ALTER TABLE `produkt`
  MODIFY `pid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT für Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  MODIFY `rid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361589;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
