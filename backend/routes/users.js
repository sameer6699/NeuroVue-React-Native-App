const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update user profile
router.put('/update-profile', async (req, res) => {
    try {
        console.log('Received update profile request');
        console.log('Request body:', {
            ...req.body,
            profileImage: req.body.profileImage ? 'Base64 image data present' : 'No image data'
        });

        const { userId, profileImage } = req.body;

        if (!userId) {
            console.log('Error: User ID is missing');
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        console.log('Looking for user with ID:', userId);

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImage },
            { new: true }
        );

        if (!updatedUser) {
            console.log('Error: User not found with ID:', userId);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('User profile updated successfully');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                jobRole: updatedUser.jobRole,
                experienceLevel: updatedUser.experienceLevel,
                interviewFocus: updatedUser.interviewFocus,
                profileImage: updatedUser.profileImage ? 'Image data present' : 'No image'
            }
        });
    } catch (error) {
        console.error('Detailed error in update-profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

module.exports = router; 