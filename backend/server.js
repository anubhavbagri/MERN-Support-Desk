const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Initialize app variable
const app = express();

app.get('/', (req, res) => {
  //   res.send('Hello');

  // if you want to send json
  res.json({ message: 'Welcome to the Support Desk API' });

  // if you want to send the status along with json
  //   res.status(201).json({ message: 'Welcome to the Support Desk API' });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
