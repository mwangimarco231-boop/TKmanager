import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await onAddTask({ title: title.trim(), description: description.trim() });
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Inside TaskForm.jsx
    return (
        <form onSubmit={handleSubmit}
            className="w-full px-5 py-4 bg-white/80 border border-white/20 rounded-2xl focus:bg-white transition-all"
        >
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Add New Task</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Add a description..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 
        ${!title.trim() || isSubmitting
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5'
                    }`}
            >
                {isSubmitting ? 'Adding...' : 'Create Task'}
            </button>

        </form>
    );

};
export default TaskForm;