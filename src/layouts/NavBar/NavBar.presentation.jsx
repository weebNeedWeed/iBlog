import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./NavBar.styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import PropTypes from "prop-types";

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
            <Link href={elm.pathname}>
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

NavBarPresentation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string,
      display: PropTypes.string,
    }),
  ),
  currentPathname: PropTypes.string,
};

export default NavBarPresentation;
