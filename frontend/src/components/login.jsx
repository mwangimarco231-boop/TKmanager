import React, { useState } from 'react';
import { taskAPI } from '../services/api';

const Login = ({ onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await taskAPI.login({ username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.reload();
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <form onSubmit={handleLogin} className="space-y-6">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Login</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                    Login
                </button>

                <p className="text-center text-gray-600">
                    Don't have an account?
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="ml-2 text-blue-600 font-semibold hover:underline"
                    >
                        Register here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
