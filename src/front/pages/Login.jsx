import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/Login.css";

const Login = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);
    const [step, setStep] = useState(1);
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.access_token) {
            dispatch({
                type: "LOGIN",
                payload: { token: data.access_token, user: data.user }
            });
            navigate("/home");
        } else {
            alert("Login failed");
        }
    }

    const handleGetSecurityQuestion = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                const data = await res.json();
                setSecurityQuestion(data.security_question);
                setStep(2);
            } else {
                const err = await res.json();
                alert("If the email is found, a security question will be shown.");
            }
        } catch (err) {
            console.error(err);
            alert("Error fetching security question");
        }
    };

    const handleResetPassword = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    security_answer: securityAnswer,
                    new_password: newPassword
                })
            });

            if (res.ok) {
                alert("Password reset successfully. Please log in.");
                setShowResetForm(false);
                setStep(1);
                setSecurityAnswer("");
                setNewPassword("");
                setSecurityQuestion("");
            } else {
                const err = await res.json();
                alert(err.msg || "Failed to reset password");
            }
        } catch (err) {
            console.error(err);
            alert("Error resetting password");
        }
    };

    return (
        <div className='login-page'>
            <div className='login-content-wrapper'>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <h2>Login</h2>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required />
                    <button type='submit' className='btn btn-primary'>Login</button>

                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    <p>
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => setShowResetForm(!showResetForm)}
                        >
                            {showResetForm ? "Cancel" : "Forgot your password?"}
                        </button>
                    </p>
                </form>

                {showResetForm && (
                    <div className="auth-form">
                        <h4>Reset Password</h4>
                        {step === 1 ? (
                            <>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="btn btn-info" onClick={handleGetSecurityQuestion}>Next</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Security Question:</strong> {securityQuestion}</p>
                                <input
                                    type="text"
                                    placeholder="Answer"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={handleResetPassword}>Submit</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;