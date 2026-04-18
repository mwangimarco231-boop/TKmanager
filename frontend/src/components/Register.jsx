import React, { useState } from 'react';
import { taskAPI } from '../services/api';

const Register = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await taskAPI.register(formData);
            alert("Registration successful! You can now login.");
            onSwitchToLogin();
        } catch (error) {
            alert("Registration failed. Username might be taken.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Create Account</h2>
                <div className="space-y-4">
                    <input
                        type="text" placeholder="Username" required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        type="email" placeholder="Email (Optional)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" placeholder="Password" required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
                    Register
                </button>
                <p className="text-center text-gray-600">
                    Already have an account?
                    <button onClick={onSwitchToLogin} className="ml-2 text-blue-600 font-semibold hover:underline">
                        Login here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;