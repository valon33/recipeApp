import axios from "axios";

class Requests {
    getRecipes = async () =>
        await axios.get(`http://127.0.0.1:5000/api/v1/recipes`);

    createRecipe = async ({
        recipe,
        recipeTitle,
        category,
        prepTime,
        shortDescription,
        numberPeople,
        author,
        photo,
    }) =>
        await axios.post("/api/v1/recipes", {
            recipe,
            recipeTitle,
            category,
            prepTime,
            shortDescription,
            numberPeople,
            author,
            photo,
        });

    getMyRecipes = async () => await axios.get(`/api/v1/recipes/myrecipes`);

    getRecipe = async (id) => await axios.get(`/api/v1/recipes/${id}`);

    deleteRecipe = async (id) => await axios.delete(`/api/v1/recipes/${id}`);

    updatedRecipe = async ({
        id,
        recipe,
        recipeTitle,
        category,
        prepTime,
        shortDescription,
        numberPeople,
        photo,
    }) =>
        await axios.patch(`/api/v1/recipes/${id}`, {
            recipe,
            recipeTitle,
            category,
            prepTime,
            shortDescription,
            numberPeople,
            photo,
        });

    // *USER HTTP REQUESTS
    login = async ({ email, password }) =>
        await axios.post(`/api/v1/users/login`, {
            email,
            password,
        });

    // ?Sign UP

    signUp = async ({
        name,
        lastName,
        email,
        password,
        passwordConfirm,
        birthDay,
    }) => {
        const date = new Date(birthDay);
        return await axios.post("/api/v1/users/signup", {
            name,
            lastName,
            email,
            password,
            passwordConfirm,
            date,
        });
    };

    // ?Update User

    // ? log Out
    logOut = async () => await axios.get("/api/v1/users/logout");

    // ? Current User
    currentUser = async () => await axios.get("/api/v1/users/currentuser");

    // ? Upload Photo
    uploadPhoto = async (selectedPhoto) => {
        const data = new FormData();
        data.append("photo", selectedPhoto);
        return await axios.post("/api/v1/upload", data);
    };

    // ? Like Recipe
    likeRecipe = async (id) => await axios.post(`/api/v1/recipes/like/${id}`);

    // ? Unlike Recipe
    unlikeRecipe = async (id) =>
        await axios.post(`/api/v1/recipes/unlike/${id}`);
}

export default new Requests();
