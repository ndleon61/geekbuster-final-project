import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo_lands.png";
import { useState } from "react";
import "../styles/Navbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/search?query=${encodeURIComponent(search.trim())}`);
		}
	};

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/");
	};

	const isLoggedIn = !!store.token;

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<a className="navbar-brand" href="/home">
					<img src={logo} alt="Logo" />
				</a>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav nav-links">
						{isLoggedIn && (
							<>
								<Link to="/home" className="nav-link">
									<i className="fa-solid fa-house"></i>
								</Link>
								<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Genre
								</a>
									<ul className="dropdown-menu">
										<Link to="/genre?query=Action" className="dropdown-item">Action</Link>
										<Link to="/genre?query=Comedy" className="dropdown-item">Comedy</Link>
										<Link to="/genre?query=Drama" className="dropdown-item">Drama</Link>
										<Link to="/genre?query=Horror" className="dropdown-item">Horror</Link>
									</ul>
								</li>
								<Link to="/favorites" className="nav-link">
									Favorites
								</Link>
								
								<form className="d-flex" role="search" onSubmit={handleSubmit}>
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
										onChange={(e) => setSearch(e.target.value)}
									/>
									<button className="btn btn-outline-warning search-btn" type="submit">
										<i className="fa-solid fa-magnifying-glass"></i>
									</button>
								</form>
								<button className="btn btn-danger ms-auto" onClick={handleLogout} id="logoutBtn">
									Sign Out<i className="fa-solid fa-right-from-bracket"></i>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};