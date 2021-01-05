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
      console.log("Removed old image");
    } catch (err) {
      alert("No such file");
    }
  }
  const updatedRecipe = {
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
    await prevRecipe.updateOne(updatedRecipe, { omitUndefined: true });
    res.status(200).send("Added Sucessfully");
  } catch (err) {
    res.send("Update unsucessful");
  }
};
module.exports = updateRecipe;
