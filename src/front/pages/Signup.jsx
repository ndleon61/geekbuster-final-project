import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../../styles/Signup.css"

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://sturdy-sniffle-6v9vqq46jxcp6q-3001.app.github.dev/api/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            if (res.ok) {
                alert("Signup successfull");
                navigate("/");
            }else {
                const errorData = await res.json();
                alert(errorData.msg || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("An error occured during signup")
        }
    }

  return (
     <form  className='container signup-container' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input type="email"  placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"  placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='btn btn-success'>Register</button>
        <p>Already a member? <Link to="/">Login instead</Link></p>
       
        
    </form>
  )
};

export default Signup;