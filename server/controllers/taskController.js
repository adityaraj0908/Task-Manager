const TaskModel = require('../models/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;
    
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Task title is required" });
    }
    if (!priority) req.body.priority = 'Medium';
    if (!dueDate) req.body.dueDate = new Date(); 

    const id = await TaskModel.create(req.body);
    res.status(201).json({ message: "Created", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, title, description, priority, category, dueDate } = req.body;

    console.log(`Received Update Request for ID: ${id}`);

    
    
    const existingTask = await TaskModel.findById(id);
    if (!existingTask) return res.status(404).json({ message: "Task not found" });

    
    const newTitle = title || existingTask.title;
    const newDesc = description !== undefined ? description : existingTask.description;
    const newCat = category || existingTask.category;
    const newPrio = priority || existingTask.priority;
    const newStatus = status || existingTask.status;
    
    
    let newDate = dueDate || existingTask.dueDate;
    if (newDate) {
        newDate = new Date(newDate).toISOString().split('T')[0];
    }

    await TaskModel.update(id, {
        title: newTitle,
        description: newDesc,
        category: newCat,
        priority: newPrio,
        dueDate: newDate,
        status: newStatus
    });

    res.json({ message: "Updated successfully", status: newStatus });

  } catch (err) {
    console.error("UPDATE ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    await TaskModel.delete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};