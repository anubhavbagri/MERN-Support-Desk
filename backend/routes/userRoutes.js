const express = require('express');
const router = express.Router();

// post request to 'api/users' would mean posting or adding a user which is what 'registering' does
router.post('/', (req, res) => {
  res.send('Register Route');
});

// Login just validates the user
router.post('/login', (req, res) => {
  res.send('Login Route');
});

module.exports = router;
