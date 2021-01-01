import React from "react";
import fetchRecipes from "../helpers/fetchRecipes";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TrashIcon from "@material-ui/icons/Delete";

const DeleteRecipe = (props) => {
  const { setRecipes } = props;
  const { recipeId } = props;
  const { recipeImageName } = props;
  const deleteRecipe = async () => {
    try {
      const response = await axios.post("/v1/deleteRecipe/", {
        recipeId,
        recipeImageName,
      });
      console.log(response);
      const recipes = await fetchRecipes();
      setRecipes(() => {
        return [...recipes];
      });
    } catch (err) {}
  };
  return (
    <>
      <Button size="small">
        <TrashIcon style={{ color: "#212121" }} onClick={deleteRecipe} />
      </Button>
    </>
  );
};

export default DeleteRecipe;
