import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalContext } from "../../Context/context";

const Home = () => {
    const { allRecipes, loading, currentUser, error } = useGlobalContext();
    const [mostLikRecipes, setMostLikRecipes] = useState([]);
    const [newRecipes, setNewRecipes] = useState([]);

    useEffect(() => {
        // if (allRecipes) {
            const m = mostLikedRecipes(allRecipes);
            setMostLikRecipes(m);
            setNewRecipes(newestRecipe(allRecipes));
        // }
    }, [allRecipes]);

    console.log(allRecipes, mostLikRecipes, newRecipes);

    const mostLikedRecipes = (data) => {
        return data.sort((a, b) => {
            // return a.likes.length - b.likes.length;
            if (a.likes < b.likes) {
                return 1;
            }
            if (a.likes > b.likes) {
                return -1;
            }
            return 0;
        });
    };

    const newestRecipe = (data) => {
        return data
            .sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                return 0;
            })
            .slice(0, 3);
    };

    return (
        <MainLayout>
            <PageTitle description="Fresh & New" />
            <div className="recipe-cards">
                {loading && <Spinner />}
                {newRecipes &&
                    newRecipes.map((recipe) => {
                        //   allRecipes.map((recipe) => {
                        const liked =
                            recipe.likes.filter(
                                (rec) => rec.user === currentUser._id
                            ).length > 0;
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
                {/* {allRecipes &&
                    allRecipes.map((recipe) => {
                        //   allRecipes.map((recipe) => {
                        const liked =
                            recipe.likes.filter(
                                (rec) => rec.user === currentUser._id
                            ).length > 0;
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
                    })} */}
            </div>
            <PageTitle description="Most Popular Recipes" />
            <div className="recipe-cards">
                {loading && <Spinner />}
                {mostLikRecipes &&
                    mostLikRecipes.map((recipe) => {
                        //   allRecipes.map((recipe) => {
                        const liked =
                            recipe.likes.filter(
                                (rec) => rec.user === currentUser._id
                            ).length > 0;
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

export default Home;
