// This is a custom component that updates the score of the players based on the voted answer card
import React, { useState, useEffect } from "react";
import styles from "./score.module.css"; // import the CSS module file

// Define the type of the props for the Score component
type ScoreProps = {
  name: string;
  score: number;
};

// Define the Score component using the ScoreProps type
const Score = ({ name, score }: ScoreProps) => {
  return (
    <div className="score">
      <p>{name}: {score}</p>
    </div>
  );
};

export default Score;