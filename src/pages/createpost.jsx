import React from "react";
import NavBar from "./../layouts/NavBar/NavBar.index";
import Head from "next/head";
import Footer from "../layouts/Footer/Footer.index";
import CustomEditor from "../components/CustomEditor/CustomEditor.index";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import dbConnect from "./../utils/dbConnect";
import User from "./../models/User";
import PropTypes from "prop-types";
import { applySession } from "next-session";
import sessionConfigure from "../utils/sessionConfigure";

const useStyles = makeStyles({
  container: {
    marginTop: "90px",
  },
});

export default function Createpost({ authKey }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{"iBlog - create new post"}</title>
      </Head>
      <>
        <NavBar loggedIn />
        <Container maxWidth="md" className={classes.container}>
          <CustomEditor authKey={authKey} />
        </Container>
        <Footer />
      </>
    </>
  );
}

Createpost.propTypes = {
  authKey: PropTypes.string,
};

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, sessionConfigure);
  let { authKey } = req.session;
  await dbConnect();

  if (!authKey) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (authKey.length <= 24) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const splitIndex = authKey.search("_");
  const userId = authKey.slice(0, 24);
  const password = authKey.slice(24, splitIndex);
  const username = authKey.slice(splitIndex + 1);

  const user = await User.findOne({ _id: userId, username, password });
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { authKey } };
}
