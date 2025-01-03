const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
