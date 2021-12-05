import RecipeRoutes from "./routes";
import Modal from "./components/Modal/Modal";
import { useGlobalContext } from "./Context/context";

function App() {
    const { isModalOpen } = useGlobalContext();
    return (
        <div className="App">
            {isModalOpen && <Modal />}
            <RecipeRoutes />
        </div>
    );
}

export default App;
