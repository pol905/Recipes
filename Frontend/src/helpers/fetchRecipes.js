const axios = require("axios");

module.exports = async function getRecipes() {
  let userRecipes;
  try {
    userRecipes = await axios.get("/v1/getRecipes/");
    userRecipes = userRecipes.data.recipes;
  } catch (err) {
    console.error(err.response);
  }
  return userRecipes;
};
