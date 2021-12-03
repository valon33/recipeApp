import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Spiner from "../../components/Spiner/Spiner";

import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { useGlobalContext } from "../../Context/context";

const MyRecipes = () => {
    const { myRecipes, getMyRecipes, deleteRecipe } = useGlobalContext();
    useEffect(() => {
        getMyRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(myRecipes);
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
            <div className="myreicipes__desc">
                <div className="myreicipes__desc--box">
                    <p className="myreicipes__desc--name ">Recipe Name</p>
                    <p>Category</p>
                    <p>Created on</p>
                </div>
                <p>Delete</p>
            </div>
            <div>
                {!myRecipes && <Spiner />}
                {myRecipes &&
                    myRecipes.map((recipe) => {
                        return (
                            <div className="myrecipe" key={recipe._id}>
                                <div className="myrecipe__box">
                                    <p className="myrecipe__title">
                                        <Link
                                            // to={`/myrecipe/${recipe.slug}`}
                                            // onClick={() => getRecipe(recipe._id)}
                                            to={`/updaterecipe/${recipe._id}`}
                                        >{`${recipe.recipeTitle.slice(
                                            0,
                                            25
                                        )}...`}</Link>
                                    </p>
                                    <span className="badge green myrecipe__badge ">
                                        <Link to={recipe.category}>
                                            {recipe.category}
                                        </Link>
                                    </span>
                                    {/* <p className="myrecipe__date">28.07.2021</p> */}
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
                                    onClick={() => deleteRecipe(recipe._id)}
                                />
                            </div>
                        );
                    })}
            </div>
        </MainLayout>
    );
};

export default MyRecipes;
