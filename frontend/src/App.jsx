import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/login'
import { taskAPI } from './services/api';
import Register from './components/Register';
import './App.css';


console.log("Environment:", import.meta.env.MODE);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("Final API URL:", getApiBaseUrl());


function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (isAuthenticated)
      fetchTasks();
    else
      setLoading(false)
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleLogout()
      }
      else {
        setError('Failed to fetch tasks. Please check your connection.');
      }

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    setIsAuthenticated(false)
    setTasks([])
  }
  const handleAddTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      const updatedTaskData = { ...taskToUpdate, completed };

      const response = await taskAPI.updateTask(taskId, updatedTaskData);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? response.data : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-xl font-semibold">Loading tasks...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {showLogin ? (
          <Login onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#dee5f3] relative overflow-hidden font-sans selection:bg-indigo-100">
      {/* Stronger, more vibrant decorative blobs */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-400/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-teal-300/30 blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px] pointer-events-none" />

      {/* Glass Header */}
      <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Branding */}
          <div className="flex items-center">
            <h1 className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-80 transition-opacity cursor-default">
              TASKLY
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-xs font-black uppercase tracking-widest text-rose-500 bg-white/50 backdrop-blur-sm border border-rose-100 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all active:scale-95 shadow-sm"
            >
              Logout
            </button>
          </div>

        </div>
      </header>


      {/* Main Content Area */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 mt-12 mb-20 space-y-12">
        {error && (
          <div className="bg-red-50/80 backdrop-blur-md border-l-4 border-red-500 p-4 text-red-700 rounded-r-2xl shadow-sm">
            {error}
          </div>
        )}

        {/* Your TaskForm and TaskList already have the glass card classes we added! */}
        <TaskForm onAddTask={handleAddTask} />

        <div className="space-y-6">
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );

}
export default App;

