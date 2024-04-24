import express from "express";

const router = express.Router();

router.route("/task").get((req, res) => {
  res.send("Task route");
});

export default router;
