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
        "Add a role",
        "Add a department",
        "Update Employee role",
      ],
    })
    .then(function (response) {
      switch (response.start) {
        case "View all employees":
          let sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name
          FROM employee 
          LEFT JOIN roles ON employee.role_id = roles.id 
          LEFT JOIN department ON employee.department_id = department.id`;
          db.query(sql, function (err, rows) {
            if (err) throw err;
            console.table(rows);
            startServer();
          });
      }
    });
}

// Get all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT employee.*, parties.name
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//Get single employee
app.get("/api/employee/:id", (req, res) => {
  const sql = `SELECT employee.*, parties.name
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id
              WHERE candidates.id = ?`;

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//Delete a employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//Create an employee
app.post("/api/employee/:id", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "manager_id",
    "department_id"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
  VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id, body.department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//add a department
app.post("/api/department/:id", ({ body }, res) => {
    const errors = inputCheck(
      body,
      "department_name"
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });

//add a role
app.post("/api/roles/:id", ({ body }, res) => {
    const errors = inputCheck(
      body,
      "title",
      "salary",
      "department_id"
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?)`;
    const params = [body.title, body.salary, body.department_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });

//update an employee

app.put("/api/employee/:id", (req, res) => {
    Employee.update(
      {
        text: req.body
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(Employee => {
      res.json(Employee);
    });
    });


// app.get("/api/parties", (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// app.get("/api/party/:id", (req, res) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });

//Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

startServer();