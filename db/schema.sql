DROP DATABASE IF EXISTS employer_db;
CREATE DATABASE employer_db;

USE employer_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
)
