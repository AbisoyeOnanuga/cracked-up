import React, { useState } from "react";
import Game from "./game"; // import your custom game page
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Links from "../components/Links";
import Container from "../components/Container";
import useCurrentUser from "../hooks/useCurrentUser";


export default function Home() {
  const { loggedIn } = useCurrentUser();

  // This is a state variable that stores the number of players as a number
  const [numPlayers, setNumPlayers] = useState(0);

  // This is a function that handles the change of the number of players input
  const handleNumPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumPlayers(Number(event.target.value)); // set the numPlayers state with the input value as a number
  };

  return (
    <div className={styles.container}>
      
      <Head>
        <title>FCL Next Scaffold</title>
        <meta name="description" content="FCL Next Scaffold for the Flow Blockchain" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Game numPlayers={numPlayers} /> // pass the numPlayers prop to the Game component
      <div className={styles.controls}>
        <h2 className={styles.subtitle}>Choose your number of players</h2>
        <input
          className={styles.input}
          type="number"
          min="2"
          max="6"
          value={numPlayers}
          onChange={handleNumPlayersChange}
        />
      </div>
    </div>
  );
}