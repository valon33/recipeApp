import { useEffect } from "react";
import RecipeRoutes from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "./features/auth/authSlice";

import Modal from "./components/Modal/Modal";

function App() {
    const { user } = useSelector((state) => state.auth);
    const { isModalOpen } = useSelector((state) => state.util);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(currentUser());
        if (!user) dispatch(currentUser());

        if (JSON.parse(localStorage.getItem("token")) !== "")
            dispatch(currentUser());
    }, [dispatch, user]);

    useEffect(() => {
        if (isModalOpen) {
            window.document.body.style.overflowY = "hidden";
        } else {
            window.document.body.style.overflowY = "auto";
        }
    }, [isModalOpen]);


    return (
        <div className="App">
            {isModalOpen && <Modal />}
            <RecipeRoutes />
        </div>
    );
}

export default App;
