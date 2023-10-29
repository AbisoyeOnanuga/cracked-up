// This is a custom component that picks and announces the winner of the game based on the score of each player
import React from "react";
import styles from "./winner.module.css"; // This is a CSS module for styling

interface WinnerProps {
  score: any; // The score object that contains the points of each player
}

export default function Winner({ score }: WinnerProps) {
  // This is a function that finds the maximum value in an object
  const max = (obj: any) => {
    let maxVal = -Infinity; // initialize the maximum value to negative infinity
    let maxKey = ""; // initialize the maximum key to an empty string
    for (let key in obj) {
      // loop through each key in the object
      if (obj[key] > maxVal) {
        // if the value of the key is greater than the current maximum value
        maxVal = obj[key]; // update the maximum value to be the value of the key
        maxKey = key; // update the maximum key to be the key
      }
    }
    return [maxKey, maxVal]; // return an array of the maximum key and value
  };

  // This is a function that picks the winner of the game based on the score object
  const pickWinner = (score: any) => {
    let [winner, points] = max(score); // get the winner and points from the max function
    return `${winner} won with ${points} points!`; // return a string that announces the winner and points
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Over!</h1>
      <p className={styles.message}>{pickWinner(score)}</p>
      <p className={styles.message}>Congratulations!</p>
    </div>
  );
}
