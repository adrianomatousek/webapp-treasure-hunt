CREATE TABLE IF NOT EXISTS treasurehunt.student_users (
  username VARCHAR(10) NOT NULL,
  hashPass VARCHAR(128) NOT NULL,
  salt VARCHAR(45) NOT NULL,
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
    REFERENCES treasurehunt.gamekeepers (gameKeeperID)
;

ALTER TABLE student_users
    ADD FOREIGN KEY (gamekeeperID)
    REFERENCES treasurehunt.gamekeepers (gameKeeperID)
;

ALTER TABLE waypoints
    FOREIGN KEY (routeID)
    REFERENCES treasurehunt.routes (routeID)
;