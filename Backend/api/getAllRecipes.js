const Recipe = require("../models/Recipe");

const getAllRecipes = async (res) => {
  const allRecipes = await Recipe.find().exec();
  res.json(allRecipes);
};

module.exports = getAllRecipes;
