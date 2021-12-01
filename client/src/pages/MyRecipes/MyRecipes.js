import React from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";

import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";

const MyRecipes = () => {
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
                <div className="myrecipe" key="{recipe.id}">
                    <div className="myrecipe__box">
                        <p className="myrecipe__title">
                            <Link to={"recipe.id"}>Pasul me mish lope</Link>
                        </p>
                        <span className="badge green myrecipe__badge ">
                            <Link to={"recipe.category"}>lunch</Link>
                        </span>
                        <p className="myrecipe__date">30.11.2021</p>
                    </div>
                    <RiDeleteBin5Line
                        className="myrecipe__icon"
                        onClick={() => console.log("dewecd jsdmkjs")}
                    />
                </div>

                <div className="myrecipe" key="{recipe.id}">
                    <div className="myrecipe__box">
                        <p className="myrecipe__title">
                            <Link to={"recipe.id"}>Pasul me mish lope</Link>
                        </p>
                        <span className="badge green myrecipe__badge ">
                            <Link to={"recipe.category"}>lunch</Link>
                        </span>
                        <p className="myrecipe__date">30.11.2021</p>
                    </div>
                    <RiDeleteBin5Line
                        className="myrecipe__icon"
                        onClick={() => console.log("dewecd jsdmkjs")}
                    />
                </div>
                <div className="myrecipe" key="{recipe.id}">
                    <div className="myrecipe__box">
                        <p className="myrecipe__title">
                            <Link to={"recipe.id"}>Pasul me mish lope</Link>
                        </p>
                        <span className="badge green myrecipe__badge ">
                            <Link to={"recipe.category"}>lunch</Link>
                        </span>
                        <p className="myrecipe__date">30.11.2021</p>
                    </div>
                    <RiDeleteBin5Line
                        className="myrecipe__icon"
                        onClick={() => console.log("dewecd jsdmkjs")}
                    />
                </div>
                <div className="myrecipe" key="{recipe.id}">
                    <div className="myrecipe__box">
                        <p className="myrecipe__title">
                            <Link to={"recipe.id"}>Pasul me mish lope</Link>
                        </p>
                        <span className="badge green myrecipe__badge ">
                            <Link to={"recipe.category"}>lunch</Link>
                        </span>
                        <p className="myrecipe__date">30.11.2021</p>
                    </div>
                    <RiDeleteBin5Line
                        className="myrecipe__icon"
                        onClick={() => console.log("dewecd jsdmkjs")}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default MyRecipes;
