import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Login from "./Login.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div>
			<nav class="navbar bg-body-tertiary">
				<div class="container-fluid">
					<img src="..." />
					<form class="d-flex" role="search">
						<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button class="btn btn-outline-success" type="submit"><i class="fa-solid fa-bookmark"></i></button>
						<button class="btn btn-outline-success" type="submit"><i class="fa-solid fa-user"></i></button>
					</form>
				</div>
			</nav>


			<div class="container text-center">
				<div class="row row-cols-12">
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col-6">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
					<div class="col">Column</div>
				</div>
			</div>

		</div>


	);
}; 