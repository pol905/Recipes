import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import getRecipes from "../helpers/helper";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "14em",
    marginLeft: "45%",
    "@media(max-width: 500px)": {
      marginLeft: "32%",
    },
  },
  button1: {
    marginTop: "3em",
  },
  input: {
    display: "none",
  },
}));

export default function CreateRecipe(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setRecipes } = props;
  const [newRecipe, setNewRecipe] = React.useState({
    recipeName: "",
    ingredients: "",
    recipe: "",
    recipeImage: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRecipe = async () => {
    const { recipeName, ingredients, recipe, recipeImage } = newRecipe;
    const formData = new FormData();
    formData.append("recipeImage", recipeImage, recipeImage.name);
    formData.append("recipeName", recipeName);
    formData.append("recipe", recipe);
    formData.append("ingredients", ingredients);
    try {
      await axios.post("/v1/addRecipe/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      alert(err.response.data);
    }
    const allRecipes = await getRecipes();
    setRecipes(() => {
      return [...allRecipes];
    });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add Recipe
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="recipeName"
            label="Recipe Name"
            type="text"
            fullWidth
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, recipeName: e.target.value })
            }
          />
          <TextField
            id="outlined-textarea"
            label="Ingredients"
            placeholder="Enter the ingredients..."
            margin="dense"
            fullWidth
            multiline
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, ingredients: e.target.value })
            }
          />
          <TextField
            id="outlined-textarea"
            label="Recipe"
            placeholder="Enter the recipe..."
            fullWidth
            multiline
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, recipe: e.target.value })
            }
          />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, recipeImage: e.target.files[0] })
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
          <Button
            endIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddRecipe}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
