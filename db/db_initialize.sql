CREATE DATABASE	IF NOT EXISTS wander_shop;
use wander_shop;

DROP TABLE if exists Users;
DROP TABLE if exists Trips;
DROP TABLE if exists Flights;

CREATE TABLE Flights (
	flightId INT PRIMARY KEY,
	origin varchar(3) NOT NULL,
    destination varchar(3) NOT NULL,
    depart_date DATE NOT NULL,
    depart_time time NOT NULL,
    airline varchar(30),
    length varchar(30)
);

CREATE TABLE Users (
	userId INT PRIMARY KEY,
    username varchar(30) NOT NULL,
    pwd varchar(30) NOT NULL
);

CREATE TABLE Trips (
	tripId INT PRIMARY KEY,
    departFlight INT,
    returnFlight INT,
    foreign key (departFlight) references Flights(flightId),
    foreign key (returnFlight) references Flights(flightId)
);

INSERT into Flights
	(flightID, origin, destination, depart_date, depart_time, airline, length)
VALUES (1, "ATL", "SFO", STR_TO_DATE('03/10/2019', '%d/%m/%Y'), '11:00:00', "Delta", "5 hours")
	
    
    

