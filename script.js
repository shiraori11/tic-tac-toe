function gamePlayer(marker) {
  announceWin = () => {console.log(`${marker} Won!`)};
  
  return {marker, announceWin};
}

gameInterface = (() => {
  
  const getUserChoice = () => {
    const playerChoice = prompt("Send coordinates");
  };
  
})();

playGame = (() => {
  let gameBoard = [
    ["n", "n", "n"],
    ["n", "n", "n"],
    ["n", "n", "n"],
  ];

  const player1 = gamePlayer("X");
  const player2 = gamePlayer("O");
  let whoMove = player1;
  let gameFinished = false;


  const addMarkerToBoard = (row, col) => {
    gameBoard[row][col] = whoMove.marker;
    checkBoardWin(row, col, whoMove);
    if (whoMove == player1) {
      whoMove = player2;
    } else {
      whoMove = player1;
    }
  };

  const checkBoardWin = (row, col, player) => {
    checkDiagonal(player);
    checkRow(row, player);
    checkCol(col, player);
  };

  const checkDiagonal = (player) => {
    const backSlashArr = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
    const forwardSlashArr = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];

    if (checkEveryValue(backSlashArr, gameBoard[0][0])) {
      announceWhoWon(player)
    } else if (checkEveryValue(forwardSlashArr, gameBoard[0][2])) {
      announceWhoWon(player)
    }
  };

  const checkRow = (row, player) => {
    const rowArr = [gameBoard[row][0], gameBoard[row][1], gameBoard[row][2]];
    if (checkEveryValue(rowArr, gameBoard[row][0])) {
      announceWhoWon(player);
    };
  };

  const checkCol = (col, player) => {
    const colArr = [gameBoard[0][col], gameBoard[1][col], gameBoard[2][col]];
    if (checkEveryValue(colArr, gameBoard[0][col])) {
      announceWhoWon(player);
    };
  };

  const checkEveryValue = (arr, valueToCheck) => {
    return arr.every((value) => value == valueToCheck && value != 'n');
  };

  const announceWhoWon = (player) => {
    player.announceWin();
    gameFinished = true;
  };

  const getGameBoard = () => gameBoard;
  const isGameFinished = () => gameFinished;

  return {addMarkerToBoard, getGameBoard, isGameFinished};
})();

// console.log(playGame.gameBoard);
playGame.addMarkerToBoard(1, 2);
playGame.addMarkerToBoard(0, 2);
playGame.addMarkerToBoard(1, 1);
playGame.addMarkerToBoard(2, 1);
playGame.addMarkerToBoard(1, 0);
console.log(playGame.getGameBoard());
