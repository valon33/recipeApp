import React, { useEffect, useState } from "react";
import _ from "lodash";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import CardList from "../../components/CardList/CardList";
// import { useGlobalContext } from "../../Context/context";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipes,
  newest,
  mostLiked,
} from "../../features/recipes/recipeSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Home = () => {
  //   const { allRecipes, loading, currentUser, recipeLikes } = useGlobalContext();
  const { user, isLoggedIn, token } = useSelector((state) => state.auth);
  const { allRecipes, loading, newestRecipes, mostLikedRecipes } = useSelector(
    (state) => state.recipe
  );
  const { setValue: setToken } = useLocalStorage("token", null);
  const dispatch = useDispatch();

  console.log("Home", token);
  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  useEffect(() => {
    dispatch(getRecipes());
    token !== null && token !== "" && setToken(token);
  }, [token]);

  useEffect(() => {
    dispatch(mostLiked());
    dispatch(newest());
  }, [allRecipes]);

  return (
    <MainLayout>
      <PageTitle description="Fresh & New" />
      <div className="recipe-cards">
        {loading && <Spinner />}
        {newestRecipes && (
          <CardList recipes={newestRecipes} currentUser={user} />
        )}
      </div>

      <PageTitle description="Most Popular Recipes" />
      <div className="recipe-cards">
        {loading && <Spinner />}

        {mostLikedRecipes && (
          <CardList recipes={mostLikedRecipes} currentUser={user} />
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
