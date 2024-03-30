import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const Signup = ({ setUser }) => {
    const [loginPage, setLoginPage] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/user/${loginPage ? "login" : "register"}`, {
                username,
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            toast.success(loginPage ? "Login Successful" : "Register Successful")
        } catch (err) {
            toast.error("Internal Server Error")
            console.error(err);
            
        }
    };

    return (
        <div className='mt-8 border rounded-md p-4 max-w-[400px] mx-auto relative border-blue-500 bg-slate-50'>
            <h2 className="text-lg mb-4 text-center">
                {loginPage ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit}>
                {!loginPage &&
                    <div className="mb-4 relative">
                        <label className="block text-sm absolute text-white left-3 -top-3 px-1 border border-blue-500 bg-blue-500 rounded-md" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="border border-blue-500 rounded-md p-2 w-full outline-none"
                            value={username}
                            onChange={handleChange}
                            required
                        />
                    </div>}
                <div className="mb-4 relative">
                    <label className="block text-sm absolute text-white left-3 -top-3 px-1 border border-blue-500 bg-blue-500 rounded-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="border border-blue-500 rounded-md p-2 w-full outline-none"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-sm absolute bg-blue-500 left-3 -top-3 px-1 border border-blue-500 text-white rounded-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border border-blue-500 rounded-md p-2 w-full outline-none"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    {loginPage ? "Don't have an account?" : "Already have an account?"}
                    <span className='text-blue-500 ml-1 cursor-pointer' onClick={() => setLoginPage(!loginPage)}>
                        {loginPage ? "Register" : "Login"}
                    </span>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 text-center">
                    {loginPage ? "Login" : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
