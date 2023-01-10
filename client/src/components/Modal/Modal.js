import React, { useEffect } from "react";
import {
    IoRestaurantSharp,
    IoStarOutline,
    IoTimeOutline,
    IoClose,
} from "react-icons/io5";
// import { useGlobalContext } from "../../Context/context";

const Modal = () => {
    // const { closeModal, modalRecipe } = useGlobalContext();
    const modal = React.createRef();

    useEffect(() => {
        const handleModalClose = (e) => {
            // if (e.target === modal.current) closeModal();
        };
        if (modal && modal.current) {
            window.addEventListener("click", handleModalClose);
        }
        return () => {
            window.addEventListener("click", handleModalClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.log("data", modalRecipe);

    return (
        <div className="modal" ref={modal}>
            <div className="modal-content">
                <div className="modal-header modal-header-box ">
                    {/* <h5 className="modal-title">{modalRecipe.recipeTitle}</h5> */}
                    <IoClose
                        className="btn-close"
                        // onClick={() => closeModal()}
                    />
                </div>
                <div className="modal-body">
                    <div className="modal-body-left">
                        <img
                            // src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg"
                            // src={
                                // modalRecipe.photo
                                    // ? `/api/v1/upload/${modalRecipe.photo}`
                                    // : "https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg"
                            // }
                            className="modal-body-img"
                            alt="..."
                        />
                        <div className="modal-category">
                            <h6 className="modal-category-title">
                                Best served for...
                            </h6>
                            <span className="badge green modal-category-badge">
                                {/* {modalRecipe.category} */}
                            </span>
                        </div>
                        <p className="modal__shortdescription">
                            {/* {modalRecipe.shortDescription} */}
                        </p>
                        <div className="modal--icons">
                            <span>
                                {/* <IoTimeOutline /> {modalRecipe.prepTime} min */}
                            </span>
                            <span>
                                <IoRestaurantSharp />
                                {/* {modalRecipe.numberPeople} person */}
                            </span>
                            <span>
                                {/* <IoStarOutline /> {modalRecipe.likes.length} */}
                            </span>
                        </div>
                    </div>
                    <div className="modal-body-right">
                        <h5 className="modal-recipe-title">Recipe Details</h5>
                        <p className=" modal-recipe-text">
                            {/* {modalRecipe.recipe} */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
