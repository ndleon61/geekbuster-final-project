import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/Home.css";
import Banner from "../components/Banner";
import Mov from "../components/Mov"; 


export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="home-container">
      <Banner />
      <Mov />
      <h1 className="neon-text mb-4" data-text="Welcome to GeekBusters">
        Welcome to GeekBusters
      </h1>
    </div>
  );
};
