import React from "react";
import CardPresentation from "./Card.presentation";

function Card(props) {
  const createdAt = new Date(props.createdAt).toDateString();
  return <CardPresentation {...props} createdAt={createdAt} />;
}

export default Card;
