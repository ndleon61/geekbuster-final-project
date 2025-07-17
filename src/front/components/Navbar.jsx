import { Link } from "react-router-dom";
import logo from "../assets/img/logo_lands.png"
import "../../styles/Navbar.css"

export const Navbar = () => {

	return (
		<nav className="navbar">
  	`		<div className="container-fluid">
    			<a className="navbar-brand" href="/home">
      			<img src={logo} alt="" />
    			</a>
  			</div>
		</nav>
		
	);
};