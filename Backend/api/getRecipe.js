const Recipe = require("../models/Recipe");

const getRecipe = async (id, res) => {
  const recipe = await Recipe.findOne({ _id: id }).exec();
  res.status(200).json({ recipe });
};

module.exports = getRecipe;
