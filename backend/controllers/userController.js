// @desc Register a new user
// @route /api/users
// @access public
const registerUser = (req, res) => {
  console.log(req.body);

  res.send('Register Route');
};

// @desc Login a user
// @route /api/users/login
// @access public
const loginUser = (req, res) => {
  res.send('Login Route');
};

module.exports = {
  registerUser,
  loginUser,
};
