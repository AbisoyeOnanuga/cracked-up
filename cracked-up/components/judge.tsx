// This is a custom component that selects the judge of each round based on the game style
import React, { useState, useEffect } from "react";
import shuffle from "./shuffle"; // import the shuffle component
import styles from "./judge.module.css"; // import the CSS module file

interface JudgeProps {
  players: string[]; // an array of player names
  round: number; // the current round number
  gameStyle: string; // the game style chosen by the players
}

export default function Judge({ players, round, gameStyle }: JudgeProps) {
  // This is a state variable that stores the judge of each round as a string
  const [judge, setJudge] = useState("");

  // This is a hook that runs whenever the round or game style changes
  useEffect(() => {
    if (gameStyle === "classic") {
      // if the game style is classic, then the judge rotates among the players in order
      setJudge(players[round % players.length]); // set the judge to be the player at the index of round modulo players length
    } else if (gameStyle === "random") {
      // if the game style is random, then the judge is randomly chosen from the players
      setJudge(shuffle(players)[0]); // set the judge to be the first element of a shuffled array of players
    }
  }, [round, gameStyle]);

  return judge; // return the judge string
}
