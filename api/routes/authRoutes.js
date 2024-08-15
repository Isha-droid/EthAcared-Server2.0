const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const { verifyToken, requireRole } = require('../middleware');


router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed password:', hashedPassword); // Debugging line

    // Verify the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match result:', isMatch); // Debugging line

    if (!isMatch) {
      return res.status(500).json({ message: 'Error hashing the password' });
    }

    // Create a new user with the hashed password
    user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();

    const payload = { id: user._id, role: user.role };
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Protected and admin routes (unchanged)
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the dashboard!' });
});

router.get('/admin', verifyToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

// Route for user registration
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("login route called");
  console.log(email);
  console.log(password);

  try {
    // Check if user exists with the provided email
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return token and user data
    console.log(user);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
