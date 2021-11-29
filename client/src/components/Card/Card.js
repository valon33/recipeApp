import React, { useState } from "react";
import {
  IoRestaurantSharp,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { TiArrowForward } from "react-icons/ti";

const Card = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const likeRecipe = () => {
    console.log("like recipe");
    setIsLiked(true);
  };
  const unlikeRecipe = () => {
    console.log("unlike recipe");
    setIsLiked(false);
  };

  const toggleLikeRecepies = () => {
    if (isLiked === false) {
      likeRecipe();
      console.log("Recept will bw Liked");
    } else if (isLiked === true) {
      unlikeRecipe();
      console.log("Recept will bw UnLiked");
    } 
  };

  return (
    <div className="card">
      <div className="card__img">
        <span className="badge green card__badge">breakfast</span>
        <img
          src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/08/20/0/FNM_100120-Ultimate-Beef-Stew_s4x3.jpg.rend.hgtvcom.406.305.suffix/1597931275143.jpeg"
          className="card-img-top"
          alt="card img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">Pasul me mish</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bd
          make up the bulk of the card's content. Some quick example text to
          build on the card title and make up the bulk of the card's content.
        </p>
      </div>
      <div className="card--footer">
        <div className="card--icons">
          <span>
            <IoTimeOutline /> 40 min
          </span>
          <span>
            <IoRestaurantSharp /> 4 person
          </span>
          <span>
            <IoStarOutline
              onClick={toggleLikeRecepies}
              className={isLiked ? `like--blue` : ""}
            />{" "}
            135
          </span>
        </div>
        <button className=" green card--btn">
          <TiArrowForward
            onClick={() => console.log("Modal will be Opend in a min 😂😂 ")}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
