import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/EditProfile.css"

const EditProfile = () => {

    const {store, dispatch} = useGlobalReducer();
    const [image, setImage] = useState ([]);
   

    const chanheImage = () => {

    };

  return (
    <div className='container-fluid profile'>
       <h3>{store.user?.full_name || "Guest"}</h3>
       <h4>{store.user?.email}</h4>
       <img src={store.image?.image_1} alt="" />
       <button className='btn btn-warning'>Change image</button>
       <div className='images'>

            <div className="image-container">
                <img src={store.image?.image_1} alt="" />
                <button>Select</button>
            </div>
            <div className="image-container">
                <img src={store.image?.image_2} alt="" />
                <button>Select</button>
            </div>
            <div className="image-container">
                <img src={store.image?.image_3} alt="" />
                <button>Select</button>
            </div>
            <div className="image-container">
                <img src={store.image?.image_4} alt="" /> 
                <button>Select</button>
            </div>
            
            
       </div>
       
    </div>
  )
};

export default EditProfile;