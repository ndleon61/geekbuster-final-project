import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showImages, setShowImages] = useState(false);

  const handleImageChange = (imageUrl) => {
    dispatch({
      type: "set_image",
      payload: imageUrl
    });
    setShowImages(false);
  };

  return (
    <div className='container-fluid profile'>
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
        <button className='btn btn-primary btn-password'>Change Password</button>
    </div>
  );
};

export default EditProfile;