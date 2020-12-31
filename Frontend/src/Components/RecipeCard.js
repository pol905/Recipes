import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EyeIcon from "@material-ui/icons/Visibility";

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
  const {
    _id,
    recipeName,
    ingredients,
    recipe,
    img: { data, contentType },
  } = props.recipe;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} raised key={_id}>
      <CardMedia
        className={classes.media}
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={data}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipeName.replace(/['"]+/g, "")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <EyeIcon style={{ color: "#212121" }} />
        </Button>
      </CardActions>
    </Card>
  );
}
