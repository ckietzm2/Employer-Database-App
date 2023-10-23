const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please select an option from the menu:',
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role" , "Add an Employee","Update an Employee Role"],
      name: 'choice',
    }

])



