import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const RecipeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<h1>Login</h1>} />
    </Routes>
  );
};

export default RecipeRoutes;
