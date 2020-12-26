const Recipe = require("../models/Recipe");
const addRecipe = async (
  { file, session, body: { recipeName, ingredients, recipe } },
  res
) => {
  const newRecipe = new Recipe({
    recipeName: recipeName,
    userId: session.userId,
    ingrdients: ingredients,
    recipe: recipe,
    img: {
      data: file.path,
      contentType: file.mimetype,
    },
  });
  console.log(session.userId);
  try {
    await newRecipe.save();
    res.send("Added Sucessfully");
  } catch (err) {
    res.send("Upload unsucessful");
  }
};

module.exports = addRecipe;
