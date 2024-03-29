import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spinner from "../../components/Spinner/Spinner";

import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getMyRecipes, deleteRecipe } from "../../features/recipes/recipeSlice";

const MyRecipes = () => {
    const { myRecipes } = useSelector((state) => state.recipe);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyRecipes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainLayout>
            <PageTitle
                description="My Recipies"
                logo={
                    <Link to="/create">
                        <MdAddCircle />
                    </Link>
                }
            />
            <div className="myrecipes__desc">
                <div className="myrecipes__desc--box">
                    <p className="myrecipes__desc--name ">Recipe Name</p>
                    <p>Category</p>
                    <p>Created on</p>
                </div>
                <p>Delete</p>
            </div>
            <div>
                {!myRecipes && <Spinner />}
                {myRecipes &&
                    myRecipes.map((recipe) => {
                        return (
                            <div className="myrecipe" key={recipe._id}>
                                <div className="myrecipe__box">
                                    <p className="myrecipe__title">
                                        <Link
                                            to={`/myrecipes/${recipe._id}`}
                                        >{`${recipe.recipeTitle.slice(
                                            0,
                                            25
                                        )}...`}</Link>
                                    </p>
                                    <span className="badge green myrecipe__badge ">
                                        <Link to={`/${recipe.category}`}>
                                            {recipe.category}
                                        </Link>
                                    </span>
                                    <p className="myrecipe__date">
                                        {recipe.createdAt
                                            ? new Date(
                                                  recipe.createdAt
                                              ).toLocaleDateString()
                                            : ""}
                                    </p>
                                </div>
                                <RiDeleteBin5Line
                                    className="myrecipe__icon"
                                    onClick={() =>
                                        dispatch(deleteRecipe(recipe._id))
                                    }
                                />
                            </div>
                        );
                    })}
            </div>
        </MainLayout>
    );
};

export default MyRecipes;
