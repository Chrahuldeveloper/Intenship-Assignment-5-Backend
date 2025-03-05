const  mongoose =  require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["recruiter", "candidate"],
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", authSchema);

module.exports = Users;
