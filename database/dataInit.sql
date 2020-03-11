CREATE DATABASE IF NOT EXISTS treasurehunt;

USE treasurehunt;

CREATE TABLE IF NOT EXISTS treasurehunt.student_users (
  username VARCHAR(10) NOT NULL,
  hashPass VARCHAR(64) NOT NULL,
  salt VARCHAR(16) NOT NULL,
  accessLevel VARCHAR(10) NOT NULL DEFAULT 'Student',
  score INT(11) NOT NULL DEFAULT '0',
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  gamekeeperID VARCHAR(45) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS treasurehunt.gamekeepers (
  gameKeeperID VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (gameKeeperID)
);

CREATE TABLE IF NOT EXISTS treasurehunt.routes (
  routeID INT NOT NULL,
  routeName VARCHAR(45) NOT NULL,
  gamekeeperID VARCHAR(45) NOT NULL,
  PRIMARY KEY (routeID)
);

CREATE TABLE IF NOT EXISTS treasurehunt.waypoints (
  waypointID INT NOT NULL,
  location VARCHAR(45) NOT NULL,
  routeID INT NOT NULL,
  prize VARCHAR(45) NULL,
  positionInRoute INT NOT NULL,
  waypointName VARCHAR(45) NOT NULL,
  PRIMARY KEY (waypointID)
);

CREATE TABLE IF NOT EXISTS treasurehunt.clues (
  clueID INT NOT NULL,
  waypointID INT NOT NULL,
  clueDescription VARCHAR(300) NOT NULL,
  clueNumber INT NOT NULL,
  PRIMARY KEY (clueID)
);


ALTER TABLE treasurehunt.clues
    ADD FOREIGN KEY (`waypointID`)
    REFERENCES `treasurehunt`.`waypoints` (`waypointID`);


ALTER TABLE treasurehunt.routes
    ADD FOREIGN KEY (gamekeeperID)
    REFERENCES treasurehunt.gamekeepers (gameKeeperID);

ALTER TABLE student_users
    ADD FOREIGN KEY (gamekeeperID)
    REFERENCES treasurehunt.gamekeepers (gameKeeperID);

ALTER TABLE waypoints
    ADD FOREIGN KEY (routeID)
    REFERENCES treasurehunt.routes (routeID);

INSERT INTO gamekeepers VALUES(
  "ChiefGamekeeper",
  "C. Game"
);

INSERT INTO student_users VALUES 
(
  "dgm214",
  "7a37b85c8918eac19a9089c0fa5a2ab4dce3f90528dcdeec108b23ddf3607b99",
  "salt",
  "Student",
  "0",
  "Dan M",
  "dgm214@exeter.ac.uk",
  "ChiefGamekeeper"
);

INSERT INTO student_users VALUES 
(
  "ak666",
  "769ce07ef2d785ca7531148a3441ee718a078b4eb2e91ae664d792422bfc901d",
  "lIgqcdaifYtCbZ73",
  "Admin",
  "0",
  "name",
  "email",
  "ChiefGamekeeper"
);

INSERT INTO routes VALUES
(
  "1",
  "Wellbeing Route",
  "ChiefGamekeeper"
),
(
  "2",
  "CompSci Fun Route!",
  "ChiefGamekeeper"
);

INSERT INTO waypoints VALUES
(
  '1',
  '50.735299372643134,-3.5378018783569254',
  '1',
  'SAMPLE PRIZE',
  '1',
  "Reed Hall"
),
(
  '2',
  '50.73412452494373,-3.5373941825866617',
  '1',
  'SAMPLE PRIZE',
  '2',
  "Reed Pond"
),
(
  '3',
  '50.73562530702386,-3.532265798950187',
  '1',
  'SAMPLE PRIZE',
  '3',
  "Forum Hill Pond"
),
(
  '4',
  '50.7369563548952,-3.529293911361686',
  '1',
  'SAMPLE PRIZE',
  '4',
  "Innovation Pond"
),
(
  '5',
  '50.73688149123296,-3.5340843366622843',
  '1',
  'SAMPLE PRIZE',
  '5',
  "Laver Pond"
),
(
  '6',
  '50.73792036406959,-3.5306028293609537',
  '2',
  'SAMPLE PRIZE',
  '1',
  "Innovation Centre"
),
(
  '7',
  '50.73744506563135,-3.5331348346710123',
  '2',
  'SAMPLE PRIZE',
  '2',
  "Harrison"
),
(
  '8',
  '50.737580865677366,-3.5324052738189615',
  '2',
  'SAMPLE PRIZE',
  '3',
  "Harrison Blue ROom"
),
(
  '9',
  '50.73642315765491,-3.531689124011985',
  '2',
  'SAMPLE PRIZE',
  '4',
  "Amory"
);

INSERT INTO clues VALUES
(
  '1',
  '1',
  'Close to God',
  '1'
),
(
  '2',
  '1',
  'The Pope Seat',
  '1'
),
(
  '3',
  '2',
  'Quack! Quack!',
  '2'
),
(
  '4',
  '2',
  'On one of the benches!',
  '2'
),
(
  '5',
  '3',
  'A forest wonderland!',
  '3'
),
(
  '6',
  '3',
  'Close to the waterfall!',
  '3'
),
(
  '7',
  '4',
  'You have been walking a lot. How about you take a seat?',
  '4'
),
(
  '8',
  '4',
  'Look underneath!',
  '4'
),
(
  '9',
  '5',
  'Up the hill, before the bus stop!',
  '5'
),
(
  '10',
  '5',
  'The one in the shade',
  '5'
),
(
  '11',
  '6',
  'Are you tired walking up the stairs? Maybe sit down at a bench',
  '1'
),
(
  '12',
  '7',
  'Go up the stairs and enter the building',
  '2'
),
(
  '13',
  '8',
  'The room that is not blue',
  '3'
),
(
  '14',
  '9',
  'Some say it inspired the JK Rowling moving staircase in Hogwarts',
  '4'
);