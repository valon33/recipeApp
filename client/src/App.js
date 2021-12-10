import RecipeRoutes from "./routes";
import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";
import { useGlobalContext } from "./Context/context";

function App() {
    const { isModalOpen, error } = useGlobalContext();
    return (
        <div className="App">
            {isModalOpen && <Modal />}
            {error && <Alert />}
            <RecipeRoutes />
        </div>
    );
}

export default App;
