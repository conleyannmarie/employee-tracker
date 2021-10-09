INSERT INTO department (department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'), 
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1 ),
('Salesperson', 75000, 1),
('Lead Engineer', 300000, 2),
('Software Engineer', 250000, 2),
('Account Manager', 100000, 3),
('Accountant', 90000, 3),
('Legal Team Lead', 500000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, ),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodrigues', 3, ),
('Kevin', 'Tupik', 4, 3)
('Malia', 'Brown', 5, )
('Sarah', 'Lourd', 6, 5)
('Tom', 'Tanner', 7, )