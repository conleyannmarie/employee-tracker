DROP TABLE IF EXISTS employee, manager, roles, department;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department_name VARCHAR(30) NOT NULL,
)

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL

)

CREATE TABLE manager (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
)

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES managers(first_name) ON DELETE SET NULL
);