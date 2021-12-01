import React, { useEffect } from "react";
import {
    IoRestaurantSharp,
    IoStarOutline,
    IoTimeOutline,
    IoClose,
} from "react-icons/io5";
import { useGlobalContext } from "../../Context/context";

const Modal = () => {
    const { closeModal } = useGlobalContext();
    const modal = React.createRef();

    useEffect(() => {
        const handleModalClose = (e) => {
            if (e.target === modal.current) closeModal();
        };
        if (modal && modal.current) {
            window.addEventListener("click", handleModalClose);
        }
        return () => {
            window.addEventListener("click", handleModalClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="modal" ref={modal}>
            <div className="modal-content">
                <div className="modal-header modal-header-box ">
                    <h5 className="modal-title">Recipe title</h5>
                    <IoClose
                        className="btn-close"
                        onClick={() => closeModal()}
                    />
                </div>
                <div className="modal-body">
                    <div className="modal-body-left">
                        <img
                            src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg"
                            className="modal-body-img"
                            alt="..."
                        />
                        <div className="modal-category">
                            <h6 className="modal-category-title">
                                Best served for...
                            </h6>
                            <span className="badge green modal-category-badge">
                                breakfast
                            </span>
                        </div>
                        <p className="modal__shortdescription">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            ‘Content here, content here’, making it look like
                            readable English.
                        </p>
                        <div className="modal--icons">
                            <span>
                                <IoTimeOutline /> 40 min
                            </span>
                            <span>
                                <IoRestaurantSharp />4 person
                            </span>
                            <span>
                                <IoStarOutline /> 130
                            </span>
                        </div>
                    </div>
                    <div className="modal-body-right">
                        <h5 className="modal-recipe-title">Recipe Details</h5>
                        <p className=" modal-recipe-text">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            ‘Content here, content here’, making it look like
                            readable English. Quisque blandit mattis risus, sed
                            tincidunt ante finibus non. Nullam sit amet nunc
                            lorem. Mauris lectus erat, accumsan quis nisl vel,
                            feugiat rhoncus ipsum. Interdum et malesuada fames
                            ac ante ipsum primis in faucibus. Orci varius
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. In at euismod leo. Fusce sed
                            volutpat risus, fermentum feugiat enim. Etiam mollis
                            ante quis nisl imperdiet, id commodo ante tincidunt.
                            Duis bibendum scelerisque risus nec consectetur.
                            Vivamus est elit, mollis vel malesuada non, porta id
                            mauris. Quisque a vehicula lorem. Praesent in auctor
                            quam. Etiam magna quam, sollicitudin id nunc eget,
                            porttitor pretium tellus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
