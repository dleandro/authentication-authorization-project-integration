DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS Roles_Permission ;
DROP TABLE IF EXISTS Users_Roles;
DROP TABLE IF EXISTS Lists;
DROP TABLE IF EXISTS Users_History;
DROP TABLE IF EXISTS IDP;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Permission;

CREATE TABLE Permission(
id SERIAL PRIMARY KEY,
method VARCHAR(10),
path VARCHAR(50),
description Varchar(100)
);

CREATE TABLE Roles(
id SERIAL PRIMARY KEY,
role VARCHAR(20) UNIQUE,
parent_role INT
);

CREATE TABLE Users(
id SERIAL PRIMARY KEY,
username VARCHAR(30) UNIQUE,
PASSWORD VARCHAR(20)
);

CREATE TABLE Roles_Permission(
role INT ,
permission INT,
PRIMARY KEY(role,permission),
FOREIGN KEY (role) REFERENCES Roles(id),
FOREIGN KEY (permission) REFERENCES Permission(id)
);
 
CREATE TABLE Users_Roles(
id SERIAL PRIMARY KEY,
user_id INT,
role_id INT,
start_date TIMESTAMP,
end_date TIMESTAMP,
updater INT,
active BIT(1),
FOREIGN KEY (user_id) REFERENCES Users(id),
FOREIGN KEY (role_id) REFERENCES Roles(id)
);
CREATE TABLE Lists(
id SERIAL PRIMARY KEY,
user_id INT ,
LIST VARCHAR(20),
start_date TIMESTAMP,
end_date TIMESTAMP ,
updater INT,
active BIT(1),
FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Users_History (
user_id INT,
DATE TIMESTAMP,
description VARCHAR(1000)
);
CREATE TABLE IDP(
user_id INT,
idp_id VARCHAR(20000),
idpname VARCHAR(20),
PRIMARY KEY(user_id),
FOREIGN KEY(user_id) REFERENCES Users(id)
);
CREATE TABLE Users_Sessions(
user_id INT,
session_id VARCHAR(128),
FOREIGN KEY (user_id) REFERENCES Users(id),
PRIMARY KEY(user_id,session_id)
);
CREATE TABLE Protocols(
protocol VARCHAR(100),
active BIT(1),
PRIMARY KEY(protocol)
);

INSERT INTO Protocols ("Google", B'1');
INSERT INTO Protocols ("AzureAD", B'1');
INSERT INTO Protocols ("Saml", B'1');