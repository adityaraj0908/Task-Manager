import { useState } from 'react';
import { suggestTitle } from '../services/aiService'; 

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({
    title: '', 
    description: '', 
    category: 'Work', 
    priority: 'Medium', 
    dueDate: ''
  });

  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required!");
    
    await onTaskAdded(form);
    setForm({ ...form, title: '', description: '' }); 
  };


  const handleAISuggest = async () => {
    if (!form.description) return alert("Please enter a description first!");
    
    setIsLoadingAI(true); 
    
    try {
      const suggestedTitle = await suggestTitle(form.description);
      setForm(prev => ({ ...prev, title: suggestedTitle }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoadingAI(false); 
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6 border-t-4 border-blue-600">
      
    
      <div className="bg-purple-50 p-4 rounded border border-purple-100 mb-4">
        <h3 className="text-sm font-bold text-purple-700 mb-2 uppercase tracking-wide">
          ✨ AI Copilot
        </h3>
        <div className="flex gap-2 items-start">
          <textarea 
            className="border p-2 w-full rounded text-sm h-16 focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Type your messy thoughts here (e.g., 'need to fix the login bug on the navbar')..." 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})}
          />
          <button 
            type="button" 
            onClick={handleAISuggest} 
            disabled={isLoadingAI}
            className="bg-purple-600 text-white px-4 py-4 rounded font-bold hover:bg-purple-700 transition-all disabled:opacity-50 text-sm w-32"
          >
            {isLoadingAI ? "Thinking..." : "Suggest Title"}
          </button>
        </div>
        <p className="text-xs text-purple-400 mt-1">
          *Enters description above, clicks button, and AI auto-fills the Title below.
        </p>
      </div>
      

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          
         
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Task Title</label>
            <input 
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-200" 
              placeholder="e.g. Fix Login Bug" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priority</label>
             <select 
              className="border p-2 rounded w-full"
              value={form.priority}
              onChange={e => setForm({...form, priority: e.target.value})}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Due Date</label>
            <input 
              type="date" 
              className="border p-2 rounded w-full"
              value={form.dueDate}
              onChange={e => setForm({...form, dueDate: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 shadow-md transition-transform active:scale-95">
          + Create Task
        </button>
      </form>
    </div>
  );
};
export default TaskForm;