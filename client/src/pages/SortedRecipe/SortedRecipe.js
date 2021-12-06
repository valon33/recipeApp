import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "../../components/Card/Card";
import { useGlobalContext } from "../../Context/context";

const SortedRecipe = () => {
  const { allRecipes } = useGlobalContext();
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();
  useEffect(() => {
    const catRecipes = allRecipes.filter(
      (recepis) => recepis.category === category
    );
    setCategoryRecipes(catRecipes);
  }, [category]);
  return (
    <MainLayout>
      <PageTitle description={category.toUpperCase()} />
      <div className="recipe-cards">
        {categoryRecipes &&
          categoryRecipes.map((recipe) => (
            <Card
              category={recipe.category}
              recipeTitle={recipe.recipeTitle}
              author={recipe.author}
              numberPeople={recipe.numberPeople}
              prepTime={recipe.prepTime}
              recipe={recipe.recipe}
              shortDescription={recipe.shortDescription}
              likes={recipe.likes}
              photo={recipe.photo}
              slug={recipe.slug}
              id={recipe._id}
            />
          ))}
      </div>
      <h1>Sorted Recipe by {category}</h1>
      <button onClick={() => navigate("/myrecipes")}>go back</button>
    </MainLayout>
  );
};

export default SortedRecipe;
