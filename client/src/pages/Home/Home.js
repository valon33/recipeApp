import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spiner from "../../components/Spiner/Spiner";
import { useGlobalContext } from "../../Context/context";

const Home = () => {
  const { getRecipes, allRecipes, loading, currentUser, recipeLikes, error } =
    useGlobalContext();

  useEffect(() => {
    getRecipes();
  }, [recipeLikes]);

  return (
    <MainLayout>
      <PageTitle description="Fresh & New" />
      <div className="recipe-cards">
        {loading && <Spiner />}
        {allRecipes &&
          allRecipes.map((recipe) => {
            //   allRecipes.map((recipe) => {
            const liked =
              recipe.likes.filter((rec) => rec.user === currentUser._id)
                .length > 0;
            return (
              <Card
                category={recipe.category}
                recipeTitle={recipe.recipeTitle}
                numberPeople={recipe.numberPeople}
                prepTime={recipe.prepTime}
                shortDescription={recipe.shortDescription}
                likes={recipe.likes}
                photo={recipe.photo}
                id={recipe._id}
                liked={liked}
              />
            );
          })}
      </div>
      <PageTitle description="Most Popular Recipes" />
      <div className="recipe-cards">
        <Card />
      </div>
    </MainLayout>
  );
};

export default Home;
