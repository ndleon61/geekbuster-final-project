import { Link } from "react-router-dom";
import logo from "../assets/img/logo_lands.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css"


export const Navbar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search.trim())}`);
        }
    };

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<a className="navbar-brand" href="/home">
                <img src={logo} alt="" />
                </a>
				
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav nav-links">
					<Link to="/home" className="nav-link">Home</Link>
					<Link to="/favorites" className="nav-link">Favorites</Link>	
					<form className="d-flex" role="search" onSubmit={handleSubmit}>
					<input 
					className="form-control me-2" 
					type="search" 
					placeholder="Search" 
					aria-label="Search"
					onChange={(e) => setSearch(e.target.value)}
					/>
					<button 
					className="btn btn-outline-warning" 
					type="submit">Search</button>
				</form>
				</div>
				<div className="navbar-nav ms-auto">
					<button className="btn btn-danger">Sign Out</button>
				</div>
				</div>
			</div>
		</nav>
		
	);
};