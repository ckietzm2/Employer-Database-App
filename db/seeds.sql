use employer_db;

INSERT INTO department
 (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES  
    ('Sales Lead', 75000, 1),
    ('Salesperson', 50000, 1),
    ('Lead Engineer', 100000, 2),
    ('CPU Engineer', 75000, 2),
    ('Account Manager', 125000 ,3),
    ('Accountant', 100000 ,3),
    ('Head Legal Team', 175000 ,4),
    ('Lawyer', 125000 ,4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Williams', 1 ,NULL),
    ('Joe', 'Smith', 2 ,1),
    ('Cindy', 'Brown', 3 ,NULL),
    ('Jojo', 'Van Ness', 4 ,3),
    ('Devon', 'White', 5, NULL),
    ('Tessa', 'Gerling',6,5),
    ('James', 'Lee', 7 ,NULL),
    ('Andrew', 'Jackson', 8 ,7);


    
