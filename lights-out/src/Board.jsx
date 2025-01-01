import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float between 0 and 1, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let row = 0; row < nrows; row++) {
      let currentRow = [];
      for (let col = 0; col < ncols; col++) {
        const isCurrentLightOn = Math.random() <= chanceLightStartsOn;
        currentRow.push(isCurrentLightOn);
      }
      initialBoard.push(currentRow);
    }
    return initialBoard;
  }

  /** Check the board in state to determine whether the player has won. Only true if all lights are off aka false. */
  function hasWon() {
    for (let row of board) {
      for (let light of row) {
        if (light) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    //make a deep copy of the current state board, then flip the cell corresponding to the coord and the neighbouring cells.
    setBoard(oldBoard => {
      //here, coord will be something like "0-1" meaning y = 0 aka first row, x = 1 aka second column.
      //So, it .split("-") will convert it to ["0", "1"] and .map(Number) converts each string to a number aka [0,1].
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = JSON.parse(JSON.stringify(oldBoard));

      //toggle the cell corresponding to the coords and its neighbors.
      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard); //bottom neighbor
      flipCell(y-1, x, newBoard); //top neighbor
      flipCell(y, x+1, newBoard); //right neighbor
      flipCell(y, x-1, newBoard); //left neighbor

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
