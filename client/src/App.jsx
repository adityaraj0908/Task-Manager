import { useState } from 'react';
import { api } from './services/api';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [creds, setCreds] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await api.login(creds);
      setUser(res.data.user);
    } catch (err) { alert("Login Failed. Try 'admin' / 'pass'"); }
  };

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input className="border w-full p-2 mb-2" placeholder="Username (admin)" onChange={e => setCreds({...creds, username: e.target.value})} />
          <input className="border w-full p-2 mb-4" type="password" placeholder="Password (pass)" onChange={e => setCreds({...creds, password: e.target.value})} />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login (AWS Lambda)</button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;