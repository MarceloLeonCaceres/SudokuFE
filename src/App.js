import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { INITIAL_GAME_BOARD } from "./components/initial-board.js";
import NumericKeyBoard from "./components/NumericKeyBoard.jsx";

import { useContext } from "react";
import { SudokuContext } from "./store/sudoku-context.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "1";

  if (gameTurns.length > 0 && gameTurns[0].player === "1") {
    currentPlayer = "2";
  }
  // if(num === 3){
  //   currentPlayer = '3';
  // }
  // else if(num === 4){
  //   currentPlayer = '4';
  // }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  // for(const combination of WINNING_COMBINATIONS){
  //   const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  //   const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  //   const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  //     if(firstSquareSymbol &&
  //       firstSquareSymbol === secondSquareSymbol &&
  //       secondSquareSymbol === thirdSquareSymbol
  //     ){
  //       winner = players[firstSquareSymbol];
  //     }
  // }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const [numeroGlobal, setNumeroGlobal] = useState(0);
  const [celdaElegida, setCeldaElegida] = useState([]);

  const ctxValue = {
    number: numeroGlobal,
    square: celdaElegida,
    cambiaNumero: setNumeroGlobal,
    cambiaCelda: setCeldaElegida,
  };

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      // const currentPlayer = deriveActivePlayer(prevTurns);
      const currentPlayer = numeroGlobal;

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName, // javascript syntax, not react
      };
    });
  }

  return (
    <SudokuContext.Provider value={ctxValue}>
      <main>
        <div id="game-container">
          {/* <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            ></Player>
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            ></Player>
          </ol> */}
          <NumericKeyBoard />
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>

        <Log turns={gameTurns} />
      </main>
    </SudokuContext.Provider>
  );
}

export default App;
