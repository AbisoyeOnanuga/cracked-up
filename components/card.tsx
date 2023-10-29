// This is a custom component that renders a card
import React from "react";
import styles from "./Card.module.css"; // This is a CSS module for styling the card

// Define the type of the props for the Card component
type CardProps = {
  front: string;
  back: string;
};

// Define the Card component using the CardProps type
const Card = ({ front, back }: CardProps) => {
  return (
    <div className="card">
      <p>{front}</p>
      <p>{back}</p>
    </div>
  );
};

export default Card;
