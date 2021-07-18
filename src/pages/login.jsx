import React from "react";
import Head from "next/head";
import NavBar from "./../layouts/NavBar/NavBar.index";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Footer from "../layouts/Footer/Footer.index";

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
  form: {
    textAlign: "center",
    border: "1px solid black",
    padding: "20px",
    borderRadius: "10px",
  },
  loginText: {
    textAlign: "center",
  },
  formControl: {
    marginBottom: "20px",
  },
  submit: {
    backgroundColor: "#616161",
    color: "white",
    "&:hover": {
      backgroundColor: "#313131",
    },
  },
});

function Login() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>iBlog - home</title>
      </Head>
      <>
        <NavBar />
        <Container maxWidth="md" className={classes.container}>
          <Container maxWidth="xs">
            <form noValidate autoComplete="off" className={classes.form}>
              <Typography
                variant="h2"
                component="h2"
                className={classes.loginText}
              >
                {"login"}
              </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput id="username" label="Username" type="text" />
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput id="password" label="Password" type="password" />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="default"
                fullWidth
                className={classes.submit}
              >
                {"login"}
              </Button>
            </form>
          </Container>
        </Container>
        <Footer />
      </>
    </>
  );
}

export default Login;
