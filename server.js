//import express
const express = require('express');

//import mysql
const mysql = require('mysql2');

//port designation
const PORT = process.env.PORT || 3003;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Terrific23!',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

//testing express server
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//port designation
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });