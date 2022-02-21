const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// post request to 'api/users' would mean posting or adding a user which is what 'registering' does
router.post('/', registerUser);

// Login just validates the user
router.post('/login', loginUser);

module.exports = router;
