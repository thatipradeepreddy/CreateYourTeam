import { SignUpData } from '../Connections/database.js';
import bcrypt from 'bcrypt';
import express from 'express';

const createUserData = express.Router();

createUserData.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await SignUpData.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new SignUpData({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "Record registered" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export { createUserData };
