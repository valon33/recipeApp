import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import UpdateRecipe from "./pages/UpdateRecepie/UpdateRecipe";
import SortedRecipe from "./pages/SortedRecipe/SortedRecipe";
import Error from "./pages/Error/Error";

const RecipeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path="/myrecipes/:id" element={<UpdateRecipe />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/:category" element={<SortedRecipe />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default RecipeRoutes;
