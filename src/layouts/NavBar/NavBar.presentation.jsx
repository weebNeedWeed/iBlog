import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./NavBar.styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

function NavBarPresentation({ routes, currentPathname }) {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        className={classes.text}
      >
        {"iBlog"}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {routes.map((elm, index) => (
          <Grid item key={index}>
            <Link href="#">
              <Button
                size="large"
                variant="outlined"
                disabled={currentPathname === elm.pathname}
              >
                {elm.display}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NavBarPresentation;
