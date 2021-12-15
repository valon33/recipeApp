import React from "react";
import Card from "../Card/Card";

const CardList = ({ recipes, currentUser }) => {
    return (
        <>
            {recipes.map((recipe) => {
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
        </>
    );
};

export default CardList;
