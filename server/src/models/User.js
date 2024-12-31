const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
        type: String,
    },
    email: {
      type: String,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
      type: String,
      minlength: 6,
    },
    profilePic: {
      type: String, // URL to Cloudinary
    },
    cv: {
      type: String, // URL to Cloudinary
    },
    appliedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job', // Reference to the Job model
        },
    ],
    googleId: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);


// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
