import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useStyles from "./Footer.styles";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";

function FooterPresentation() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container justifyContent="space-between">
        <Grid item className={classes.grid} xs={6}>
          <Typography variant="subtitle1">
            {"Mail me: "}
            <Link href={"mailto:rivenmle@gmail.com"}>
              <a className={classes.contact}>{"rivenmle@gmail.com"}</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.phone}>
            {"Phone me: "}
            <Link href={"tel:+84939800213"}>
              <a className={classes.contact}>{"+84939800213"}</a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom className={classes.copyright}>
        {"Copyright Ⓒ iBlog 2021"}
      </Typography>
    </Container>
  );
}

export default FooterPresentation;
