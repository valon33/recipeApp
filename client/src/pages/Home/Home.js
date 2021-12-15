import React, { useEffect, useState } from "react";
import _ from "lodash";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import CardList from "../../components/CardList/CardList";
import { useGlobalContext } from "../../Context/context";

const Home = () => {
    const { allRecipes, loading, currentUser, recipeLikes } =
        useGlobalContext();
    const [mostLikedRecipes, setMostLikedRecipes] = useState([]);
    const [newestRecipes, setNewestRecipes] = useState([]);

    useEffect(() => {
        const m = _.sortBy(allRecipes, ["likes"]).reverse();
        const n = _.sortBy(allRecipes, ["createdAt"]).reverse().slice(0, 3);
        setMostLikedRecipes(m);
        setNewestRecipes(n);
    }, [allRecipes, recipeLikes]);

    return (
        <MainLayout>
            <PageTitle description="Fresh & New" />
            <div className="recipe-cards">
                {loading && <Spinner />}
                {newestRecipes && (
                    <CardList
                        recipes={newestRecipes}
                        currentUser={currentUser}
                    />
                )}
            </div>

            <PageTitle description="Most Popular Recipes" />
            <div className="recipe-cards">
                {loading && <Spinner />}

                {mostLikedRecipes && (
                    <CardList
                        recipes={mostLikedRecipes}
                        currentUser={currentUser}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default Home;
