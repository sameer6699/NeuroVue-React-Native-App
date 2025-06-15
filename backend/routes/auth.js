const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signin route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Return success response
        res.json({
            success: true,
            message: 'Sign in successful',
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                jobRole: user.jobRole,
                experienceLevel: user.experienceLevel,
                interviewFocus: user.interviewFocus,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during sign in. Please try again.'
        });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobile, jobRole, experienceLevel, interviewFocus } = req.body;

        // Log the received data
        console.log('Received signup data:', {
            firstName,
            lastName,
            email,
            mobile,
            jobRole,
            experienceLevel,
            interviewFocus,
            password: '[REDACTED]'
        });

        // Validate required fields with detailed logging
        const missingFields = [];
        if (!firstName) missingFields.push('firstName');
        if (!lastName) missingFields.push('lastName');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!mobile) missingFields.push('mobile');

        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            mobile: mobile.toString(),
            jobRole: jobRole || 'Not Specified',
            experienceLevel: experienceLevel || 'Fresher',
            interviewFocus: interviewFocus || ['General'],
            profileImage: null // Initialize profile image as null
        });

        // Save user to database
        const savedUser = await user.save();
        console.log('User saved successfully:', { 
            id: savedUser._id,
            email: savedUser.email,
            firstName: savedUser.firstName
        });

        // Return success response
        res.status(201).json({
            success: true,
            message: `Welcome ${firstName}! Your account has been successfully created.`,
            user: {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                mobile: savedUser.mobile,
                jobRole: savedUser.jobRole,
                experienceLevel: savedUser.experienceLevel,
                interviewFocus: savedUser.interviewFocus,
                profileImage: savedUser.profileImage,
                createdAt: savedUser.createdAt
            },
            additionalInfo: {
                message: "You can now log in to your account.",
                nextStep: "Please proceed to the login page to access your account."
            }
        });

    } catch (error) {
        console.error('Signup error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue
        });
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A user with this email already exists'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map(err => err.message).join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error in user registration. Please try again.'
        });
    }
});

module.exports = router; 