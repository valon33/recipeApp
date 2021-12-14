import React, { useEffect, useState } from "react";
import _ from "lodash";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalContext } from "../../Context/context";

const Home = () => {
    const { allRecipes, loading, currentUser, recipeLikes } =
        useGlobalContext();
    const [mostLikedRecipes, setMostLikedRecipes] = useState([]);
    const [newestRecipes, setNewestRecipes] = useState([]);

    useEffect(() => {
        const m = _.sortBy(allRecipes, ["likes"]).reverse();
        setMostLikedRecipes(m);
        const n = _.sortBy(allRecipes, ["createdAt"]).reverse().slice(0, 3);
        setNewestRecipes(n);
    }, [allRecipes, recipeLikes]);

    return (
        <MainLayout>
            <PageTitle description="Fresh & New" />
            <div className="recipe-cards">
                {loading && <Spinner />}
                {newestRecipes &&
                    newestRecipes.map((recipe) => {
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
            <PageTitle description="Most Popular Recipes" />
            <div className="recipe-cards">
                {loading && <Spinner />}
                {mostLikedRecipes &&
                    mostLikedRecipes.map((recipe) => {
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
