import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Card.styles";
import Link from "next/link";
import PropTypes from "prop-types";

function CardPresentation(props) {
  const classes = useStyles(props.gutterBottom);
  const { title, description, slug, createdAt } = props;

  return (
    <div className={classes.wrapper}>
      <Typography variant="caption" display="block">
        {createdAt}
      </Typography>
      <Link href={`/posts/${slug}`}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Link>
      <Typography variant="body1">
        {description}
        {"..."}
        <Link href={`/posts/${slug}`}>
          <a className={classes.link}>read more</a>
        </Link>
      </Typography>
    </div>
  );
}

CardPresentation.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  gutterBottom: PropTypes.bool,
};

export default CardPresentation;
