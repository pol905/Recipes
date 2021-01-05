const Recipe = require("../models/Recipe");
const fs = require("fs-extra");
const updateRecipe = async (req, res) => {
  const {
    file,
    body: { recipeId, recipeName, recipe, ingredients },
  } = req;
  const prevRecipe = await Recipe.findOne({ _id: recipeId });
  if (file) {
    try {
      await fs.unlink(`./uploads/${prevRecipe.img.data}`);
    } catch (err) {
      alert("No such file");
    }
  }
  const newRecipe = {
    recipeName: recipeName !== prevRecipe.recipeName ? recipeName : undefined,
    ingredients:
      ingredients !== prevRecipe.ingredients ? ingredients : undefined,
    recipe: recipe !== prevRecipe.recipe ? recipe : undefined,
    img: file
      ? {
          data: file.filename,
          contentType: file.mimetype,
        }
      : undefined,
  };
  try {
    await prevRecipe.updateOne(newRecipe, { omitUndefined: true });
    res.json(newRecipe);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = updateRecipe;
