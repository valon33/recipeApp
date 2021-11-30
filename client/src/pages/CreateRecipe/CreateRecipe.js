import React, { useState, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import MainLayout from "../../layouts/MainLayout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "../../components/Form/Input";

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
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <label htmlFor="myfile" className="upload--photo">
                Upload Photo
              </label>
            </div>
          </div>
        </div>

        <div className="recipe__post--title">
          <form className="row g-3" onSubmit={(e) => SubmitCreate(e)}>
            <div className="col-12">
              <label htmlFor="recipeTitle" className="form-label">
                Recipe Title
              </label>
              <input
                type="text"
                className="form-control"
                id="recipeTitle"
                placeholder="Pasta"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <select id="inputCategory" className="form-select">
                <option defaultValue="Choose">Choose...</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Brunch</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="preparationTime" className="form-label">
                Preparation Time
              </label>
              <input
                type="text"
                className="form-control"
                id="preparationTime"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="numOfPeople" className="form-label">
                No. People
              </label>
              <input type="text" className="form-control" id="numOfPeople" />
            </div>

            <div className="col-12">
              <label htmlFor="shortDescription" className="form-label">
                Short Description
              </label>
              <textarea
                className="form-control"
                placeholder="Leave short description for the recipe"
                id="shortDescription"
                style={{ height: "100px" }}
                defaultValue={""}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn button green">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="recipe__post--recipe">
          {" "}
          <div className="col-12">
            <label htmlFor="recipe" className="form-label">
              Recipe
            </label>
            <textarea
              className="form-control"
              placeholder="Leave short description for the recipe"
              id="recipe"
              style={{ height: "270px" }}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateRecipe;
