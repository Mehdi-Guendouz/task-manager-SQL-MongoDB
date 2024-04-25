const Task = require("../models/task-model");
const Joi = require("joi");
const isFilterValid = require("../utils/checkFilters");

//  Create a schema for the task
const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required",
  }),
  importance: Joi.string().valid("low", "medium", "high").required().messages({
    "any.required": "importance is required",
  }),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  importance: Joi.string().valid("low", "medium", "high").optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

const getAllTasks = async (req, res) => {
  // get user id from the req object
  const id = req.user.id;
  const search = req.query.search;
  const filter = req.query.filter;
  //  Check if search and filter are present
  const keywords = () => {
    if (search && filter) {
      if (isFilterValid(filter)) {
        return {
          user_id: id,
          title: { $regex: search, $options: "i" },
          importance: filter,
        };
      }
    } else if (search) {
      return {
        user_id: id,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    } else if (filter) {
      if (isFilterValid(filter)) {
        return { user_id: id, importance: filter };
      }
    } else {
      return { user_id: id };
    }
  };
  try {
    // Check if user exist
    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }
    // Find all tasks for the user
    const tasks = await Task.find(keywords());
    // return all tasks
    res.status(200).json({
      message: "Get all tasks",
      tasks,
    });
  } catch (error) {
    // return error if any
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  // get user id from the req object
  const id = req.user.id;
  //   Validate the request body
  const { error } = createTaskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Check if user exist
    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }
    // Create a new task
    const task = await Task.create({ user_id: id, ...req.body });

    // return the task
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    // return error if any
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  // get user id from the req object
  const id = req.user.id;
  const taskId = req.params.id;
  //   Get the data from the request body
  const data = req.body;

  //   Validate the request body
  const { error } = updateTaskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Check if user exist
    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }
    // Find the task
    const task = await Task.findOne({ user_id: id, _id: taskId });
    // Check if task exist
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { user_id: id, ...data },
      {
        new: true,
      }
    );
    // return the updated task
    res.status(200).json({ message: "Task updated", updatedTask });
  } catch (error) {
    // return error if any
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  // get user id from the req object
  const id = req.user.id;
  const taskId = req.params.id;

  try {
    // Check if user exist
    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }
    // Find the task
    const task = await Task.findOne({ user_id: id, _id: taskId });
    // Check if task exist
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Delete the task
    await Task.findByIdAndDelete(taskId);
    // return the task
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    // return error if any
    res.status(500).json({ message: error.message });
  }
};

// Export the functions

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
