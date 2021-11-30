import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyRecipes from "./pages/MyRecipes/MyRecipes";

const RecipeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
        </Routes>
    );
};

export default RecipeRoutes;
