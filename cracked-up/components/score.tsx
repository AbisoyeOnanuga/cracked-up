// This is a custom component that updates the score of the players based on the voted answer card
import React, { useState, useEffect } from "react";
import styles from "./score.module.css"; // import the CSS module file


interface ScoreProps {
  players: string[]; // an array of player names
  voted: any; // the voted answer card
}

// This is a helper function that finds the maximum value in an object
export const max = (obj: any) => {
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

export default function Score({ players, voted }: ScoreProps) {
  // This is a state variable that stores the score of each player as an object
  const [score, setScore] = useState(
    players.reduce((obj, player) => ({ ...obj, [player]: 0 }), {})
  );

  // This is a hook that runs whenever the voted answer card changes
  useEffect(() => {
    if (voted) {
      // TODO: get the player who played the voted card from the backend or locally
      let winner = "Player1"; // for demonstration purpose, assume Player1 played the voted card
      setScore({ ...score, [winner]: score[winner] + 1 }); // increment the score of the winner by 1
    }
  }, [voted]);

  useEffect(() => {
    // do something with players and voted props
  }, []); // pass an empty array as dependency

  return score; // return the score object
}