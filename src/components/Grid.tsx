"use client";
import React, { useState } from "react";
import { Cell } from "@/types/cell";

const Grid: React.FC<{ players: { color: string }[] }> = ({ players }) => {
  const gridColSize = 20;
  const gridRowSize = 10;

  // Initialize cells as a 2D array
  const [cells, setCells] = useState<Cell[][]>(
    Array.from({ length: gridRowSize }, (_, row) =>
      Array.from({ length: gridColSize }, (_, col) => ({
        color: null,
        value: 0,
        row: row,
        column: col,
      }))
    )
  );

  const [currentPlayer, setCurrentPlayer] = useState<number>(0);

  // Check if cell is a corner
  const isCorner = (row: number, col: number): boolean => {
    return (
      (row === 0 && col === 0) ||
      (row === 0 && col === gridColSize - 1) ||
      (row === gridRowSize - 1 && col === 0) ||
      (row === gridRowSize - 1 && col === gridColSize - 1)
    );
  };

  // Check if cell is on the edge
  const isEdge = (row: number, col: number): boolean => {
    return (
      (row === 0 ||
        row === gridRowSize - 1 ||
        col === 0 ||
        col === gridColSize - 1) &&
      !isCorner(row, col)
    );
  };

  // Check if cell is in the middle
  const isMiddle = (row: number, col: number): boolean => {
    return !isCorner(row, col) && !isEdge(row, col);
  };

  // Handle explosion based on cell position (corner, edge, middle)
  const handleExplosion = (
    row: number,
    col: number,
    currentCells: Cell[][]
  ): void => {
    const cell = currentCells[row][col];
    let updatedCells = [...cells.map((row) => [...row])]; // Make a deep copy of the cells

    // Handle corner cells (split when value reaches 2)
    if (isCorner(row, col) && cell.value === 2) {
      // Split to neighbors
      if (row === 0 && col === 0) {
        updatedCells[row + 1][col].value += 1;
        updatedCells[row][col + 1].value += 1;
      } else if (row === 0 && col === gridColSize - 1) {
        updatedCells[row + 1][col].value += 1;
        updatedCells[row][col - 1].value += 1;
      } else if (row === gridRowSize - 1 && col === 0) {
        updatedCells[row - 1][col].value += 1;
        updatedCells[row][col + 1].value += 1;
      } else if (row === gridRowSize - 1 && col === gridColSize - 1) {
        updatedCells[row - 1][col].value += 1;
        updatedCells[row][col - 1].value += 1;
      }
      updatedCells[row][col].value = 0; // Reset current cell
    }

    // Handle edge cells (split when value reaches 3)
    else if (isEdge(row, col) && cell.value === 3) {
      if (row === 0) {
        updatedCells[row + 1][col].value += 1;
      } else if (row === gridRowSize - 1) {
        updatedCells[row - 1][col].value += 1;
      }
      if (col === 0) {
        updatedCells[row][col + 1].value += 1;
      } else if (col === gridColSize - 1) {
        updatedCells[row][col - 1].value += 1;
      }
      updatedCells[row][col].value = 0;
    }

    // Handle middle cells (split when value reaches 4)
    else if (isMiddle(row, col) && cell.value === 4) {
      updatedCells[row - 1][col].value += 1;
      updatedCells[row + 1][col].value += 1;
      updatedCells[row][col - 1].value += 1;
      updatedCells[row][col + 1].value += 1;
      updatedCells[row][col].value = 0;
    }

    setCells(updatedCells);
  };

  const handleCellClick = (row: number, col: number): void => {
    const currentCells = [...cells.map((r) => [...r])]; // Deep copy the 2D array
    const cell = currentCells[row][col];

    console.log("Cell before update:", cell); // Debug log

    if (cell.color === players[currentPlayer].color) {
      // If the cell belongs to the current player, increment the value
      currentCells[row][col] = {
        ...cell,
        value: cell.value + 1,
      };
      setCells(currentCells);
    } else if (!cell.color) {
      // If the cell is unclaimed, set the player's color and value to 1
      currentCells[row][col] = {
        ...cell,
        color: players[currentPlayer].color,
        value: 1,
      };
      setCells(currentCells);
    } else {
      // If the cell belongs to another player, do nothing
      return;
    }

    console.log("Cell after update:", currentCells[row][col]); // Debug log

    // After setting the cells, handle the explosion
    handleExplosion(row, col, currentCells);

    // Switch to the next player
    setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players.length);
  };

  return (
    <div>
      <h3 className="text-white mb-4">
        Current Player:{" "}
        <span
          style={{ color: players[currentPlayer].color }}
          className="font-bold"
        >
          Player {currentPlayer + 1}
        </span>
      </h3>
      <div
        className="grid gap-1 bg-gray-900 p-4"
        style={{
          gridTemplateColumns: `repeat(${gridColSize}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square w-full border flex items-center justify-center cursor-pointer"
              style={{
                borderColor: cell.color || players[currentPlayer].color,
                backgroundColor: cell.color || "transparent",
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {/* Display the cell value */}
              {cell.value > 0 && (
                <span className="text-white font-bold">{cell.value}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;

// return
//   <div>
//     <h3 className="text-white mb-4">
//       Current Player:{" "}
//       <span
//         style={{ color: players[currentPlayer].color }}
//         className="font-bold"
//       >
//         Player {currentPlayer + 1}
//       </span>
//     </h3>
//     <div
//       className="grid gap-1 bg-gray-900 p-4"
//       style={{
//         gridTemplateColumns: repeat(${gridColSize}, minmax(0, 1fr)),
//       }}
//     >
//       {cells.map((cell, index) => (
//         <div
//           key={index}
//           className="aspect-square w-full border flex items-center justify-center cursor-pointer relative"
//           style={{
//             borderColor: cell.color || players[currentPlayer].color,
//             backgroundColor: cell.color || "transparent",
//           }}
//           onClick={() => handleCellClick(index)}
//         >
//           {/* Display the cell value */}
//           {cell.value > 0 && (
//             <span className="text-white font-bold">{cell.value}</span>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
