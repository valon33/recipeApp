import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalContext } from "../../Context/context";

const SortedRecipe = () => {
  const { allRecipes, currentUser } = useGlobalContext();
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    const catRecipes = allRecipes.filter(
      (recepis) => recepis.category === category
    );
    setCategoryRecipes(catRecipes);
  }, [category, allRecipes]);

  return (
    <MainLayout>
      <PageTitle description={category.toUpperCase()} />
      <div className="recipe-cards">
        {!categoryRecipes && <Spinner />}
        {categoryRecipes &&
          categoryRecipes.map((recipe) => {
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
