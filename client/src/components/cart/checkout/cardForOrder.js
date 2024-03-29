import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 300,
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 350,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent
        onClick={() => (window.location.href = "/product/" + props.product.id)}
      >
        <CardMedia className={classes.media} image={props.product.image_link} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:- &#8377; {props.product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Size:- {props.product.size}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Qty:- {props.product.quantity}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
