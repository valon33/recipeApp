import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { updateRecipe } from "../../features/recipes/recipeSlice";
import { uploadPhoto } from "../../features/util/utilSlice";

const UpdateRecipe = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    //   const { user: currentUser } = useSelector((state) => state.auth);
    const { myRecipes, loading } = useSelector((state) => state.recipe);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState({
        recipeTitle: "",
        category: "",
        prepTime: "",
        numberPeople: "",
        shortDescription: "",
        recipe: "",
        photo: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const {
        recipeTitle,
        category,
        prepTime,
        numberPeople,
        shortDescription,
        recipe,
        photo,
    } = inputValue;

    useEffect(() => {
        const rec = myRecipes.filter((recipe) => recipe._id === id);
        setInputValue((prev) => ({
            ...prev,
            recipeTitle: rec[0].recipeTitle,
            category: rec[0].category,
            prepTime: rec[0].prepTime,
            numberPeople: rec[0].numberPeople,
            shortDescription: rec[0].shortDescription,
            recipe: rec[0].recipe,
            photo: rec[0].photo,
        }));
    }, []);

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const SubmitCreate = async (e) => {
        e.preventDefault();

        if (
            recipe &&
            recipeTitle &&
            category &&
            prepTime &&
            shortDescription &&
            numberPeople
        ) {
            if (selectedFile) {
                const photo = selectedFile.name;
                dispatch(uploadPhoto(selectedFile));
                dispatch(
                    updateRecipe({
                        id,
                        recipe,
                        recipeTitle,
                        category,
                        prepTime,
                        shortDescription,
                        numberPeople,
                        photo,
                    })
                );
            }

            if (!selectedFile) {
                dispatch(
                    updateRecipe({
                        id,
                        recipe,
                        recipeTitle,
                        category,
                        prepTime,
                        shortDescription,
                        numberPeople,
                    })
                );
            }
        }
    };

    return (
        <MainLayout>
            <PageTitle
                description="My Recipie"
                logo={
                    <TiArrowBack
                        onClick={() => navigate("/myrecipes")}
                        style={{ cursor: "pointer" }}
                    />
                }
            />

            <div className="recipe__post">
                <div className="recipe__post--upload">
                    <div className="recipe__post__photo">
                        <img
                            src={
                                photo && !previewImg
                                    ? `http://localhost:5000/api/v1/upload/${photo}`
                                    : previewImg
                                // ? `/images/${photo}`
                            }
                            alt="Avatar"
                            className="recipe__post__photo--img"
                        />
                        <div>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                }
                            />
                            <label htmlFor="myfile" className="upload--photo">
                                Upload Photo
                            </label>
                        </div>
                    </div>
                </div>

                <div className="recipe__post--title">
                    <form className="row g-3" onSubmit={(e) => SubmitCreate(e)}>
                        <Input
                            inputType="text"
                            inputLabel="Recipe Title"
                            inputId="recipeTitle"
                            placeholder="Pasta"
                            name="recipeTitle"
                            onChange={handleChange}
                            value={recipeTitle}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Select
                                inputLabel="Category"
                                inputId="inputCategory"
                                options={[
                                    "Breakfast",
                                    "Lunch",
                                    "Dinner",
                                    "Brunch",
                                ]}
                                name="category"
                                onChange={handleChange}
                                value={category}
                            />

                            <Input
                                inputType="text"
                                inputLabel="Preparation Time"
                                inputId="preparationTime"
                                name="prepTime"
                                onChange={handleChange}
                                value={prepTime}
                            />

                            <Input
                                inputType="number"
                                inputLabel="No. People"
                                inputId="numOfPeople"
                                name="numberPeople"
                                onChange={handleChange}
                                value={numberPeople}
                            />
                        </div>

                        <TextArea
                            inputLabel="Short Description"
                            inputId="shortDescription"
                            placeholder="Leave short description "
                            height="100px"
                            name="shortDescription"
                            onChange={handleChange}
                            value={shortDescription}
                        />

                        <div className="recipe__post-button">
                            <button type="submit" className="btn button green">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="recipe__post--recipe">
                    <TextArea
                        inputLabel="Recipe"
                        inputId="recipe"
                        placeholder="Leave short description for the recipe"
                        height="270px"
                        name="recipe"
                        onChange={handleChange}
                        value={recipe}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default UpdateRecipe;
