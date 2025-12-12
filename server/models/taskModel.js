const db = require('../config/db');

const TaskModel = {
  
  findAll: async ({ status, priority }) => {
    let sql = 'SELECT * FROM tasks WHERE 1=1'; 
    const params = [];

    if (status && status !== 'All') {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (priority && priority !== 'All') {
      sql += ' AND priority = ?';
      params.push(priority);
    }
    sql += ' ORDER BY created_at DESC';
    
    const [rows] = await db.query(sql, params);
    return rows;
  },

  create: async (task) => {
    const sql = `INSERT INTO tasks (title, description, category, priority, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(sql, [
      task.title, task.description, task.category, task.priority, task.dueDate, 'Pending'
    ]);
    return result.insertId;
  },

  update: async (id, task) => {
    
    const sql = `
      UPDATE tasks 
      SET title=?, description=?, category=?, priority=?, dueDate=?, status=? 
      WHERE id=?
    `;
    await db.query(sql, [
      task.title, 
      task.description || '', 
      task.category || 'General', 
      task.priority || 'Medium', 
      task.dueDate || null, 
      task.status, 
      id
    ]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  },

  
  logActivity: async (taskId, oldStatus, newStatus) => {
    if (oldStatus !== newStatus) {
      
      try {
        await db.query(
          `INSERT INTO activity_logs (task_id, action, old_status, new_status) VALUES (?, 'STATUS_CHANGE', ?, ?)`,
          [taskId, oldStatus, newStatus]
        );
      } catch (e) {
        console.log("Log Error (Ignore if table missing):", e.message);
      }
    }
  },

  updateStatus: async (id, status) => {
    const sql = `UPDATE tasks SET status = ? WHERE id = ?`;
    await db.query(sql, [status, id]);
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = TaskModel;