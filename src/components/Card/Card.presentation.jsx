import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Card.styles";
import Link from "next/link";

function CardPresentation() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant="caption" display="block">
        datetime
      </Typography>
      <Link href="#">
        <Typography variant="h6" className={classes.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque libero
          aspernatur quasi blanditiis distinctio autem eligendi itaque velit
          molestias quibusdam architecto
        </Typography>
      </Link>
      <Typography variant="body1">
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam{"..."}
        <Link href="#">
          <a className={classes.link}>read more</a>
        </Link>
      </Typography>
    </div>
  );
}

export default CardPresentation;
