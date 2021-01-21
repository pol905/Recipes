import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import LoadingButton from "@material-ui/lab/LoadingButton";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import fetchRecipes from "../helpers/fetchRecipes";

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
  const [pending, setPending] = React.useState(false);
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [error3, setError3] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState(false);
  const [msg1, setMsg1] = React.useState("");
  const [msg2, setMsg2] = React.useState("");
  const [msg3, setMsg3] = React.useState("");

  const { setRecipes } = props; // Setter function to update recipe  state variable
  const [newRecipe, setNewRecipe] = React.useState({
    recipeName: "",
    ingredients: "",
    recipe: "",
    recipeImage: null,
  }); // State variable to hold new Recipe

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRecipe = async () => {
    const { recipeName, ingredients, recipe, recipeImage } = newRecipe;
    const formData = new FormData();
    if (recipeName && ingredients && recipe && recipeImage) {
      setError1(false);
      setError2(false);
      setError3(false);
      setMsg1("");
      setMsg2("");
      setMsg3("");
      setImageSelected(false);
      setPending(true);
      // Populate the FormData with recipe Details
      formData.append("recipeImage", recipeImage, recipeImage.name);
      formData.append("recipeName", recipeName);
      formData.append("recipe", recipe);
      formData.append("ingredients", ingredients);
      try {
        // Adding a new Recipe to our database
        await axios.post("/v1/addRecipe/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        // If unsuccessful alerts user
        alert(err.response.data);
      }
      const allRecipes = await fetchRecipes();
      setRecipes(() => {
        return [...allRecipes];
      });
      setNewRecipe({
        recipeName: "",
        ingredients: "",
        recipe: "",
        recipeImage: null,
      }); // Clear new Recipe Fields after successfully POSTing to your backend
      setPending(false);
      setOpen(false);
    } else {
      // Form Validation
      if (!recipeName) {
        setError1(true);
        setMsg1("Enter the name of the recipe");
      } else {
        setError1(false);
        setMsg1("");
      }
      if (!ingredients) {
        setError2(true);
        setMsg2("Enter the ingredients");
      } else {
        setError2(false);
        setMsg2("");
      }
      if (!recipe) {
        setError3(true);
        setMsg3("Enter the recipe");
      } else {
        setError3(false);
        setMsg3("");
      }
      if (!recipeImage) {
        setImageSelected(true);
      } else {
        setImageSelected(false);
      }
    }
  };
  return (
    // HTML Content
    <>
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
            required
            autoFocus
            margin="dense"
            id="recipeName"
            label="Recipe Name"
            type="text"
            error={error1}
            helperText={msg1}
            fullWidth
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, recipeName: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-textarea"
            label="Ingredients"
            placeholder="Enter the ingredients..."
            margin="dense"
            error={error2}
            helperText={msg2}
            fullWidth
            multiline
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, ingredients: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-textarea"
            label="Recipe"
            placeholder="Enter the recipe..."
            error={error3}
            helperText={msg3}
            fullWidth
            multiline
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, recipe: e.target.value })
            }
          />
          <input
            accept=".jpeg, .png, .jpg"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImageSelected(true);
                setNewRecipe({ ...newRecipe, recipeImage: e.target.files[0] });
              }
            }}
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
          {imageSelected ? null : <p>Image is required</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            endIcon={<AddIcon />}
            pending={pending}
            variant="contained"
            onClick={handleAddRecipe}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
