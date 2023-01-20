//   const likeRecipe = async (id) => {
//     try {
//       await API.post(`/api/v1/recipes/like/${id}`).then((recipe) => {
//         dispatch({
//           type: "LIKE_RECIPE",
//           payload: recipe.data.data.recipe.likes,
//         });
//       });
//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
//   };

//   const unlikeRecipe = async (id) => {
//     try {
//       await API.post(`/api/v1/recipes/unlike/${id}`).then((recipe) =>
//         dispatch({
//           type: "UNLIKE_RECIPE",
//           payload: recipe.data.data.recipe.likes,
//         })
//       );
//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
//   };
