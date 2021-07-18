import React, { useState } from "react";
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
import { toast } from "react-toastify";

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

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setDisplayError(true);
      toast.error("Missing Data", { toastId: "missingData" });
      return;
    }

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status !== 200) {
      toast.error("Login failed", {
        toastId: "errorLogin",
      });
      return;
    }

    toast.success("Login success. Redirecting...", {
      toastId: "successLogin",
    });
    return;
  };

  return (
    <>
      <Head>
        <title>iBlog - login</title>
      </Head>
      <>
        <NavBar />
        <Container maxWidth="md" className={classes.container}>
          <Container maxWidth="xs">
            <form
              noValidate
              autoComplete="off"
              className={classes.form}
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h2"
                component="h2"
                className={classes.loginText}
              >
                {"Login"}
              </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                required
                error={!username && displayError}
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  label="Username"
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                />
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                required
                error={!password && displayError}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
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
