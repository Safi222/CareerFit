const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    requirements: {
      type: [String], // Array of strings
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
