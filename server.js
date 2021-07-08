// const { ConnectionError } = require('sequelize/types');
// const { connect } = require('http2');
// const cTable = require('console.table');

const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
// const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'Ekard1234',
    database: 'employee_DB',
  });
  

const start = () => {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Employees", "View Departments", "View Roles", "Add Employees", "Add Departments", "Add Roles", "Update Employee Roles"]
        }
    ])
    .then(answer => {
        switch (answer.action) {
            case 'View Employees':
                 viewEmployees();  
                 break;
            case 'View Departments':
                 viewDepartments();
                 break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Employees':
                addEmployees();  
                break;
            case 'Add Departments':
                addDepartments();
                break;
            case 'Add Roles':
                addRoles();
                break;
            case 'Update Employee Roles':
                updateRoles();
                break;
            default:
                console.log("Sorry, that command is not recognized")

        }
    })
    // connection.end()
};

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        console.table(res);
        start();
        });
};

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;

        console.table(res);
        start();
        });
};


const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        console.table(res);
        start();
        });
};










//Adds Departments
const addDepartments = () => {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Department ID:",
        },
        {
            name: "departmentName",
            type: "input",
            message: "Department Name:",
        },
    ])
    .then((answer) => {
connection.query(
    'INSERT INTO department SET ?',
    {
        id: answer.id,
        departmentName: answer.departmentName
    },
    (err) => {
        if (err) throw err;
        console.log('You have successfully added a new role')
        start();
    }
   );
 });
};

//Adds Roles
const addRoles = () => {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Role ID:",
        },
        {
            name: "title",
            type: "input",
            message: "Title:",
        },
        {
            name: "salary",
            type: "input",
            message: "Salary:",
        },
        {
            name: "departmentId",
            type: "input",
            message: "Department ID:",
        },
    ])
    .then((answer) => {
connection.query(
    'INSERT INTO role SET ?',
    {
        id: answer.id,
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId
    },
    (err) => {
        if (err) throw err;
        console.log('You have successfully added a new department')
        start();
    }
   );
 });
};
//Adds Employees
const addEmployees = () => {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Emplyee ID:",
        },
        {
            name: "firstName",
            type: "input",
            message: "First Name:",
        },
        {
            name: "lastName",
            type: "input",
            message: "Last Name:",
        },
        {
            name: "roleId",
            type: "input",
            message: "Role ID:",
        },
        {
            name: "managerId",
            type: "input",
            message: "Manager ID:",
        },
    ])
    .then((answer) => {
connection.query(
    'INSERT INTO employee SET ?',
    {
        id: answer.id,
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: answer.managerId
    },
    (err) => {
        if (err) throw err;
        console.log('You have successfully added an employee')
        start();
    }
   );
 });
};

connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

// sequelize.sync({ force: true }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//     start();
//   });