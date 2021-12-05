import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spiner from "../../components/Spiner/Spiner";
import { useGlobalContext } from "../../Context/context";

const Home = () => {
    const { getRecipes, allRecipes, loading, currentUser, error } =
        useGlobalContext();

    useEffect(() => {
        getRecipes();
    }, []);
    console.log("Frome Home =>", currentUser);
    console.log("Frome Home =>", error);
    console.log("Frome Home =>", allRecipes);
    return (
        <MainLayout>
            <PageTitle description="Fresh & New" />
            <div className="recipe-cards">
                {loading && <Spiner />}
                {allRecipes &&
                    allRecipes.map((recipe) => (
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
            <PageTitle description="Most Popular Recipes" />
            <div className="recipe-cards">
                <Card />
            </div>
        </MainLayout>
    );
};

export default Home;
