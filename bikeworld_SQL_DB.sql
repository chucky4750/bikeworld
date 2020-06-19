-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Jun 2020 um 20:01
-- Server-Version: 10.1.37-MariaDB
-- PHP-Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
(2, 'Pegasus', 'https://www.pegasus-bikes.de/', 'info@winora-group.de'),
(3, 'KTM', 'https://www.ktm-bikes.at/', 'office@ktm-bikes.de'),
(4, 'Kalkhoff', 'https://www.kalkhoff-bikes.com/', 'Consumerservice.DACH@jdecoffee.com'),
(5, 'Gazelle', 'https://www.gazelle.de/', 'expressi-support@expressi.de'),
(6, 'Katarga', 'http://www.katarga.de', '');

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
(1, '2024-03-01', '2024-03-04', 1),
(15, '2024-03-19', '2024-03-21', 1),
(18, '2024-03-22', '2024-03-23', 1),
(1, '2020-06-14', '2020-06-16', 1),
(4, '2020-06-07', '2020-06-10', 1),
(4, '2020-06-07', '2020-06-10', 0);

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
(6, 'E-Cross'),
(7, 'Kindersitz'),
(8, 'Helm');

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
(1, '1', '1@test.de', 'H', 'R', '3', 'W', 'str', '1', '1', 't', 'test'),
(16, '', 'test1@gmx.de', '', '', '', '', '', '', '', '', '$2b$10$lrohJWvPRENDCBg2UWT52ey7sS5Lvpa1cKXRHhKqID0yMuI0rKv1S');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produkt`
--

CREATE TABLE `produkt` (
  `pid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `beschreibung` text NOT NULL,
  `Beschreibung_lang` text NOT NULL,
  `preis` double NOT NULL,
  `hid` bigint(20) NOT NULL,
  `katid` bigint(20) NOT NULL,
  `bildpfad` varchar(255) NOT NULL,
  `isHighlight` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `produkt`
--

