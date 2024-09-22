import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Router } from 'express';

const router = Router();

// POST /register
router.post('/register', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    console.log('Existing User:', existingUser); // Log the existing user
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error); // Log the error
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error); // Log the error
    res.status(500).json({ message: 'Error logging in', error });
  }
});

export { router as userRouter };
