import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Signup.css"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("What is your mother's maiden name?");
    const [securityAnswer, setSecurityAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    email, 
                    password, 
                    full_name: fullName,
                    security_question: securityQuestion,
                    security_answer: securityAnswer
                })
            });

            if (res.ok) {
                alert("Signup successful");
                navigate("/");
            } else {
                const errorData = await res.json();
                alert(errorData.msg || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during signup");
        }
    };

    return (
        <div className='signup-page'>
            <form className='signup-form-container' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input type="text" placeholder='Full Name' onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />

                <select value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required>
                    <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                    <option value="What was your first pet's name?">What was your first pet's name?</option>
                    <option value="What city were you born in?">What city were you born in?</option>
                </select>
                <input type="text" placeholder="Answer to security question" onChange={(e) => setSecurityAnswer(e.target.value)} required />

                <button type='submit' className='btn btn-success'>Register</button>
                <p>Already a member? <Link to="/">Login instead</Link></p>
            </form>
        </div>
    );
};

export default Signup;