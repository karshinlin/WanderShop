CREATE DATABASE	IF NOT EXISTS wander_shop;
use wander_shop;

DROP TABLE if exists Users;
DROP TABLE if exists Trips;
DROP TABLE if exists Flights;
DROP TABLE if exists Hotels;
DROP TABLE if exists Activities;
DROP TABLE if exists Restaurants;

CREATE TABLE Flights (
	flightId INT PRIMARY KEY,
	origin varchar(3) NOT NULL,
    destination varchar(3) NOT NULL,
    depart_date DATE NOT NULL,
    depart_time time NOT NULL,
    airline varchar(30),
    flightNum INT,
    cost INT
);

CREATE TABLE Hotels (
	hotelId INT PRIMARY KEY,
	hotelName varchar(50),
    city varChar(50),
    address varchar(75),
    phoneNumber varchar(10),
    cost INT,
    website varchar(75),
    rating INT
);

CREATE TABLE Activities (
	activityId INT PRIMARY KEY,
	activityName varchar(75),
    activityDescription varchar(500),
    cost INT,
    city varchar(50),
    address varchar(75),
    activityDate DATE NOT NULL
);

CREATE TABLE Restaurants (
	restaurantId INT PRIMARY KEY,
    restaurantName varchar(50),
    city varchar(50),
    address varchar(75),
    phoneNumber varchar(10),
    website varchar(75),
    restaurantType varchar(30),
    rating INT
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
	
    
    

