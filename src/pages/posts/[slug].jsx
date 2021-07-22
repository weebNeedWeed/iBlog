import React from "react";
import Head from "next/head";
import NavBar from "./../../layouts/NavBar/NavBar.index";
import PropTypes from "prop-types";
import Footer from "../../layouts/Footer/Footer.index";
import { useRouter } from "next/router";
import useSWR from "swr";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CustomEditor from "./../../components/CustomEditor/CustomEditor.index";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import withSession from "./../../utils/withSession";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const useStyles = makeStyles({
  container: {
    marginTop: "90px",
  },
  title: {
    marginBottom: "20px",
    fontWeight: "500",
    borderBottom: "2px solid black",
    padding: "5px",
  },
});

export default function Posts({ loggedIn }) {
  const router = useRouter();
  const classes = useStyles();
  const { slug } = router.query;
  const { data, error } = useSWR(`/api/posts/${slug}`, fetcher);

  let willRender = <p>{"Loading"}</p>;
  if (error) {
    toast.error("Failed to load data", {
      toastId: "errorFetchData",
    });

    willRender = <div>{"Failed to load data"}</div>;
  } else if (data) {
    willRender = (
      <>
        <Typography variant="h4" className={classes.title}>
          {data.title}
        </Typography>
        <CustomEditor readOnly data={JSON.parse(data.content)} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{"iBlog"}</title>
      </Head>
      <>
        <NavBar loggedIn={loggedIn} />
        <Container maxWidth="md" className={classes.container}>
          {willRender}
        </Container>
        <Footer />
      </>
    </>
  );
}

Posts.propTypes = {
  loggedIn: PropTypes.bool,
};

export const getServerSideProps = withSession(async function ({ req }) {
  return { props: { loggedIn: Boolean(req.session.get("authKey")) } };
});
