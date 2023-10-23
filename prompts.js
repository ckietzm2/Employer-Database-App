const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'text',
      message: 'Please enter 3 characters of text:',
      name: 'text',
    }

])
