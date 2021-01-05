import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import ViewRecipe from "../Components/ViewRecipe";
import UpdateRecipe from "../Components/UpdateRecipe";

import DeleteRecipe from "./DeleteRecipe";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: "3em",
  },
  media: {
    maxHeight: 260,
  },
});

export default function RecipeCard(props) {
  const [cardRecipe, setCardRecipe] = React.useState(props.recipe);
  const { setRecipes } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root} raised key={cardRecipe._id}>
      <CardMedia
        className={classes.media}
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={cardRecipe.img.data}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardRecipe.recipeName.replace(/['"]+/g, "")}
        </Typography>
      </CardContent>
      <CardActions>
        <ViewRecipe recipe={cardRecipe} />
        <UpdateRecipe recipe={cardRecipe} setCardRecipe={setCardRecipe} />
        <DeleteRecipe
          recipeId={cardRecipe._id}
          recipeImageName={cardRecipe.img.data}
          setRecipes={setRecipes}
        />
      </CardActions>
    </Card>
  );
}
