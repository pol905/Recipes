import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PencilIcon from "@material-ui/icons/Edit";
import LoadingButton from "@material-ui/lab/LoadingButton";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button1: {
    marginTop: "3em",
  },
  input: {
    display: "none",
  },
}));

const UpdateRecipe = (props) => {
  const classes = useStyles();
  const { _id, userId, recipeName, ingredients, recipe, img } = props.recipe;
  const setCardRecipe = props.setCardRecipe;
  const [newRecipe, setNewRecipe] = React.useState({
    updatedRecipeName: recipeName,
    updatedIngredients: ingredients,
    updatedRecipe: recipe,
    updatedRecipeImage: null,
  });
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditRecipe = async () => {
    setPending(true);
    const formData = new FormData();
    const {
      updatedRecipeName,
      updatedIngredients,
      updatedRecipe,
      updatedRecipeImage,
    } = newRecipe;
    formData.append("recipeId", _id);
    if (updatedRecipeImage !== null) {
      console.log("here");
      formData.append(
        "recipeImage",
        updatedRecipeImage,
        updatedRecipeImage.name
      );
    }
    if (updatedRecipeName !== "" || updatedRecipeName !== recipeName) {
      console.log(updatedRecipeName);
      formData.append("recipeName", updatedRecipeName);
    }
    if (updatedIngredients !== "" || updatedIngredients !== ingredients) {
      console.log(updatedIngredients);
      formData.append("ingredients", updatedIngredients);
    }
    if (updatedRecipe !== "" || updatedRecipe !== recipe) {
      console.log(updatedRecipe);
      formData.append("recipe", updatedRecipe);
    }
    try {
      const finalRecipe = (
        await axios.post("/v1/updateRecipe/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
      const newCardRecipe = {
        _id,
        userId,
        recipeName: finalRecipe.recipeName || recipeName,
        ingredients: finalRecipe.ingredients || ingredients,
        recipe: finalRecipe.recipe || recipe,
        img: finalRecipe.img || img,
      };
      setCardRecipe(newCardRecipe);
      setOpen(false);
    } catch (err) {
      alert(err.response);
    }
    setPending(false);
  };
  return (
    <>
      <Button size="small">
        <PencilIcon style={{ color: "#212121" }} onClick={handleOpen} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="recipeName"
            label="Recipe Name"
            type="text"
            // error={error1}
            // helperText={msg1}
            fullWidth
            value={newRecipe.updatedRecipeName}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, updatedRecipeName: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-textarea"
            label="Ingredients"
            placeholder="Enter the ingredients..."
            margin="dense"
            // error={error2}
            // helperText={msg2}
            fullWidth
            multiline
            value={newRecipe.updatedIngredients}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, updatedIngredients: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-textarea"
            label="Recipe"
            placeholder="Enter the recipe..."
            // error={error3}
            // helperText={msg3}
            fullWidth
            multiline
            value={newRecipe.updatedRecipe}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, updatedRecipe: e.target.value })
            }
          />
          <input
            accept=".jpeg, .png, .jpg"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) =>
              setNewRecipe({
                ...newRecipe,
                updatedRecipeImage: e.target.files[0],
              })
            }
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button1}
              endIcon={<CameraIcon />}
            >
              Upload an Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            endIcon={<PencilIcon />}
            pending={pending}
            variant="contained"
            onClick={handleEditRecipe}
          >
            Edit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateRecipe;
