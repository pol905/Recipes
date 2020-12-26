const mongoose = require("mongoose");
const db = require("../accessLayer");

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String },
  userId: { type: String },
  ingredients: { type: String },
  recipe: { type: String },
  img: {
    data: { type: String },
    contentType: { type: String },
  },
});

const Recipe = db.model("recipe", recipeSchema);
module.exports = Recipe;
