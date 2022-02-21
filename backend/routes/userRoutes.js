const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// post request to 'api/users' would mean posting or adding a user which is what 'registering' does
router.post('/', registerUser);

// Login just validates the user
router.post('/login', loginUser);

router.get('/me', protect, getMe);

module.exports = router;
