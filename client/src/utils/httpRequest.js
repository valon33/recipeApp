import axios from "axios";

class Requests {
    getRecipes = async () => await axios.get(`/api/v1/recipes`);

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

    // ?Update User

    // ? log Out

    // ? Current User

    // ? Upload Photo

    // ? Like Recipe

    // ? Unlike Recipe
}

export default new Requests();
