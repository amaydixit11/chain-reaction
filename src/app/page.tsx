"use client";
import React, { useState } from "react";
import Grid from "@/components/Grid"; // Adjust the import as needed
import StartScreen from "@/components/StartScreen"; // Import the StartScreen component

const Home: React.FC = () => {
  const [players, setPlayers] = useState<{ color: string }[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStart = (players: { color: string }[]) => {
    setPlayers(players);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <Grid players={players} />
      )}
    </div>
  );
};

export default Home;
