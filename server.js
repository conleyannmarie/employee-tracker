//import express
const express = require("express");
const inquirer = require("inquirer");
//import mysql
const mysql = require("mysql");
//port designation
const PORT = process.env.PORT || 3003;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "earthconscious",
    database: "store_employees",
  },
  console.log("Connected to the store_employees database.")
);

function startServer() {
    inquirer
      .prompt({
        message: "What would you like to do?",
        name: "start",
        type: "list",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Add an employee",
          "Add a department",
          "Add a role",
          "Update an employee",
        ],
      })
      .then(function (response) {
        switch (response.start) {
          case "View all employees":
            viewEmployee();
            break;
  
          case "View all departments":
            viewDepartment();
            break;
  
          case "View all roles":
            viewRoles();
            break;
  
          case "Add an employee":
            addEmployee();
            break;
  
          case "Add a department":
            addDepartment();
            break;
  
          case "Add a role":
            addRoles();
            break;
  
          case "Update an employee":
            updateEmployee();
            break;
        }
      });
  }
  
  const viewEmployee = () => {
      const empTable = 'SELECT * FROM employee'
    db.query(empTable, function (err, rows) {
      if (err) throw err;
      console.table(rows);
      startServer();
    });
  };
  
  const viewDepartment = () => {
    const deptQuery = `SELECT * FROM department`;
    db.query(deptQuery, function (err, rows) {
      if (err) throw err;
      console.table(rows);
      startServer();
    });
  };
  
  const viewRoles = () => {
    const rolesQuery = `SELECT * FROM roles`;
    db.query(rolesQuery, function (err, rows) {
      if (err) throw err;
      console.table(rows);
      startServer();
    });
  };
  
  const addEmployee = () => {
      const emQuery = `SELECT * FROM employee`;
    db.query(emQuery, (err, results) => {
        if (err) throw err;
  
        inquirer.prompt([
            {
                name: 'fName',
                type: 'input'
  
            },
            {
                name: 'lName',
                type: 'input'
            
            },
            {
                name: 'role',
                type: 'list',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
                
            }
        ]).then((answer) => {
              db.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
                (SELECT id FROM roles WHERE title = ? ), 
                (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.fName, answer.lName, answer.role, answer.manager]
            )
            startServer();
        })
    });

    const addRoles = () => {
        const rolesQuery = `SELECT * FROM roles`;
      db.query(rolesQuery, (err, results) => {
          if (err) throw err;
    
          inquirer.prompt([
              {
                  name: 'Title',
                  type: 'input'
    
              },
              {
                  name: 'Salary',
                  type: 'input'
              
              }
          ]).then((answer) => {
                db.query(
                  `INSERT INTO roles (title, salary) VALUES(?, ?)`, [answer.title, answer.salary]
              )
              startServer();
          })
      });

      const addDepartment = () => {
        const rolesQuery = `SELECT * FROM department`;
      db.query(rolesQuery, (err, results) => {
          if (err) throw err;
    
          inquirer.prompt([
              {
                  name: 'Department_Name',
                  type: 'input'
    
              }
          ]).then((answer) => {
                db.query(
                  `INSERT INTO department (department_name) VALUES(?, ?)`, [answer.department_name]
              )
              startServer();
          })
      });
  
  //Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  }
}
  }
startServer();