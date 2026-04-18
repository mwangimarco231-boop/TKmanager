import React from 'react';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800">
                Your Tasks <span className="text-indigo-500">({tasks.length})</span>
            </h2>

            {tasks.length === 0 ? (
                <div className="text-center py-20 bg-gradient-to-dashed from-white to-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
                    <p className="text-lg font-medium text-slate-500">Your list is clear!</p>
                    <p className="text-sm">Time to relax or plan something new.</p>
                </div>

            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`
                flex items-center justify-between p-8 rounded-[2.5rem] 
                backdrop-blur-2xl transition-all duration-500 mb-6
                ${task.completed
                                    ? 'bg-slate-200/30 border-slate-300/40 opacity-70 shadow-sm'
                                    : 'bg-white/40 border-white/60 shadow-[0_20px_50px_rgba(31,38,135,0.1)] hover:bg-white/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(31,38,135,0.15)]'
                                }`}
                        >

                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                                    }`}>
                                    {task.title}
                                </h3>
                                <div className="mt-2 mb-3">
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${task.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
                                        }`}>
                                        {task.completed ? 'Finished' : 'In Progress'}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm mt-1">{task.description}</p>
                                <p className="text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-tight">
                                    {new Date(task.created_at).toLocaleDateString()}
                                </p>

                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onToggleComplete(task.id, !task.completed)}
                                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm 
                                    ${task.completed
                                            ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                                        }`}
                                >
                                    {task.completed ? 'Undo' : 'Done'}
                                </button>

                                <button
                                    onClick={() => onDeleteTask(task.id)}
                                    className="px-4 py-1.5 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-bold uppercase transition-colors"
                                >
                                    Delete
                                </button>

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
