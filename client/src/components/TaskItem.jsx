import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  // 1. Define Colors for each status
  const statusStyles = {
    'Pending': 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    'In Progress': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Completed': 'bg-green-100 text-green-800 hover:bg-green-200'
  };

  const priorityColors = { 
    Low: 'text-green-600 bg-green-50', 
    Medium: 'text-yellow-600 bg-yellow-50', 
    High: 'text-red-600 bg-red-50' 
  };

  // 2. The 3-Step Cycle Logic
  const handleStatusClick = () => {
    const flow = { 
      'Pending': 'In Progress', 
      'In Progress': 'Completed', 
      'Completed': 'Pending' 
    };
    
    // Calculate next status based on current one
    const nextStatus = flow[task.status] || 'Pending';
    
    console.log(`Cycling Status: ${task.status} -> ${nextStatus}`);

    // Update Parent/DB
    onUpdate(task.id, { ...task, status: nextStatus });
  };

  const handleSave = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 p-4 rounded shadow border mb-4">
        <input className="border p-2 w-full mb-2 rounded" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} />
        <div className="flex justify-end gap-2">
           <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
           <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded shadow mb-3 flex items-center justify-between bg-white border-l-4 ${task.status === 'Completed' ? 'border-green-500' : 'border-blue-500'}`}>
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          {/* 3. The Clickable Status Button */}
          <button 
            onClick={handleStatusClick}
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide transition-colors ${statusStyles[task.status]}`}
            title="Click to change status"
          >
            {task.status}
          </button>

          <span className={`text-xs px-2 py-1 rounded font-bold ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        <h3 className={`font-bold text-lg ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {task.title}
        </h3>
        <p className="text-gray-500 text-sm">{task.description}</p>
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button onClick={() => setIsEditing(true)} className="text-sm text-gray-500 hover:text-blue-600">Edit</button>
        <button onClick={() => onDelete(task.id)} className="text-sm text-red-400 hover:text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;