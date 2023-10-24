const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'employer_db'
  },
  console.log(`Connected to the employer_db database.`)
);

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select an option from the menu:',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"],
        name: 'choice',
      }
    ])
    .then(answers => {
      const choice = answers.choice;

      switch (choice) {
        case "View All Departments":
          db.query('SELECT name FROM department', function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            promptUser()
          });
          break;

        case "View All Roles":
          db.query('SELECT * FROM role', function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            promptUser()
          });
          break;

        case "View All Employees":
          db.query('SELECT * FROM employees', function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            promptUser()
          });
          break;

        case "Add a Department":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Please enter the department name:',
                name: 'departmentName',
              }
            ])
            .then(departmentData => {
              const { departmentName } = departmentData;

              db.query('INSERT INTO department (name) VALUES (?)', [departmentName], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Department '${departmentName}' added successfully!`);
                }
                promptUser();
              });
            });
          break;

        case "Add a Role":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Enter the role title:',
                name: 'roleTitle',
              },
              {
                type: 'number',
                message: 'Enter the role salary:',
                name: 'roleSalary',
              },
              {
                type: 'list',
                message: 'Select the department for this role:',
                choices: ["Sales", "Engineering", "Finance", "Legal"],
                name: 'departmentName',
              },
            ])
            .then(roleData => {
              const { roleTitle, roleSalary, departmentName } = roleData;


              db.query('SELECT id FROM department WHERE name = ?', [departmentName], function (err, departmentResults) {
                if (err) {
                  console.log(err);
                } else {

                  const departmentId = departmentResults[0].id;


                  db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, departmentId], function (err, results) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(`Role '${roleTitle}' added successfully!`);
                    }
                    promptUser();
                  });
                }
              });
            });
          break;

        case "Add an Employee":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Enter the employee first name:',
                name: 'firstName',
              },
              {
                type: 'input',
                message: 'Enter the employee last name:',
                name: 'lastName',
              },
              {
                type: 'list',
                message: 'Select the employee role:',
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "CPU Engineer", "Account Manager", "Accountant", "Head Legal Team", "Lawyer"],
                name: 'roleTitle',
              },
              {
                type: 'number',
                message: 'Enter the employees manager ID:',
                name: 'managerId',
              },
            ])
            .then(employeeData => {
              const { firstName, lastName, roleTitle, managerId } = employeeData;

              db.query('SELECT id FROM role WHERE title = ?', [roleTitle], function (err, roleResults) {
                if (err) {
                  console.log(err);
                } else {


                  const roleId = roleResults[0].id;

                  const managerIdValue = managerId;


                  db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerIdValue], function (err, results) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(`Employee '${firstName} ${lastName}' added successfully!`);
                    }
                    promptUser();
                  });
                }
              });
            });
          break;

        case "Update an Employee Role":
          updateEmployeeRole()
          break;

        case "Quit":
          console.log('Thank You!');
          process.exit();


      }
    });
}



function updateEmployeeRole() {


  db.query('SELECT title AS name, id AS value FROM role', function (err, roles) {
    if (err) {
      console.log(err);
    } else {
      db.query('SELECT concat(first_name, " ",last_name) AS name, id AS value FROM employees', function (err, employees) {
        if (err) {
          console.log(err);
        } else {
          inquirer
            .prompt([
              {
                type: 'list',
                message: 'Please select an employee to update:',
                name: 'update',
                choices: employees
              },
              {
                type: 'list',
                message: 'Please choose the role:',
                name: 'role',
                choices: roles
              }
            ])
            .then(answers => {
              const { update,role} = answers;

              db.query('UPDATE employees SET role_id=? WHERE id=?', [role,update], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`${update}' updated successfully!`);
                }
                promptUser();
              });
            });
        }
      });
    }

  });

}



promptUser()