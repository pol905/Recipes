const Recipe = require("../models/Recipe");
const fs = require("fs-extra");

const deleteRecipe = async (body, res) => {
  const { recipeId, recipeImageName } = body;
  console.log(recipeImageName);
  const imgURI = `./uploads/${recipeImageName}`;
  try {
    await fs.unlink(imgURI);
  } catch (err) {
    console.log(err);
  }
  await Recipe.deleteOne({ _id: recipeId });

  res.sendStatus(200);
};

module.exports = deleteRecipe;
