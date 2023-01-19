import { useEffect } from "react";
import RecipeRoutes from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "./features/auth/authSlice";

import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";

function App() {
    const { user, loading } = useSelector((state) => state.auth);
    const { isModalOpen } = useSelector((state) => state.util);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(currentUser());
        // if (!user) dispatch(currentUser());

        if (JSON.parse(localStorage.getItem("token")) !== "")
            dispatch(currentUser());
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            window.document.body.style.overflowY = "hidden";
        } else {
            window.document.body.style.overflowY = "auto";
        }
    }, [isModalOpen]);

    console.log("APP", user);

    return (
        <div className="App">
            {isModalOpen && <Modal />}
            {/* {error?.length > 0 && <Alert />} */}
            <RecipeRoutes />
        </div>
    );
}

export default App;
