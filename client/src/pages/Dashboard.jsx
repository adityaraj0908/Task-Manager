import { useEffect, useState } from 'react';
import { api } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: 'All', priority: 'All' });

  // Load Tasks with filters
  const fetchTasks = async () => {
    try {
      const res = await api.getTasks(filter);
      setTasks(res.data);
    } catch (err) { console.error("Error fetching tasks"); }
  };

  useEffect(() => { fetchTasks(); }, [filter]);

  // Handlers
  const handleAddTask = async (taskData) => {
    await api.createTask(taskData);
    fetchTasks();
  };

  const handleUpdateTask = async (id, updatedData) => {
  try {
    console.log("Sending update to backend:", updatedData); 
    
    
    await api.updateTask(id, updatedData);
    
   
    setTasks(prevTasks => 
      prevTasks.map(t => (t.id === id ? { ...t, ...updatedData } : t))
    );
    
  } catch (err) {
    console.error("Failed to update task:", err);
    alert("Update failed. Check console.");
  }
};

  const handleDeleteTask = async (id) => {
    await api.deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
      
        <div className="flex gap-2">
          <select className="border p-2 rounded" onChange={e => setFilter({...filter, status: e.target.value})}>
            <option value="All">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select className="border p-2 rounded" onChange={e => setFilter({...filter, priority: e.target.value})}>
            <option value="All">All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <TaskForm onTaskAdded={handleAddTask} />

      <div className="space-y-2">
        {tasks.length === 0 ? <p className="text-center text-gray-500">No tasks found.</p> : null}
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdate={handleUpdateTask} 
            onDelete={handleDeleteTask} 
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;