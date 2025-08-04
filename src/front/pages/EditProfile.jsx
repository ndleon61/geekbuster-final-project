import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showImages, setShowImages] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleImageChange = (imageUrl) => {
    dispatch({
      type: "set_image",
      payload: imageUrl
    });
    setShowImages(false);
  };

  const handleGetSecurityQuestion = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        const data = await res.json();
        setSecurityQuestion(data.security_question);
        setStep(2);
      } else {
        const err = await res.json();
        alert(err.msg || "Failed to find user");
      }
    } catch (err) {
      console.error(err);
      alert("Error retrieving security question");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          security_answer: securityAnswer,
          new_password: newPassword
        })
      });

      if (res.ok) {
        alert("Password successfully reset!");
        setShowPasswordForm(false);
        setStep(1);
        setEmail("");
        setSecurityAnswer("");
        setNewPassword("");
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
      <div className='container-fluid profile'>
        <div className="floating-icons">
          <i className="fa-solid fa-video floating-icon float-delay-1 float-speed-1" style={{ animationName: "floatFadeScale", top: "10%", left: "-5%" }} />
          <i className="fa-solid fa-video floating-icon float-delay-2 float-speed-2" style={{ animationName: "floatFadeScale", top: "30%", left: "-10%" }} />
          <i className="fa-solid fa-video floating-icon float-delay-3 float-speed-3" style={{ animationName: "floatFadeScale", top: "50%", left: "-15%" }} />

          <i className="fa-solid fa-ticket floating-icon float-delay-1 float-speed-2" style={{ animationName: "floatFadeScale", top: "25%", left: "-10%" }} />
          <i className="fa-solid fa-ticket floating-icon float-delay-2 float-speed-1" style={{ animationName: "floatFadeScale", top: "60%", left: "-12%" }} />
          <i className="fa-solid fa-ticket floating-icon float-delay-3 float-speed-3" style={{ animationName: "floatFadeScale", top: "90%", left: "-20%" }} />

          <i className="fa-solid fa-clapperboard floating-icon float-delay-1 float-speed-3" style={{ animationName: "floatFadeScale", top: "15%", left: "-8%" }} />
          <i className="fa-solid fa-clapperboard floating-icon float-delay-2 float-speed-2" style={{ animationName: "floatFadeScale", top: "55%", left: "-15%" }} />
          <i className="fa-solid fa-clapperboard floating-icon float-delay-3 float-speed-1" style={{ animationName: "floatFadeScale", top: "75%", left: "-5%" }} />

          <i className="fa-solid fa-film floating-icon float-delay-1 float-speed-2" style={{ animationName: "floatFadeScale", top: "5%", left: "-10%" }} />
          <i className="fa-solid fa-film floating-icon float-delay-2 float-speed-3" style={{ animationName: "floatFadeScale", top: "40%", left: "-20%" }} />
          <i className="fa-solid fa-film floating-icon float-delay-3 float-speed-1" style={{ animationName: "floatFadeScale", top: "85%", left: "-15%" }} />
      </div>
      <div>
        <h3>{store.user?.full_name || "Guest"}</h3>
        <img
          src={store.image?.selected || store.image?.image_1}
          alt="Profile"
          className="profile-picture"
        />

        <button
          className='btn btn-warning mt-3'
          onClick={() => setShowImages(!showImages)}
        >
          {showImages ? "Cancel" : "Change image"}
        </button>

        {showImages && (
          <div className='images'>
            {[1, 2, 3, 4, 5].map(num => (
              <div className="image-container" key={num}>
                <img
                  src={store.image?.[`image_${num}`]}
                  alt={`Option ${num}`}
                  className={`option-avatar ${store.image?.selected === store.image?.[`image_${num}`] ? "selected" : ""}`}
                />
                <button
                  className="btn btn-sm btn-outline-primary mt-1 btn-select"
                  onClick={() => handleImageChange(store.image?.[`image_${num}`])}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className='btn btn-primary btn-password mt-4'
        onClick={() => {
          setShowPasswordForm(!showPasswordForm);
          setStep(1);
          setEmail("");
          setSecurityQuestion("");
          setSecurityAnswer("");
          setNewPassword("");
        }}
      >
        {showPasswordForm ? "Close Password Reset" : "Change Password"}
      </button>

      {showPasswordForm && (
        <div className="password-reset-form mt-3">
          {step === 1 ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-info" onClick={handleGetSecurityQuestion}>Next</button>
            </>
          ) : (
            <>
              <p><strong>Security Question:</strong> {securityQuestion}</p>
              <input
                type="text"
                placeholder="Answer"
                className="form-control mb-2"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="form-control mb-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button className="btn btn-success" onClick={handleResetPassword}>Submit</button>
            </>
          )}
        </div>
        
      )}
    </div>
  );
};

export default EditProfile;