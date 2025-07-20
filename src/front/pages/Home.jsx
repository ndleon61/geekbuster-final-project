import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/Home.css";
import logo from "../assets/img/logo_lands.png"



export const Home = () => {
	const { store } = useGlobalReducer();

	return (
		<div className="home-container">
			<h1 className=" neon-text mb-4" data-text="">Welcome to GeekBusters </h1>
			
			
		</div>
	);
};