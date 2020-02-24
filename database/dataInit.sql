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

INSERT INTO student_users VALUES 
(
  "dgm214",
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  "1234567890123456",
  "Student",
  "0",
  "Dan M",
  "dgm214@exeter.ac.uk",
  "1"
);

INSERT INTO gamekeepers VALUES(
  "ChiefGamekeeper",
  "C. Game"
);

INSERT INTO routes VALUES
(
  "1",
  "Main Route",
  "ChiefGamekeeper"
);

INSERT INTO waypoints VALUES
(
  '1',
  '50.735882,-3.534206',
  '1',
  'SAMPLE PRIZE',
  '1'
),
(
  '2',
  '50.734882,-3.535206',
  '1',
  'SAMPLE PRIZE',
  '2'
),
(
  '3',
  '50.735882,-3.536206',
  '1',
  'SAMPLE PRIZE',
  '3'
),
(
  '4',
  '50.736882,-3.534206',
  '1',
  'SAMPLE PRIZE',
  '4'
);


  
