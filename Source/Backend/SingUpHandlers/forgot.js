import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { SignUpData } from '../Connections/database.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await SignUpData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ email }, 'secretkey', { expiresIn: '15m' });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset Link',
            html: `<p>Click the following link to reset your password:</p>
                   <a href="http://your_domain/reset-password?token=${token}">Reset Password</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending reset link" });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: "Reset link sent to email" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
