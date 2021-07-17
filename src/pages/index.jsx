import React from "react";
import Head from "next/head";
import NavBar from "./../layouts/NavBar/NavBar.index";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Card from "../components/Card/Card.index";
import dbConnect from "./../utils/dbConnect";
import Post from "./../models/Post";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 500,
  },
  container: {
    marginTop: "100px",
  },
  link: {
    fontSize: "150%",
    color: "#383838",
    transition: theme.transitions.create(),
    "&:hover": {
      color: "#000000",
    },
  },
}));

export default function Home({ listPosts }) {
  const classes = useStyles();
  const posts = JSON.parse(listPosts);

  return (
    <>
      <Head>
        <title>iBlog - home</title>
      </Head>
      <>
        <NavBar />
        <Container maxWidth="md" className={classes.container}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                className={classes.text}
              >
                {"Newest posts"}
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/posts">
                <a className={classes.link}>see more</a>
              </Link>
            </Grid>
          </Grid>
          <Container maxWidth="md">
            {posts.map((elm, index) => (
              <Card
                key={index}
                {...elm}
                gutterBottom={index !== posts.length - 1}
              />
            ))}
          </Container>
        </Container>
      </>
    </>
  );
}

Home.propTypes = {
  listPosts: PropTypes.string,
};

export async function getServerSideProps() {
  await dbConnect();
  const topFiveLatestPosts = await Post.find(
    {},
    "createdAt title slug description",
  )
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    props: {
      listPosts: JSON.stringify(topFiveLatestPosts),
    },
  };
}
