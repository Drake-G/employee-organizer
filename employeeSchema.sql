DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
id INTEGER NOT NULL,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INTEGER NOT NULL,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INTEGER NOT NULL
);

CREATE TABLE employee (
id INTEGER NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER NOT NULL,
manager_id INTEGER NOT NULL
);
