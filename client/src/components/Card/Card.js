import React, { useState } from "react";
import {
    IoRestaurantSharp,
    IoStarOutline,
    IoTimeOutline,
} from "react-icons/io5";
import { TiArrowForward } from "react-icons/ti";
// import { useGlobalContext } from "../../Context/context";
import { useSelector, useDispatch } from "react-redux";
import {
    openModal,
    likeRecipe,
    unLikeRecipe,
} from "../../features/util/utilSlice";

const Card = ({
    category,
    recipeTitle,
    numberPeople,
    prepTime,
    shortDescription,
    likes,
    photo,
    liked,
    id,
}) => {
    // const { openModal, likeRecipe, unlikeRecipe } = useGlobalContext();
    const { allRecipes, myRecipes, loading } = useSelector(
        (state) => state.recipe
    );
    // const [modalRecipe, setModalRecipe] = useState({});
    const dispatch = useDispatch();
    const baseUrl = "https://recipe-app-backend-4xd6.onrender.com";

    const toggleLikeRecepies = () => {
        if (liked === false) {
            dispatch(likeRecipe(id));
        } else if (liked === true) {
            dispatch(unLikeRecipe(id));
        }
    };

    const prov = () => {
        const recipe = allRecipes?.filter((rec) => rec._id === id)[0];
        dispatch(openModal(recipe));
    };

    return (
        <div className="card">
            <div className="card__img">
                <span className="badge green card__badge">{category}</span>
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
                <h5 className="card-title">{recipeTitle}</h5>
                <p className="card-text">
                    {shortDescription && shortDescription.slice(0, 200)}
                </p>
            </div>
            <div className="card--footer">
                <div className="card--icons">
                    <span>
                        <IoTimeOutline /> {prepTime} min
                    </span>
                    <span>
                        <IoRestaurantSharp /> {numberPeople} person
                    </span>
                    <span>
                        <IoStarOutline
                            onClick={toggleLikeRecepies}
                            style={{ cursor: "pointer" }}
                            className={liked ? `like--blue` : ""}
                        />{" "}
                        {likes?.length}
                    </span>
                </div>
                <button className=" green card--btn">
                    <TiArrowForward onClick={prov} />
                    {/* <TiArrowForward onClick={() => dispatch(openModal(id))} /> */}
                </button>
            </div>
        </div>
    );
};

export default Card;
