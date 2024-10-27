import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

import { generateVerificationToken } from "../utils/generateVerificationToken.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required"); 
        }

        const userAlreadyExists = await User.findOne({ email }); 
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" }); 
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationToken(); 
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = (req, res) => {
    res.send('login route');
};

export const logout = (req, res) => {
    res.send('logout route');
};
