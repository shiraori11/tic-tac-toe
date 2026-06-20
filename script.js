function gamePlayer(marker) {
  let score = 0;
  let name = `Player ${marker}`;
  const winner = false
  
  const announceWin = () => {alert(`${marker} Won!`)};
  
  const addScore = () => {score++};
  const getScore = () => score;
  const resetScore = () => {score = 0};
  
  return {marker, name, announceWin, winner, addScore, getScore, resetScore};
}

const gameBoard = (() => {
  let board = [
    ["n", "n", "n"],
    ["n", "n", "n"],
    ["n", "n", "n"],
  ];

  const player1 = gamePlayer("X");
  const player2 = gamePlayer("O");
  let whoPlayerMove = player1;
  let winnerPlayer;

  const mark = (row, col, marker) => {
    board[row][col] = marker;
  }

  const changeWhoPlayerMove = () => {
    if (whoPlayerMove == player1) {
      whoPlayerMove = player2;
    } else {
      whoPlayerMove = player1;
    }
  }

  const getBoard = () => board;
  const getWhoPlayerMove = () => whoPlayerMove;
  const getPlayerMark = () => whoPlayerMove.marker;
  const setWinnerPlayer = () => {
    if (player1.winner) {
      winnerPlayer = player1;
    } else if (player2.winner) {
      winnerPlayer = player2;
    }
  };
  const getWinnerPlayer = () => winnerPlayer;
  const setPlayerOneName = (name) => {
    player1.name = name;
  };
  const setPlayerTwoName = (name) => {
    player2.name = name;
  }

  return {mark, getBoard, changeWhoPlayerMove, getWhoPlayerMove, getPlayerMark, setWinnerPlayer, getWinnerPlayer, setPlayerOneName, setPlayerTwoName};
})();

const playGame = (() => {
  let gameOngoing = true;
  const board = gameBoard.getBoard();


  const addMarkerToBoard = (row, col) => {
    const whoMove = gameBoard.getWhoPlayerMove();
    
    gameBoard.mark(row, col, whoMove.marker);
    checkBoardWin(row, col, whoMove);
    gameBoard.changeWhoPlayerMove();
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
      setWinnerPlayer(player)
    } else if (checkEveryValue(forwardSlashArr, board[0][2])) {
      setWinnerPlayer(player)
    }
  };

  const checkRow = (row, player) => {
    const rowArr = [board[row][0], board[row][1], board[row][2]];
    if (checkEveryValue(rowArr, board[row][0])) {
      setWinnerPlayer(player);
    };
  };

  const checkCol = (col, player) => {
    const colArr = [board[0][col], board[1][col], board[2][col]];
    if (checkEveryValue(colArr, board[0][col])) {
      setWinnerPlayer(player);
    };
  };

  const checkEveryValue = (arr, valueToCheck) => {
    return arr.every((value) => value === valueToCheck && value != 'n');
  };

  const setWinnerPlayer = (player) => {
    player.winner = true;
    gameBoard.setWinnerPlayer();
    gameOngoing = false;
  };

  const getMarker = () => whoMove.marker;

  const isOngoingGame = () => gameOngoing;

  return {addMarkerToBoard, isOngoingGame, getMarker};
})();

gameInterface = (() => {
  
  const gameContainer = document.querySelector(".game-container");

  const gameLoop = () => {
    addTileToInterface();
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", startGame);
  }

  const addTileToInterface = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const gameTile = document.createElement("div");
        const gameText = document.createElement("p");
        
        gameTile.setAttribute("data-row", row);
        gameTile.setAttribute("data-col", col);
        gameTile.addEventListener("click", tileFunc);

        gameTile.append(gameText);
        
        gameTile.setAttribute("class", "game-tile");
        gameContainer.appendChild(gameTile);
      }
    }
  }

  const changeMarkerIndicator = () => {
    const markerIndicator = document.querySelector(".marker-indicator>p");
    markerIndicator.textContent = gameBoard.getPlayerMark();
  }

  const tileFunc = (event) => {
    if (checkIfMarkerExist(event) && playGame.isOngoingGame()) {
      placeMarker(event);
    }
  }

  const placeMarker = (event) => {
    const addMarkerRow = event.target.dataset.row;
    const addMarkerCol = event.target.dataset.col;
    
    event.target.innerHTML = "";

    const currentMarker = gameBoard.getPlayerMark();
    
    const markerTile = document.createElement("p");
    markerTile.textContent = currentMarker;

    event.target.appendChild(markerTile);
    
    playGame.addMarkerToBoard(addMarkerRow, addMarkerCol);
    
    changeMarkerIndicator();
    checkWinner();
  };

  const checkIfMarkerExist = (event) => {
    const markerPara = event.target.firstElementChild;

    return markerPara.textContent == "";
  }

  const checkWinner = () => {
    const playerWinner = gameBoard.getWinnerPlayer();
    if (!playGame.isOngoingGame()) {
      announceWinner(playerWinner)
    }
  }

  const announceWinner = (player) => {
    player.announceWin();
  }

  const startGame = () => {
    const playerOneName = document.querySelector("#player1-name");
    const playerTwoName = document.querySelector("#player2-name");

    gameBoard.setPlayerOneName(playerOneName.value);
    gameBoard.setPlayerTwoName(playerTwoName.value);

    const mainMenu = document.querySelector(".main-menu");
    mainMenu.style.display = "none";

    const mainGame = document.querySelector(".main-game");
    mainGame.style.display = "block";
  }
  
  return {gameLoop};
})();

gameInterface.gameLoop();
