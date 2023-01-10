import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, sorted } from "../../features/recipes/recipeSlice";

const SortedRecipe = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { allRecipes, sortedRecipes } = useSelector((state) => state.recipe);
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRecipes.length === 0) dispatch(getRecipes());
  }, []);

  useEffect(() => {
    dispatch(sorted(category));
  }, [category, allRecipes]);

  const heigt = sortedRecipes.length === 0 && "45vh";

  return (
    <MainLayout>
      <PageTitle description={category.toUpperCase()} />
      <div className="recipe-cards" style={{ minHeight: heigt }}>
        {!sortedRecipes && <Spinner />}
        {sortedRecipes &&
          sortedRecipes.map((recipe) => {
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
    </MainLayout>
  );
};

export default SortedRecipe;
