import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import "../styles/Login.css"

const Login = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.access_token) {
            dispatch({
                type: "LOGIN",
                payload: { token: data.access_token, user: { email } }
            });
            navigate("/home")
        } else {
            alert("Login failed")
        }
    }
    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit} className='login-form-container'>
                <h2>Login</h2>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder='Email' required />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' required />
                <button type='submit' className='btn btn-primary'>Login</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

            </form>
        </div>
    )
};

export default Login;