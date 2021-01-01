const Recipe = require("../models/Recipe");
const addRecipe = async (
  { file, session, body: { recipeName, ingredients, recipe } },
  res
) => {
  const createRecipe = {
    recipeName: recipeName,
    userId: session.userId,
    ingredients: ingredients,
    recipe: recipe,
    img: {
      data: file.filename,
      contentType: file.mimetype,
    },
  };
  const newRecipe = new Recipe(createRecipe);
  try {
    await newRecipe.save();
    res.send("Added Sucessfully");
  } catch (err) {
    res.send("Upload unsucessful");
  }
};

module.exports = addRecipe;
