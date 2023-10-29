// This is the game page that imports and uses the custom components
import React, { useState, useEffect } from "react";
import shuffle from "../components/shuffle"; // import the shuffle component
import Score from "../components/score"; // import the score component
import Judge from "../components/judge"; // import the judge component
import Init from "../components/init"; // import the init component
import Winner from "../components/winner"; // import the winner component
import Card from "../components/card"; // import the card component
import styles from "./Game.module.css"; // import the game styles


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

// This is the main component that renders the game page
export default function Game() {
  // This is a state variable that stores the current question card
  const [question, setQuestion] = useState(null);

  // This is a state variable that stores the current answer cards of the player
  const [answers, setAnswers] = useState([]);

  // This is a state variable that stores the current score of each player as an object
  const [score, setScore] = useState({});

  // This is a state variable that stores the current judge of each round as a string
  const [judge, setJudge] = useState("");

  // This is a state variable that stores the current round of the game
  const [round, setRound] = useState(1);

  // This is a state variable that stores the winning point of the game
  const [winningPoint, setWinningPoint] = useState(10);

  // This is a state variable that stores the game style of the game
  const [gameStyle, setGameStyle] = useState("classic");

  // This is a state variable that stores the status of the game
  const [status, setStatus] = useState("playing");

  // This is a state variable that stores the selected answer card of the player
  const [selected, setSelected] = useState(null);

  // This is a state variable that stores the voted answer card of the judge
  const [voted, setVoted] = useState(null);

  // This is a function that shuffles an array using Fisher-Yates algorithm
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // This is a function that initializes the game with some settings
  const initGame = () => {
    // TODO: get the settings from the user input or default values
    setWinningPoint(10); // set the winning point to 10
    setGameStyle("classic"); // set the game style to classic
    setJudge("Player1"); // set the judge to Player1

    // TODO: get the cards from the backend or mock data
    let questionCards = cards.filter((card) => card.type === "question"); // filter out the question cards
    let answerCards = cards.filter((card) => card.type === "answer"); // filter out the answer cards

    questionCards = shuffle(questionCards); // shuffle the question cards
    answerCards = shuffle(answerCards); // shuffle the answer cards

    setQuestion(questionCards.pop()); // pop out a question card and set it as the current question
    setAnswers(answerCards.slice(0, 10)); // slice out 10 answer cards and set them as the current answers

    setStatus("playing"); // set the status to playing
    setSelected(null); // reset the selected answer card
    setVoted(null); // reset the voted answer card
  };

  // This is a function that updates the game after each round
  const updateGame = () => {
    // TODO: get the cards from the backend or mock data
    let questionCards = cards.filter((card) => card.type === "question"); // filter out the question cards
    let answerCards = cards.filter((card) => card.type === "answer"); // filter out the answer cards

    questionCards = shuffle(questionCards); // shuffle the question cards
    answerCards = shuffle(answerCards); // shuffle the answer cards

    setQuestion(questionCards.pop()); // pop out a question card and set it as the current question
    setAnswers(answerCards.slice(0, 10)); // slice out 10 answer cards and set them as the current answers

    setRound(round + 1); // increment the round by 1
    setSelected(null); // reset the selected answer card
    setVoted(null); // reset the voted answer card

    // TODO: switch the judge to the next player or randomly
    setJudge("Player2"); // set the judge to Player2

    // TODO: check if the game is over or not
    if (score >= winningPoint) {
      // if the score is equal or greater than the winning point, the game is over
      setStatus("over"); // set the status to over
    }
  };

  // This is a function that handles the selection of an answer card by the player
  const handleSelect = (card) => {
    setSelected(card); // set the selected card as the current card
  };

  // This is a function that handles the submission of an answer card by the player
  const handleSubmit = () => {
    // TODO: send the selected card to the backend or store it locally
    console.log("Submitted:", selected);
  };

  // This is a function that handles the voting of an answer card by the judge
  const handleVote = (card) => {
    setVoted(card); // set the voted card as the current card
    // TODO: update the score of the player who played the voted card
    setScore(score + 1); // increment the score by 1 for demonstration purpose
    updateGame(); // update the game after voting
  };

  // This is a function that handles the restart of the game by the player
  const handleRestart = () => {
    initGame(); // initialize the game again
  };

  // This is a hook that runs once when the component mounts
  useEffect(() => {
    initGame(); // initialize the game when the component mounts
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Card Game</h1>
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
      <div className={styles.controls}>
        {status === "playing" && (
          <>
            <p className={styles.info}>
              Round: {round} / Judge: {judge} / Score: {score}
            </p>
            {selected && (
              <button className={styles.button} onClick={handleSubmit}>
                Submit
              </button>
            )}
            {voted && (
              <button className={styles.button} onClick={handleVote}>
                Vote
              </button>
            )}
          </>
        )}
        {status === "over" && (
          <>
            <p className={styles.info}>Game Over! You won with {score} points!</p>
            <button className={styles.button} onClick={handleRestart}>
              Restart
            </button>
          </>
        )}
      </div>
    </div>
  );
}