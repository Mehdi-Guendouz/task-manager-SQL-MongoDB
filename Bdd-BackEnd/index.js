import express from "express";
import taskRoute from "./src/routes/task-route.js";
import user from "./src/routes/user-route.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

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
