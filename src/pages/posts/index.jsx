import React, { useState } from "react";
import Head from "next/head";
import NavBar from "./../../layouts/NavBar/NavBar.index";
import Container from "@material-ui/core/Container";
import Card from "./../../components/Card/Card.index";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import dbConnect from "./../../utils/dbConnect";
import Post from "./../../models/Post";
import PropTypes from "prop-types";
import useSWR from "swr";
import { toast } from "react-toastify";
import Footer from "../../layouts/Footer/Footer.index";
import sessionConfigure from "../../utils/sessionConfigure";
import { applySession } from "next-session";

const useStyles = makeStyles({
  container: {
    marginTop: "90px",
  },
});

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

export default function Posts({ postCount, loggedIn }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error } = useSWR(
    `/api/posts?page=${page}&rowsPerPage=${rowsPerPage}`,
    fetcher,
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let willRender = <p>{"Loading"}</p>;
  if (error) {
    toast.error("Failed to load data", {
      toastId: "errorFetchData",
    });

    willRender = <p>{"Failed to load data"}</p>;
  } else if (data) {
    willRender = data.map((elm, index) => (
      <Card key={index} {...elm} gutterBottom={index !== data.length - 1} />
    ));

    if (data.length === 0) {
      willRender = <p>{"No posts"}</p>;
    }
  }

  return (
    <>
      <Head>
        <title>{"iBlog - post list"}</title>
      </Head>
      <>
        <NavBar loggedIn={loggedIn} />
        <Container maxWidth="md" className={classes.container}>
          <Container maxWidth="md">
            {willRender}
            <TablePagination
              component="div"
              count={postCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Container>
        <Footer />
      </>
    </>
  );
}

Posts.propTypes = {
  postCount: PropTypes.number,
  loggedIn: PropTypes.bool,
};

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, sessionConfigure);
  await dbConnect();
  const postCount = await Post.countDocuments();

  return {
    props: {
      postCount,
      loggedIn: Boolean(req.session.authKey),
    },
  };
}
