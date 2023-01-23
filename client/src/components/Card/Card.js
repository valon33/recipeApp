import React, { useState, useEffect } from "react";
import {
    IoRestaurantSharp,
    IoStarOutline,
    IoTimeOutline,
} from "react-icons/io5";
import { TiArrowForward } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { openModal, unLikeRecipe } from "../../features/util/utilSlice";
import { likeRecipe } from "../../features/recipes/recipeSlice";

const Card = ({
    category,
    recipeTitle,
    numberPeople,
    prepTime,
    shortDescription,
    likes,
    photo,
    id,
}) => {
    // const { openModal, likeRecipe, unlikeRecipe } = useGlobalContext();
    const [recipe, setRecipe] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const { allRecipes, likedrecipe, myRecipes, loading } = useSelector(
        (state) => state.recipe
    );
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const baseUrl = "https://recipe-app-backend-4xd6.onrender.com";

    useEffect(() => {
        setRecipe({
            category,
            recipeTitle,
            numberPeople,
            prepTime,
            shortDescription,
            likes,
            photo,
            id,
        });
    }, []);

    useEffect(() => {
        const like =
            recipe.likes?.filter((rec) => rec.user === user?._id).length > 0;
        // const like = likes?.filter((rec) => rec.user === user?._id).length > 0;
        setIsLiked(like);
    }, [recipe]);

    const toggleLikeRecepies = async () => {
        if (isLiked === false) {
            const newRecipe = await dispatch(likeRecipe(recipe.id)).unwrap();
            setIsLiked(true);
            console.log("newRecipe", newRecipe);
            setRecipe(newRecipe.data.data.likedRecipe);
        } else if (isLiked === true) {
            dispatch(unLikeRecipe(id));
            const unlikRecipe = await dispatch(
                unLikeRecipe(recipe._id)
            ).unwrap();
            // console.log("unlikRecipe", unlikRecipe);
            setIsLiked(false);
            setRecipe(unlikRecipe.data.data.unlikedRecipe);
        }
    };

    const open = () => {
        const recipe = allRecipes?.filter((rec) => rec._id === id)[0];
        dispatch(openModal(recipe));
    };

    console.log(`${id}`, isLiked);

    return (
        <div className="card">
            <div className="card__img">
                <span className="badge green card__badge">
                    {recipe.category}
                </span>
                <img
                    src={
                        photo
                            ? `${baseUrl}/api/v1/upload/${photo}`
                            : "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/08/20/0/FNM_100120-Ultimate-Beef-Stew_s4x3.jpg.rend.hgtvcom.406.305.suffix/1597931275143.jpeg"
                    }
                    className="card-img-top"
                    alt="card img"
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{recipe.recipeTitle}</h5>
                <p className="card-text">
                    {recipe.shortDescription &&
                        recipe.shortDescription.slice(0, 200)}
                </p>
            </div>
            <div className="card--footer">
                <div className="card--icons">
                    <span>
                        <IoTimeOutline /> {recipe.prepTime} min
                    </span>
                    <span>
                        <IoRestaurantSharp /> {recipe.numberPeople} person
                    </span>
                    <span>
                        <IoStarOutline
                            onClick={toggleLikeRecepies}
                            style={{ cursor: "pointer" }}
                            className={isLiked ? `like--blue` : ""}
                            //   className={liked ? `like--blue` : ""}
                        />{" "}
                        {recipe.likes?.length}
                    </span>
                </div>
                <button className=" green card--btn">
                    <TiArrowForward onClick={open} />
                    {/* <TiArrowForward onClick={() => dispatch(openModal(id))} /> */}
                </button>
            </div>
        </div>
    );
};

export default Card;
