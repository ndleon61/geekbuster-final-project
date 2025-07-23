import React from 'react';
import "../styles/Header.css"

const Header = () => {
  return (
    <div className='header-container'>
        <h1>Welcome to GeekBusters</h1>
			<div className="icons-container">
				<i className="fa-solid fa-ticket-simple moving-icon"></i>
				<i className="fa-solid fa-ticket-simple moving-icon"></i>
				<i className="fa-solid fa-film moving-icon"></i>
				<i className="fa-solid fa-film moving-icon"></i>
				<i className="fa-solid fa-video moving-icon"></i>
				<i className="fa-solid fa-video moving-icon"></i>
			</div>
    </div>
  )
};

export default Header;