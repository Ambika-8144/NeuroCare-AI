const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        // Check required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Please provide name, email, password and role"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Server error during registration"
        });
    }
};

module.exports = {
    registerUser
};