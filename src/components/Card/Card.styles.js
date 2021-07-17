import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "solid #383838 1px",
    borderRadius: "10px",
    padding: "8px",
    marginBottom: (gutterBottom) => (gutterBottom ? "15px" : "0px"),
  },
  link: {
    color: "#383838",
    transition: theme.transitions.create(),
    "&:hover": {
      color: "#000",
    },
  },
  title: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default useStyles;
