import express from 'express';
import User from '../models/User.js';
import {hashPassword, comparePassword, generateToken} from '../utils/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);
        res.status(201).json({token, user: {id: user._id, username, email}});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = generateToken(user._id);
        res.json({token, user: {id: user._id, username: user.username, email}});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

export default router;
