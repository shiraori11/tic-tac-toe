function gamePlayer(marker) {
  announceWin = () => {console.log(`${marker} Won!`)};
  
  return {marker, announceWin};
}

const gameBoard = (() => {
  let board = [
    ["n", "n", "n"],
    ["n", "n", "n"],
    ["n", "n", "n"],
  ];

  const mark = (row, col, marker) => {
    board[row][col] = marker;
  }

  const getBoard = () => board;

  return {mark, getBoard};
})();

const playGame = (() => {


  const player1 = gamePlayer("X");
  const player2 = gamePlayer("O");
  let whoMove = player1;
  let gameOngoing = true;
  const board = gameBoard.getBoard();


  const addMarkerToBoard = (row, col) => {
    gameBoard.mark(row, col, whoMove.marker);
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
    const backSlashArr = [board[0][0], board[1][1], board[2][2]];
    const forwardSlashArr = [board[0][2], board[1][1], board[2][0]];

    if (checkEveryValue(backSlashArr, board[0][0])) {
      announceWhoWon(player)
    } else if (checkEveryValue(forwardSlashArr, board[0][2])) {
      announceWhoWon(player)
    }
  };

  const checkRow = (row, player) => {
    const rowArr = [board[row][0], board[row][1], board[row][2]];
    if (checkEveryValue(rowArr, board[row][0])) {
      announceWhoWon(player);
    };
  };

  const checkCol = (col, player) => {
    const colArr = [board[0][col], board[1][col], board[2][col]];
    if (checkEveryValue(colArr, board[0][col])) {
      announceWhoWon(player);
    };
  };

  const checkEveryValue = (arr, valueToCheck) => {
    return arr.every((value) => value == valueToCheck && value != 'n');
  };

  const announceWhoWon = (player) => {
    player.announceWin();
    gameOngoing = false;
  };

  const isOngoingGame = () => gameOngoing;

  return {addMarkerToBoard, isOngoingGame};
})();

gameInterface = (() => {
  
  const getUserChoice = () => {
    const getRow = prompt("Row: ");
    const getCol = prompt("Col: ");

    return [getRow, getCol];
  };

  const gameLoop = () => {
    while()
  }
  
})();
