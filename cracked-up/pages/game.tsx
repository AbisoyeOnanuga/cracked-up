// This is the game page that imports and uses the custom components
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Shuffle from "../components/shuffle"; // import the shuffle component
import Score from "../components/score"; // import the score component
import Judge from "../components/judge"; // import the judge component
//import Init from "../components/init"; // import the init component
import Winner from "../components/winner"; // import the winner component
import Card from "../components/card"; // import the card component
import styles from "./Game.module.css"; // import the game styles

// Define the types of cards and players
type Card = {
  id: number;
  front: string;
  back: string;
};

type Player = {
  id: number;
  name: string;
  score: number;
  cards: Card[];
};

// Define the constants for the number of players, cards, and points
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 6;
const CARDS_PER_PLAYER = 10;
const MAX_POINTS = 10;

// Define the arrays of question cards and answer cards
const questionCards: Card[] = [
  // Add your question cards here
];

const answerCards: Card[] = [
  // Add your answer cards here
];

// Define a component for the game page
const GamePage = () => {
  // Get the router object from Next.js
  const router = useRouter();

  // Get the query parameters from the router object
  const { numPlayers, judge, gameMode } = router.query;

  // Parse the query parameters as numbers or strings
  const numPlayersNum = Number(numPlayers);
  const judgeNum = Number(judge);
  const gameModeStr = String(gameMode);

  // Validate the query parameters and redirect to home page if invalid
  if (
    isNaN(numPlayersNum) ||
    isNaN(judgeNum) ||
    !["classic", "points"].includes(gameModeStr)
  ) {
    router.push("/");
    return null;
  }

  // Initialize the state variables for the game logic
  const [players, setPlayers] = useState<Player[]>([]);
  const [questionDeck, setQuestionDeck] = useState<Card[]>([]);
  const [answerDeck, setAnswerDeck] = useState<Card[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Card | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Card[]>([]);
  const [currentJudge, setCurrentJudge] = useState<number>(judgeNum);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  // Define a function to start a new round of the game
  const startNewRound = () => {
    // Check if there are enough question cards left in the deck
    if (questionDeck.length > 0) {
      // Pick a random question card from the deck and remove it
      const randomIndex = Math.floor(Math.random() * questionDeck.length);
      const questionCard = questionDeck[randomIndex];
      setQuestionDeck(questionDeck.filter((card) => card.id !== questionCard.id));

      // Set the current question card state
      setCurrentQuestion(questionCard);

      // Reset the current answers state
      setCurrentAnswers([]);

      // Update the current judge state by rotating among the players
      setCurrentJudge((currentJudge + 1) % numPlayersNum);
    } else {
      // If there are no more question cards left, end the game
      endGame();
    }
  };

  // Define a function to end the game and declare a winner
  const endGame = () => {
    // Set the game over state to true
    setGameOver(true);

    // Find the player with the highest score and set the winner state
    const maxScore = Math.max(...players.map((player) => player.score));
    const winningPlayer = players.find((player) => player.score === maxScore);
    setWinner(winningPlayer || null);
  };

  // Define a function to handle the player's card selection
  const handleCardSelect = (card: Card) => {
    // Check if the player is not the judge and has not already selected a card
    if (currentJudge !== card.id && !currentAnswers.includes(card)) {
      // Add the card to the current answers state
      setCurrentAnswers([...currentAnswers, card]);

      // Remove the card from the player's cards state
      setPlayers(
        players.map((player) =>
          player.id === card.id
            ? { ...player, cards: player.cards.filter((c) => c.id !== card.id) }
            : player
        )
      );

      // Check if there are enough answer cards left in the deck
      if (answerDeck.length > 0) {
        // Pick a random answer card from the deck and remove it
        const randomIndex = Math.floor(Math.random() * answerDeck.length);
        const answerCard = answerDeck[randomIndex];
        setAnswerDeck(answerDeck.filter((card) => card.id !== answerCard.id));

        // Add the card to the player's cards state
        setPlayers(
          players.map((player) =>
            player.id === card.id
              ? { ...player, cards: [...player.cards, answerCard] }
              : player
          )
        );
      }
    }
  };

  // Define a function to handle the judge's vote
  const handleVote = (card: Card) => {
    // Check if the judge has voted for a valid answer card
    if (currentJudge !== card.id && currentAnswers.includes(card)) {
      // Update the score of the player who submitted the answer card
      setPlayers(
        players.map((player) =>
          player.id === card.id ? { ...player, score: player.score + 1 } : player
        )
      );

      // Check if the game mode is points and the player has reached the max points
      if (gameModeStr === "points" && players[card.id].score + 1 === MAX_POINTS) {
        // End the game and declare the player as the winner
        endGame();
        setWinner(players[card.id]);
      } else {
        // Start a new round of the game
        startNewRound();
      }
    }
  };

  // Use an effect hook to initialize the game state when the component mounts
  useEffect(() => {
    // Create an array of players with ids, names, scores, and cards
    const playersArray: Player[] = [];
    for (let i = 0; i < numPlayersNum; i++) {
      playersArray.push({
        id: i,
        name: `Player ${i + 1}`,
        score: 0,
        cards: [],
      });
    }

    // Set the players state with the array of players
    setPlayers(playersArray);

    // Set the question deck state with a shuffled copy of the question cards array
    setQuestionDeck(Shuffle([...questionCards]));

    // Set the answer deck state with a shuffled copy of the answer cards array
    setAnswerDeck(Shuffle([...answerCards]));

    // Start a new round of the game
    startNewRound();
  }, []);

  return (
    <div className="container">
      <h1>Words Against Humanity with a Twist</h1>
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          {winner ? (
            <Winner name={winner.name} score={winner.score} />
          ) : (
            <p>It's a tie! No one has won the game.</p>
          )}
          <button onClick={() => router.push("/")}>Play Again</button>
        </div>
      ) : (
        <div className="game-play">
          <h2>Current Round</h2>
          <p>The judge is {players[currentJudge].name}.</p>
          {currentQuestion && (
            <div className="question-card">
              <Card front={currentQuestion.front} back={currentQuestion.back} />
            </div>
          )}
          <h3>Current Answers</h3>
          <div className="answer-cards">
            {currentAnswers.map((card) => (
              <div key={card.id} className="answer-card" onClick={() => handleVote(card)}>
                <Card front={card.front} back={card.back} />
              </div>
            ))}
          </div>
          <h3>Your Cards</h3>
          <div className="your-cards">
            {players[0].cards.map((card) => (
              <div key={card.id} className="your-card" onClick={() => handleCardSelect(card)}>
                <Card front={card.front} back={card.back} />
              </div>
            ))}
          </div>
        </div>
      )}
      <h4>Scoreboard</h4>
      <div className="scoreboard">
        {players.map((player) => (
          <Score key={player.id} name={player.name} score={player.score} />
        ))}
      </div>
    </div>
  );
};

export default GamePage;