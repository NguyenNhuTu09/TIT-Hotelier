CREATE DATABASE TITHotelier

USE TITHotelier;

CREATE TABLE User(
	ID INT auto_increment PRIMARY KEY,
    firstLastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    userName VARCHAR(50) NOT NULL UNIQUE,
    passw VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    birthDay DATETIME NOT NULL,
    userRole ENUM("Admin", "User") NOT NULL,
    created_At DATETIME DEFAULT current_timestamp,
    updated_At DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

DROP TABLE USER;

SELECT * FROM users;

INSERT INTO User (ID, firstLastName, phoneNumber, userName, passw, email, birthDay, userRole, created_At, updated_At)
VALUES (1, 'Nguyen Van A', '0987654321', 'nguyenvana', 'password123', 'nguyenvana@example.com', '1990-01-01', 'User', '2024-10-06', '2024-10-06');

UPDATE users
SET email = 'navia@gmail.com'
WHERE ID = 2;

