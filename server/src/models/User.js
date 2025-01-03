const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // This ensures email uniqueness
        match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
        type: String,
        minlength: 6,
        // Make it required only for regular registration
        required: function() {
            return !this.googleId;  // Password required only if not using Google OAuth
        }
    },
    profilePic: {
        type: String,
        default: ''
    },
    cvFile: {
        type: String,
        default: ''
    },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    }],
    googleId: {
        type: String,
        sparse: true,  // Allows null values to not be indexed
        unique: true   // Only unique when present
    },
    authType: {
        type: String,
        enum: ['local', 'google'],
        required: true,
        default: 'local'
    }
}, { timestamps: true });


// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);