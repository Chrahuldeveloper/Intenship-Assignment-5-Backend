const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    skills: { type: [String], default: [] },
    company: { type: String, required: true },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
