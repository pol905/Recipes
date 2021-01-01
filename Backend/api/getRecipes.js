const Recipe = require("../models/Recipe");

const getRecipes = async (userId, res) => {
  const recipes = await Recipe.find({ userId }).exec();
  res.status(200).json({ recipes });
};

module.exports = getRecipes;
