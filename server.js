//import express
const express = require('express');

//port designation
const PORT = process.env.PORT || 3003;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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