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
			setSearch(""); // optional: reset after search
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
				<Link className="navbar-brand" to="/home">
					<img src={logo} alt="Logo" />
				</Link>

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
									<button
										className="nav-link dropdown-toggle btn btn-link"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Genre
									</button>
									<ul className="dropdown-menu">
										<li><Link to="/genre?query=Action" className="dropdown-item">Action</Link></li>
										<li><Link to="/genre?query=Comedy" className="dropdown-item">Comedy</Link></li>
										<li><Link to="/genre?query=Drama" className="dropdown-item">Drama</Link></li>
										<li><Link to="/genre?query=Horror" className="dropdown-item">Horror</Link></li>
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
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
									<button className="btn btn-outline-warning search-btn" type="submit">
										<i className="fa-solid fa-magnifying-glass"></i>
									</button>
								</form>
							</>
						)}

						<li className="nav-item dropdown profile-menu ms-auto">
							<button
								className="nav-link dropdown-toggle btn btn-link"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<span>{store.user?.full_name || "Guest"}</span>
								<img
									src={store.image?.image_1 || "/default-profile.png"}
									alt="User profile"
									id="user-image"
								/>
							</button>
							<ul className="dropdown-menu" id="profile-menu">
								<li><Link to="/edit-profile" className="dropdown-item">Edit Profile</Link></li>
								<li>
									<button onClick={handleLogout} className="dropdown-item">
										Sign Out <i className="fa-solid fa-right-from-bracket ms-2"></i>
									</button>
								</li>
							</ul>
						</li>
					</div>
				</div>
			</div>
		</nav>
	);
};