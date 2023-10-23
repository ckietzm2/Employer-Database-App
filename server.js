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
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role","Quit"],
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
          db.query('SELECT * FROM employees JOIN role on employees.id=role.id', function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            promptUser()
          });
          break;

          case "Quit":
            console.log('Thank You!');
            process.exit();
          break;

    }
  });

}








promptUser()