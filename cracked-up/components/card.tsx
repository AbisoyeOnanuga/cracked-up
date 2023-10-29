// This is a custom component that renders a card
import React from "react";
import styles from "./Card.module.css"; // This is a CSS module for styling the card

interface CardProps {
  card: {
    id: number;
    front: string;
    back: string;
    type: string;
  };
  selected?: boolean;
  onClick?: () => void;
}

export default function Card({ card, selected, onClick }: CardProps) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.front}>{card.front}</div>
      <div className={styles.back}>{card.back}</div>
    </div>
  );
}
