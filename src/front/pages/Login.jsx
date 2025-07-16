import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../../styles/Login.css"

const Login = () => {
    const {dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch ("https://sturdy-sniffle-6v9vqq46jxcp6q-3001.app.github.dev/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();

        if (data.access_token) {
            dispatch({
                type: "LOGIN",
                payload: {token: data.access_token, user: {email}}
            });
            navigate("/home")
        }else {
            alert("Login failed")
        }
    }
  return (
    <form onSubmit={handleSubmit} className='container'>
        <h2>Login</h2>
        <input type="email" onChange={e => setEmail(e.target.value)} placeholder='Email' required/>
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' required />
        <button type='submit' className='btn btn-primary'>Login</button>
    </form>
  )
};

export default Login;