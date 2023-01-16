import { useEffect } from "react";
import RecipeRoutes from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "./features/auth/authSlice";

import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";
import { useGlobalContext } from "./Context/context";

function App() {
  // const { isModalOpen, error } = useGlobalContext();
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    // if (!user) dispatch(currentUser);
  }, []);

  console.log("APP", user);

  return (
    <div className="App">
      {/* {isModalOpen && <Modal />} */}
      {/* {error?.length > 0 && <Alert />} */}
      <RecipeRoutes />
    </div>
  );
}

export default App;
