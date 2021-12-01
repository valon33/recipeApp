import React, { useState, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TextArea from "../../components/Form/TextArea";

const CreateRecipe = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");

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

    const SubmitCreate = async (e) => {
        e.preventDefault();
        console.log("Creating...");
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
                            />

                            <Input
                                inputType="text"
                                inputLabel="Preparation Time"
                                inputId="preparationTime"
                            />

                            <Input
                                inputType="number"
                                inputLabel="No. People"
                                inputId="numOfPeople"
                            />
                        </div>

                        <TextArea
                            inputLabel="Short Description"
                            inputId="shortDescription"
                            placeholder="Leave short description "
                            height="100px"
                        />

                        <div className="col-12">
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
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default CreateRecipe;
