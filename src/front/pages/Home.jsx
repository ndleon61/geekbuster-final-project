import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/Home.css";
import Banner from "../components/Banner";
import Mov from "../components/Mov"; 
import Header from "../components/Header"

export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="home-container">
      <Header />
      <Banner />
      <Mov />
      <Header />
      
    </div>
  );
};
