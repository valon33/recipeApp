const reducer = (state, action) => {
    if (action.type === "LOADING") {
        return { ...state, loading: true };
    }

    if (action.type === "GET_RECIPES") {
        return { ...state, allRecipes: action.payload, loading: false };
    }

    if (action.type === "GET_MY_RECIPES") {
        return { ...state, myRecipes: action.payload };
    }

    if (action.type === "CREATE_RECIPE") {
        return {
            ...state,
            allRecipes: [state.allRecipes, { ...action.payload }],
        };
    }

    if (action.type === "DELETE_RECIPE") {
        return {
            ...state,
            myRecipes: state.myRecipes.filter(
                (myrecipe) => myrecipe._id !== action.payload
            ),
        };
    }

    if (action.type === "SIGNUP") {
        return { ...state, currentUser: action.payload, isLogedIn: true };
    }

    if (action.type === "LOGIN") {
        return { ...state, currentUser: action.payload, isLogedIn: true };
    }

    if (action.type === "CURRENT_USER" || action.type === "LOGIN") {
        return { ...state, currentUser: action.payload, isLogedIn: true };
    }

    if (action.type === "LOGOUT") {
        return { ...state, currentUser: {}, isLogedIn: false };
    }

    if (action.type === "OPEN_MODAL") {
        return { ...state, modalId: action.payload, isModalOpen: true };
    }

    if (action.type === "CLOSE_MODAL") {
        return { ...state, modalId: "", isModalOpen: false };
    }
    if (action.type === "ERROR") {
        return { ...state, error: action.payload };
    }

    throw new Error("no matching action type");
};

export default reducer;
