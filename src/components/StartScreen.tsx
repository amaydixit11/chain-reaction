"use client";
import React, { useState } from "react";

const defaultColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#000080",
];

const StartScreen: React.FC<{
  onStart: (players: { color: string }[]) => void;
}> = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerColors, setPlayerColors] = useState<string[]>(
    defaultColors.slice(0, 10)
  );

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...playerColors];
    newColors[index] = color;
    setPlayerColors(newColors);
  };

  const handleStartGame = () => {
    const players = playerColors
      .slice(0, playerCount)
      .map((color) => ({ color }));
    onStart(players);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">Choose Number of Players</h1>

      {/* Player count selection */}
      <select
        value={playerCount}
        onChange={(e) => setPlayerCount(Number(e.target.value))}
        className="mb-4"
      >
        {Array.from({ length: 10 }, (_, index) => index + 2).map((player) => (
          <option key={player} value={player}>
            {player} Players
          </option>
        ))}
      </select>

      <h2 className="text-xl mb-4">Enter Player Colors</h2>

      {/* Color picker for each player */}
      {Array.from({ length: playerCount }, (_, index) => (
        <div key={index} className="flex items-center mb-2">
          <label className="mr-2">Player {index + 1}:</label>
          <input
            type="color"
            value={playerColors[index]}
            onChange={(e) => handleColorChange(index, e.target.value)}
            className="w-12 h-12 border-none cursor-pointer"
          />
        </div>
      ))}

      {/* Play Game Button */}
      <button
        onClick={handleStartGame}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Play Game
      </button>
    </div>
  );
};

export default StartScreen;
