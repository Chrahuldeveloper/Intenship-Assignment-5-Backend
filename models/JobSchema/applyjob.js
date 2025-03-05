const mongoose = require("mongoose");

const ApplyJobSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  recruiterId: {
    type: String,
    required: true,
  },
});

const ApplyJob = mongoose.model("ApplyJob", ApplyJobSchema);
module.exports = ApplyJob;
