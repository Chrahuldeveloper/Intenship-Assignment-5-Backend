const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;
const connectDB = require("./dbconfig/connectDB");
const authRouter = require("./routes/Authentication/auth");
const gitignore = require("giv-gitignore")

gitignore()
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`server is running  ${PORT} `);
  connectDB();
});
