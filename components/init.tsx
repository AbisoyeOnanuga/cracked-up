// This is a custom component that initializes the game with some settings based on the number of players
import React, { useState } from "react";
import styles from "./init.module.css"; // This is a CSS module for styling

interface InitProps {
  numPlayers: number; // The number of players chosen by the user
}

export default function Init({ numPlayers }: InitProps) {
  // This is a state variable that stores the names of the players as an array
  const [names, setNames] = useState(Array(numPlayers).fill(""));

  // This is a state variable that stores the winning point of the game as a number
  const [winningPoint, setWinningPoint] = useState(10);

  // This is a state variable that stores the game style of the game as a string
  const [gameStyle, setGameStyle] = useState("classic");

  // This is a function that handles the change of the name input of each player
  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let newNames = [...names]; // copy the names array
    newNames[index] = event.target.value; // update the name at the index with the input value
    setNames(newNames); // set the names state with the new array
  };

  // This is a function that handles the change of the winning point input
  const handleWinningPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWinningPoint(Number(event.target.value)); // set the winning point state with the input value as a number
  };

  // This is a function that handles the change of the game style radio button
  const handleGameStyleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameStyle(event.target.value); // set the game style state with the input value as a string
  };

  // This is a function that handles the submission of the settings form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent the default form behavior
    // TODO: send the settings to the backend or store them locally
    console.log("Settings:", names, winningPoint, gameStyle);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Card Game</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.names}>
          <h2 className={styles.subtitle}>Enter your names</h2>
          {names.map((name, index) => (
            <input
              key={index}
              className={styles.input}
              type="text"
              placeholder={`Player ${index + 1}`}
              value={name}
              onChange={(event) => handleNameChange(index, event)}
              required
            />
          ))}
        </div>
        <div className={styles.winningPoint}>
          <h2 className={styles.subtitle}>Choose your winning point</h2>
          <input
            className={styles.input}
            type="number"
            min="1"
            max="20"
            value={winningPoint}
            onChange={handleWinningPointChange}
          />
        </div>
        <div className={styles.gameStyle}>
          <h2 className={styles.subtitle}>Choose your game style</h2>
          <label className={styles.label}>
            <input
              className={styles.radio}
              type="radio"
              name="gameStyle"
              value="classic"
              checked={gameStyle === "classic"}
              onChange={handleGameStyleChange}
            />
            Classic: The judge rotates among the players in order.
          </label>
          <label className={styles.label}>
            <input
              className={styles.radio}
              type="radio"
              name="gameStyle"
              value="random"
              checked={gameStyle === "random"}
              onChange={handleGameStyleChange}
            />
            Random: The judge is randomly chosen from the players.
          </label>
        </div>
        <button className={styles.button} type="submit">
          Start Game
        </button>
      </form>
    </div>
  );
}
