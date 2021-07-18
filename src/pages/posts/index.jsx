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

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Posts({ postCount }) {
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

  let willRender;
  if (error) {
    toast.error("Failed to load data", {
      toastId: "errorFetchData",
    });

    willRender = <div>Failed to load data</div>;
  } else if (data) {
    willRender = data.map((elm, index) => (
      <Card key={index} {...elm} gutterBottom={index !== data.length - 1} />
    ));
  }

  return (
    <>
      <Head>
        <title>iBlog - Post list</title>
      </Head>
      <>
        <NavBar />
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
};

export async function getServerSideProps() {
  await dbConnect();
  const postCount = await Post.countDocuments();

  return {
    props: {
      postCount,
    },
  };
}
