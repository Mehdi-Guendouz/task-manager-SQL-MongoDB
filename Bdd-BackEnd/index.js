//  Initiate the server and connect to the database
const express = require("express");
const taskRoute = require("./src/routes/task-route");
const user = require("./src/routes/user-route");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Connect to db

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("an error: ", error);
  }
};

connectDB();

// add a task to the db
app.use("/api/task", taskRoute);
app.use("/api/user", user);

app.listen(process.env.PORT, () =>
  console.log("server up port: " + process.env.PORT)
);
