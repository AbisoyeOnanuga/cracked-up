// This is the main component that renders the game page
import React, { useState, useEffect } from "react";
import Card from "../components/card"; // This is a custom component that renders a card
import Score from "../components/score"; // This is a custom component that updates the score of the players
import Judge from "../components/judge"; // This is a custom component that selects the judge of each round
import Init from "../components/init"; // This is a custom component that initializes the game with some settings
import Winner from "../components/winner"; // This is a custom component that picks and announces the winner of the game
import Shuffle from "../components/shuffle"; // This is a custom component that shuffles an array
import styles from "./game.module.css"; // This is a CSS module for styling
import { max } from "../components/score"; // import the max function from the Score component


// This is a mock data for the cards, you can replace it with your own data from the backend
const cards = [
  {
    id: 1,
    front: "What is the most annoying thing about humans?",
    back: "Card Game Logo",
    type: "question",
  },
  {
    id: 2,
    front: "Pineapple on pizza",
    back: "Card Game Logo",
    type: "answer",
  },
  {
    id: 3,
    front: "Make up a word and its definition",
    back: "Card Game Logo",
    type: "wildcard",
  },
];

interface SettingsProps {
    numPlayers: number; // The number of players chosen by the user
}

// This is the main component that renders the game page
export default function Game({ numPlayers }: SettingsProps) {
    // This is a state variable that stores the winning point of the game as a number
    const [winningPoint, setWinningPoint] = useState(10);

    // This is a state variable that stores the game style of the game as a string
    const [gameStyle, setGameStyle] = useState("classic");

    // This is a function that generates an array of generic player names based on the number of players
    const generateNames = (numPlayers: number) => {
        let names = []; // initialize an empty array for names
        for (let i = 1; i <= numPlayers; i++) {
        // loop from 1 to numPlayers
        names.push(`Player${i}`); // push a generic name to the array
        }
        return names; // return the array of names
    };

    // This is a function that generates a settings object based on the number of players, winning point, and game style
    const generateSettings = (numPlayers: number, winningPoint: number, gameStyle: string) => {
        let settings = {}; // initialize an empty object for settings
        settings["names"] = generateNames(numPlayers); // add the names property to the settings object with the value of generateNames function
        settings["winningPoint"] = winningPoint; // add the winningPoint property to the settings object with the value of winningPoint state variable
        settings["gameStyle"] = gameStyle; // add the gameStyle property to the settings object with the value of gameStyle state variable
        return settings; // return the settings object
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
        let settings = generateSettings(numPlayers, winningPoint, gameStyle); // generate a settings object using generateSettings function
        // TODO: send the settings to your cadence smart contracts using Flow SDK or API or locally
        console.log("Settings:", settings);
    };
      // This is a function that initializes the game with some settings based on the number of players
    const initGame = (settings) => {
        // TODO: get the settings from the Init component or default values
        setNames(settings.names); // set the names state with the names array from settings
        setWinningPoint(settings.winningPoint); // set the winning point state with the winning point number from settings
        setGameStyle(settings.gameStyle); // set the game style state with the game style string from settings

        // TODO: get the cards from your cadence smart contracts using Flow SDK or API or mock data
        let questionCards = cards.filter((card) => card.type === "question"); // filter out the question cards
        let answerCards = cards.filter((card) => card.type === "answer"); // filter out the answer cards

        questionCards = Shuffle(questionCards); // shuffle the question cards using Shuffle component
        answerCards = Shuffle(answerCards); // shuffle the answer cards using Shuffle component

        setQuestion(questionCards.pop()); // pop out a question card and set it as the current question

        setAnswers(answerCards.slice(0, 10)); // slice out 10 answer cards and set them as the current answers

        setStatus("playing"); // set the status to playing
        setSelected(null); // reset the selected answer card
        setVoted(null); // reset the voted answer card
    };

    // This is a state variable that stores the names of the players as an array
    const [names, setNames] = useState([]);

    // This is a state variable that stores the current question card
    const [question, setQuestion] = useState(null);

    // This is a state variable that stores the current answer cards of the player
    const [answers, setAnswers] = useState([]);

    // This is a state variable that stores the current round of the game as a number
    const [round, setRound] = useState(1);

    // This is a state variable that stores the status of the game as a string
    const [status, setStatus] = useState("init");

    // This is a state variable that stores the selected answer card of the player as an object
    const [selected, setSelected] = useState(null);

    // This is a state variable that stores the voted answer card of the judge as an object
    const [voted, setVoted] = useState(null);

    // This is a state variable that stores the score of each player as an object
    const score = Score({ players: names, voted: voted });

    // This is a state variable that stores the current judge of the game as a string
    const judge = Judge({ players: names, round: round, gameStyle: gameStyle });


    // This is a function that updates the game after each round
    const updateGame = () => {
        // TODO: get the cards from your cadence smart contracts using Flow SDK or API or mock data
        let questionCards = cards.filter((card) => card.type === "question"); // filter out the question cards
        let answerCards = cards.filter((card) => card.type === "answer"); // filter out the answer cards

        questionCards = Shuffle(questionCards); // shuffle the question cards using Shuffle component
        answerCards = Shuffle(answerCards); // shuffle the answer cards using Shuffle component

        setQuestion(questionCards.pop()); // pop out a question card and set it as the current question
        setAnswers(answerCards.slice(0, 10)); // slice out 10 answer cards and set them as the current answers

        setRound(round + 1); // increment the round by 1
        setSelected(null); // reset the selected answer card
        setVoted(null); // reset the voted answer card

        // TODO: check if the game is over or not
        if (max(score)[1] >= winningPoint) {
        // if the maximum value in the score object is equal or greater than the winning point, the game is over
        setStatus("over"); // set the status to over
        }
    };

    // This is a function that handles the selection of an answer card by the player
    const handleSelect = (card) => {
        setSelected(card); // set the selected card as the current card
    };

    // This is a function that handles the submission of an answer card by the player
    const handleAnswer = () => {
        // TODO: send the selected card to your cadence smart contracts using Flow SDK or API or locally
        console.log("Submitted:", selected);
    };

    // This is a function that handles the voting of an answer card by the judge
    const handleVote = (card) => {
        setVoted(card); // set the voted card as the current card
        updateGame(); // update the game after voting
    };

    // This is a function that handles the restart of the game by the player
    const handleRestart = () => {
        initGame(Game); // initialize the game again
    };

    // This is a hook that runs once when the component mounts
    useEffect(() => {
        initGame(Game); // initialize the game when the component mounts
    }, []);


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Card Game</h1>
            {status === "init" && (
                <Init numPlayers={numPlayers} /> /* render Init component if status is init */
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
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
                        Classic: The winner is decided by the winning point.
                    </label>
                    <label className={styles.label}>
                        <input
                        className={styles.radio}
                        type="radio"
                        name="gameStyle"
                        value="full deck"
                        checked={gameStyle === "full deck"}
                        onChange={handleGameStyleChange}
                        />
                        Full Deck: The winner is decided when the deck has used up.
                    </label>
                </div>
                <button className={styles.button} type="submit">
                Start Game
                </button>
            </form>
            {status === "playing" && (
                <div className={styles.game}>
                    <div className={styles.question}>
                        <h2 className={styles.subtitle}>Question</h2>
                        {question && <Card card={question} />}
                    </div>
                    <div className={styles.answers}>
                        <h2 className={styles.subtitle}>Answers</h2>
                        {answers.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            selected={selected && selected.id === card.id}
                            onClick={() => handleSelect(card)}
                        />
                        ))}
                    </div>
                </div>
            )}
            {status === "over" && <Winner score={score} /> /* render Winner component if status is over */}
            <div className={styles.controls}>
                {status === "playing" && (
                <form onSubmit={handleSubmit}>
                    <p className={styles.info}>
                    Round: {round} / Judge: {judge} / Score: {JSON.stringify(score)}
                    </p>
                    {selected && (
                        <button className={styles.button} type ="submit">
                            Submit
                        </button>
                    )}
                    {voted && (
                        <button className={styles.button} onClick={handleVote}>
                            Vote
                        </button>
                    )}
                </form>
                )}
                {status === "over" && (
                <div>
                    <p className={styles.info}>Game Over!</p>
                    <button className={styles.button} onClick={handleRestart}>
                    Restart
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}