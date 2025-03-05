const express = require("express");
const Job = require("../../../models/JobSchema/jobschema");
const authMiddleware = require("../../Authentication/authmiddleware");
const jobRouter = express.Router();

jobRouter.post("/jobs", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, recruiterId } = req.body;

    if (!recruiterId) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const job = new Job({ title, description, status, recruiterId });
    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
});

jobRouter.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

jobRouter.put("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Only recruiters can update jobs" });
    }

    console.log(req.params.id);

    const job = await Job.findById(req.params.id);

    console.log(job.recruiterId);
    console.log(req.params.id);

    if (!job || !job.recruiterId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job" });
    }

    Object.assign(job, req.body);
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
});

jobRouter.delete("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Only recruiters can delete jobs" });
    }

    const job = await Job.findById(req.params.id);
    if (!job || !job.recruiterId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});

module.exports = jobRouter;