INSERT INTO `produkt` (`pid`, `name`, `beschreibung`, `Beschreibung_lang`, `preis`, `hid`, `katid`, `bildpfad`, `isHighlight`) VALUES
(1, 'BULLS Nandi Street', '27,5 | black matt/pink', 'BULLS Nandi Street 27,5, 21 Gang Kettenschaltung, Damenfahrrad, Hardtail, Modell 2020, 27,5 Zoll', 6, 1, 1, '/images/mtb/1.jpg', 1),
(2, 'BULLS Sharptail Street ', 'Disc 29 | black matt/white', 'BULLS Sharptail Street Disc 29, 21 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/2.jpg', 1),
(3, 'BULLS Sharptail 2', 'Disc 27,5 | grau matt/grün', 'BULLS Sharptail 2 Disc 29, 24 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/3.jpg', 0),
(4, 'BULLS Sharptail 1', 'DISC 29 | GREEN MATT', 'BULLS Sharptail 1 Disc 29, 24 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/4.jpg', 0),
(5, 'BULLS Sharptail Street', 'DISC 29 | GREEN MATT', 'BULLS Sharptail Street 2 Disc 29, 21 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/5.jpg', 0),
(6, 'BULLS Wildtail', 'Disc 29 | black matt', 'BULLS Wildtail Disc 27,5, 24 Gang Kettenschaltung, Herrenfahrrad, MTB, Modell 2020, 27,5 Zoll', 6, 1, 1, '/images/mtb/6.jpg', 0),
(7, 'BULLS Sharptail Street', 'Disc 29 | black matt/black', 'BULLS Sharptail Street 2 Disc 29, 21 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/7.jpg', 0),
(8, 'BULLS Sharptail Street', 'Disc 29 | grey/green', 'BULLS Sharptail Street 2 Disc 29, 21 Gang Kettenschaltung, Herrenfahrrad, Hardtail, Modell 2020, 29 Zoll', 6, 1, 1, '/images/mtb/8.jpg', 0),
(9, 'Pegasus Solero SL', 'black matt/i-silver', 'Pegasus Solero SL Disc, 24 Gang Kettenschaltung, Herrenfahrrad, Diamant, Modell 2020, 28 Zoll, black matt/i-silver', 5, 2, 2, '/images/Trekking/1.jpg', 0),
(10, 'KTM AVENZA', '27 DISC | black matt', 'Stilsicher und sportlich: Das KTM Avenza 27 Disc ist ein Trekkingfahrrad, das für einige Herausforderungen bereit ist. Mit reichlich Alltagstauglichkeit, zahlreichen Top-Komponenten sowie viel Dynamik in Design und Fahrverhalten bietet es alles, was es für Touren-Vergnügen braucht. Von der City bis zum Feldweg macht dieses Bike einfach nur Spaß. ', 5, 3, 2, '/images/Trekking/2.jpg', 0),
(13, 'Kalkhoff AGATTU XXL', '27 | kombugreen matt', 'Kalkhoff AGATTU XXL 27, 27 Gang, Herrenfahrrad, Diamant, Modell 2019, 28 Zoll', 5, 4, 2, '/images/Trekking/3.jpg', 0),
(14, 'KTM VENETO LIGHT', 'DISC | black matt', 'In diesem Modell sind qualitativ hochwertige Teile verbaut, beispielsweise besitzt das KTM Veneto Light Disc ein Shimano Deore T6000 Schaltwerk mit 10 Schaltstufen. Dieses ist für die Anforderungen an das Trekkingrad konzipiert. Aus diesem Grund benötigt die Federspannung lediglich geringe Bedienkräfte. Zudem spricht das einfache Schalten für die komfortable Fahrweise des Zweirads. Darüber hinaus bringst du dein Rad mit der Shimano MT200 zum Stehen. Der Bremshebel ist ergonomisch designt und lässt sich mit drei Fingern betätigen. Der Vorteil von solchen hydraulischen Scheibenbremsen liegt in deren Wirksamkeit. Hydraulische Scheibenbremsen funktionieren bei Feuchtigkeit und Nässe besser als Felgenbremsen. Außerdem ist die eingesetzte Kraft, die mit den Händen aufgebracht werden muss, vergleichsweise niedrig. Zudem sind die leichten Schwalbe Marathon Reifen maßgeblich am geringen Gewicht des Fahrrads beteiligt. Das reduzierte Eigengewicht geht ohne Einbußen beim Pannenschutz einher.', 5, 3, 2, '/images/Trekking/4.jpg', 0),
(15, 'Pegasus Solero SL 7 D', 'black matt/i-silver', 'Pegasus Solero SL 7, 7 Gang Nabenschaltung, Damenfahrrad, Trapez, Modell 2020, 28 Zoll, black matt/i-silver', 4, 2, 3, '/images/City/1.jpg', 0),
(16, 'Pegasus Solero SL 7 H', 'black matt/i-silver', 'Pegasus Solero SL 7, 7 Gang Nabenschaltung, Herrenfahrrad, Wave, Modell 2020, 28 Zoll', 4, 2, 3, '/images/City/2.jpg', 0),
(17, 'Kalkhoff ENDEAVOUR', 'magicblack matt', 'Kalkhoff ENDEAVOUR 8, 8 Gang, Herrenfahrrad, Diamant, Modell 2019, 28 Zoll', 4, 4, 3, '/images/City/3.jpg', 0),
(18, 'Gazelle Van Stael', 'dust grey', 'Für dieses stilvolle Retrorad hat Gazelle sich von dem Klassiker aus dem eigenen Haus – dem Tour de France – inspirieren lassen. Der robuste Stahlrahmen vereint Nostalgie mit modernem Styling. ', 4, 5, 3, '/images/City/4.jpg', 0),
(19, 'BULLS Six50 Evo 1 CX', '(500 Wh) | schwarz matt', 'BULLS Six50 Evo 1 CX (500 Wh), 9 Gang Kettenschaltung, Herrenfahrrad, Diamant, Modell 2019, 27,5 Zoll, schwarz matt', 15, 1, 4, '/images/eMTB/1.jpg', 0),
(20, 'Katarga E LT1', '(300 Wh) | hellblau', 'Katarga E LT1 (300 Wh), 7 Gang Kettenschaltung, Herrenfahrrad, Diamant, Modell 2019, 27,5 Zoll', 15, 6, 4, '/images/eMTB/2.jpg', 0),
(21, 'BULLS Aminga E1', '(400 Wh) | grey matt', 'BULLS Aminga E1 (400 Wh), 9 Gang Kettenschaltung, Damenfahrrad, Hardtail, Modell 2020, 27,5 Zoll', 15, 1, 4, '/images/eMTB/3.jpg', 0),
(26, 'Gazelle Arroyo C7+', '(350 Wh) | schwarz', 'Das E-Bike, dem man es nicht ansieht. Denn der extra kraftvolle Motor wie auch der Akku sind harmonisch in das Rahmendesign integriert. Der Schwerpunkt liegt tiefer und mehr in der Mitte des Fahrrads, was seine Wendigkeit deutlich verbessert. Auch die Luxus-Ausstattung – wie innovative LED-Beleuchtung, Leder-Handgriffe und ein Gel-Sattel – sind formschön in das Design integriert.', 12, 5, 6, '/images/eCity/2.jpg', 0),
(27, 'Katarga E C7R', '(300 Wh) | grey matt', 'Katarga E C7R (300 Wh), 7 Gang Nabenschaltung, Damenfahrrad, Wave, Modell 2020, 28 Zoll', 12, 4, 6, '/images/eCity/3.jpg', 0),
(28, 'Gazelle GRENOBLE C8', '(400 Wh) | mallard blue', 'Dieses Allroundtalent mit ultra-leistungsstarkem, geräuscharmem Bosch-Mittelmotor ist das Must-have für den Alltag und für Langstrecken.   Der Motor unterstützt anstrengungsfreies Radfahren in hügeligem und flachem Gelände. ', 12, 4, 6, '/images/eCity/4.jpg', 0),
(11, 'BULLS Six50 Evo 2', '(500 Wh) | schwarz', 'BULLS Six50 Evo 2 (500 Wh), 10 Gang Kettenschaltung, Herrenfahrrad, Diamant, Modell 2019, 27,5+ Zoll, schwarz matt/grau/orange/weiß', 15, 2, 4, '/images/eMTB/4.jpg', 0),
(23, 'KTM MACINA STYLE', 'black matt', 'Mit dem KTM Macina Style xt11 2019 erreichen Fahrer auch nach langen Tagen im bequemen Royalgel-Komfortsattel, ganz entspannt ihr Ziel. Vom Start weg erfreuen sich Besitzer an einem lockeren Fahrgefühl, was der komfortablen Sitzposition, dem leicht zu bedienenden Intuvia LCD Display und der Motorpower zu verdanken ist. Durch das hohe Drehmoment von 75 Nm dominiert das Gefühl von Leichtigkeit bei jedem Tritt. Selbst wenn der Touren-Gepäckträger mit praktischen Klicksystem voll beladen oder mehrere Anstiege bis zum Ausflugsziel zu überwinden sind. Dazu verhilft auch die große Bandbreite der Shimano Kettenschaltung und das angenehme Schaltgefühl des Shimano Deore XT RD-M8000-GS Shadow Plus Schaltwerkes. Leicht und schnell erfolgt der Wechsel zwischen kleinen und großen Gängen.', 12, 3, 5, '/images/eTrekking/4.jpg', 0),
(12, 'Pegasus Solero E8', '(500 Wh) | schwarz matt', 'Das PEGASUS SOLERO E8 eignet sich als perfekter Begleiter in weg- und unwegsamen Gelände. Seine langhubige SR Suntour NEX E25 DS Federgabel mit 63mm Federweg, die leicht laufende CST Bereifung sowie seine starke Bosch Active Line Plus Antriebstechnologie garantieren Performance auf jedem Untergrund. Die Basis für jede Menge Fahrspaß bildet beim Solero E8 auch der formschöne Rahmen, der gleich in drei Rahmenformen erhältlich ist. Geeignet für jeden Radlertyp, der ein solides Touren-Bike oder Stadtbike sucht, ist das Rad wahlweise als Trapez und Wave oder mit Diamantrahmen erhältlich.', 12, 2, 5, '/images/eTrekking/1.jpg', 1),
(25, 'Pegasus Macaron E', '(400 Wh) | grau matt', 'Pegasus Macaron E (400 Wh), 8 Gang Nabenschaltung, Herrenfahrrad, Diamant, Modell 2017, 28 Zoll, grau matt', 12, 4, 6, '/images/eCity/1.jpg', 0),
(24, 'KTM Macina Style', 'schwarz matt', 'Mit dem KTM Macina Style xt11 2019 erreichen Fahrer auch nach langen Tagen im bequemen Royalgel-Komfortsattel, ganz entspannt ihr Ziel. Vom Start weg erfreuen sich Besitzer an einem lockeren Fahrgefühl, was der komfortablen Sitzposition, dem leicht zu bedienenden Intuvia LCD Display und der Motorpower zu verdanken ist. Durch das hohe Drehmoment von 75 Nm dominiert das Gefühl von Leichtigkeit bei jedem Tritt. Selbst wenn der Touren-Gepäckträger mit praktischen Klicksystem voll beladen oder mehrere Anstiege bis zum Ausflugsziel zu überwinden sind. Dazu verhilft auch die große Bandbreite der Shimano Kettenschaltung und das angenehme Schaltgefühl des Shimano Deore XT RD-M8000-GS Shadow Plus Schaltwerkes. Leicht und schnell erfolgt der Wechsel zwischen kleinen und großen Gängen.', 12, 3, 5, '/images/eTrekking/2.jpg', 1),
(22, 'KTM CENTO 10 PLUS', 'white matt', 'KTM CENTO 10 PLUS, 10 Gang Kettenschaltung, Damenfahrrad, Wave, Modell 2020, 28 Zoll', 12, 3, 5, '/images/eTrekking/3.jpg', 0),
(29, 'BULLS Nandi Street', '27,5 | black matt/pink', 'BULLS Nandi Street 27,5, 21 Gang Kettenschaltung, Damenfahrrad, Hardtail, Modell 2020, 27,5 Zoll', 6, 1, 1, '/images/mtb/1.jpg', 0),
(30, 'Copperhead 2.0', 'schwarz', 'BULLS Unisex Helm Copperhead 2.0, schwarz', 2, 1, 8, '/images/helm/H1.jpg', 0),
(31, 'Megi 2', 'bunt', 'Kindgerecht und Sicherheit. Das bringt der Meggy Helm mit. \r\n\r\nKED schafft es Kinder und jugendliche mit außergewöhnlichen Design zu motivieren, sodass Ihre Sprösslinge sich gerne mit Helm aufs Bike setzen. \r\n\r\nZudem ist KED als Hersteller mit seinen teilweise einzigartigen Technologien und Qualität “Made in Germany” ganz weit vorne in puncto Sicherheit. \r\n\r\nDas Insektennetz am vorderen oberen Helm, verhindert das eindringen von Kleintieren, ohne dabei aber die 8 Ventilationsöffnungen für gute Luftzirkulierung, auch bei warmen Wetter, zu behindern.\r\n\r\nDie Quicksafe® Technologie vereint leichte Anpassung der individuellen Kopfformen mit gut Sichtbaren Blink- LEDs. \r\n\r\nDiese Aspekte machen den Helm zu einem treuen und sicheren Begleiter zu jeder Tageszeit.', 2, 1, 8, '/images/helm/H2.jpg', 0),
(32, 'JOCKEY COMFORT 3 BLACK/GREY', 'schwarz', 'Der JOCKEY³ COMFORT ist nicht nur superbequem, sondern auch äußerst flexibel ? für alle Kinder von 9 bis 22 kg. Die anpassbare Kopfstütze und Fußstützen sorgen dafür, dass Ihr Kind immer optimal sitzt und lassen sich ganz einfach mit einer Hand verstellen. Gleichzeitig können Sie auch die Rückenlehne in eine angenehme Ruheposition bringen damit sich Ihr Kleines auch unterwegs ausruhen kann. Zusätzlich dämpft der Federstahlbügel Stöße von der Straße ab. All das sorgt dafür, dass Sie und Ihr Kind unterwegs ganz entspannt sein können. Eine sichere Reise garantiert der JOCKEY³ COMFORT mit seinen vielen Sicherheitsmerkmalen. Beispielsweise verhindert der extra große Speichenschutz, dass die kleinen Füße zwischen die Speichen geraten. Genau wie die Fußgurte, die dafür sorgen, dass die Füße Ihres Kindes auf der Fußstütze bleiben, wo sie sicher sind. Nicht zuletzt hält das bequeme Gurtsystem mit neuem zweistufigem Magnet-Sicherheitsschloss Ihr Kind sicher und fest in seinem Sitz. Und weil der Sitz komplett in Deutschland gefertigt wird, können wir Ihnen höchstmögliche Qualität garantieren. Außerdem hat sich beim Gewicht etwas verändert. Der Sitz ist etwas leichter geworden:', 2, 1, 7, '/images/Kindersitz/Kinder.jpg', 0);

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
(361580, '2020-05-20', '14:58:32', 3),
(361589, '2020-05-31', '11:55:02', 16),
(361590, '2020-05-31', '11:56:56', 16),
(361591, '2020-06-01', '02:46:30', 16),
(361592, '2020-06-01', '02:47:25', 16),
(361593, '2020-06-01', '02:47:31', 16),
(361594, '2020-06-01', '02:47:34', 16),
(361595, '2020-06-01', '02:47:37', 16),
(361596, '2020-06-01', '02:47:39', 16),
(361597, '2020-06-01', '03:02:28', 16),
(361598, '2020-06-01', '03:03:00', 16),
(361599, '2020-06-01', '03:03:54', 16),
(361600, '2020-06-01', '03:04:49', 16),
(361601, '2020-06-01', '03:05:20', 16),
(361602, '2020-06-02', '18:07:43', 15),
(361603, '2020-06-07', '20:47:48', 15);

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
(12, 361588, 1),
(10, 361589, 1),
(1, 361591, 1),
(15, 361591, 1),
(18, 361602, 1),
(4, 361603, 1),
(1, 361603, 1);

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
(4, 15, 1, '2020-06-07', '2020-06-10');

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
  MODIFY `katid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `kunde`
--
ALTER TABLE `kunde`
  MODIFY `kid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `produkt`
--
ALTER TABLE `produkt`
  MODIFY `pid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT für Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  MODIFY `rid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361604;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
