import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";
import { useGlobalContext } from "../../Context/context";

const CreateRecipe = () => {
    const navigate = useNavigate();
    const { createRecipe, uploadPhoto, currentUser } = useGlobalContext();
    const [inputValue, setInputValue] = useState({
        recipeTitle: "",
        category: "",
        prepTime: "",
        numberPeople: "",
        shortDescription: "",
        recipe: "",
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
    } = inputValue;

    console.log(inputValue);

    useEffect(() => {
        setPreviewImg(
            "https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg"
        );
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewImg(
                "https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg"
            );
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
        const author = currentUser._id;

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
                uploadPhoto(selectedFile);
                createRecipe(
                    recipe,
                    recipeTitle,
                    category,
                    prepTime,
                    shortDescription,
                    numberPeople,
                    author,
                    photo
                );
            }

            if (!selectedFile) {
                createRecipe(
                    recipe,
                    recipeTitle,
                    category,
                    prepTime,
                    shortDescription,
                    numberPeople,
                    author
                );
            }
        }

        navigate("/myrecipes");
    };

    return (
        <MainLayout>
            <PageTitle
                description="My Recipie"
                logo={
                    <TiArrowBack
                        onClick={() => console.log("go back")}
                        style={{ cursor: "pointer" }}
                    />
                }
            />

            <div className="recipe__post">
                <div className="recipe__post--upload">
                    <div className="recipe__post__photo">
                        <img
                            src={previewImg}
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
                            <label htmlFor="myfile" className="upload--photo ">
                                Upload Photo
                            </label>
                        </div>
                    </div>
                </div>

                <div className="recipe__post--title">
                    <form onSubmit={(e) => SubmitCreate(e)}>
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

export default CreateRecipe;
