document.addEventListener('DOMContentLoaded', function() {
    let startGameBtn = document.getElementById('startGame');
    startGameBtn.addEventListener('click', function(){
        gameBoard.createBoard();
    })

    let choosePlayersBtn = document.getElementById('choosePlayers');
    choosePlayersBtn.addEventListener('click', function(){
        let name1 = gameBoard.player1.selectPlayerName();
        let name2 = gameBoard.player2.selectPlayerName();
        gameBoard.ResetGame(name1, name2);
    })

  });
  
const gameBoard = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
    player1: {
        name: "player1",
        icon: "X",
    
        selectPlayerName: function() {
            this.name = prompt("What is the player's 1 name?");
            return this.name;
        }
    },
    player2: {
        name: "player2",
        icon: "O",
    
        selectPlayerName: function() {
            this.name = prompt("What is the player's 2 name?");
            return this.name;
        }
    },
    currentPlayer: {
        name: "",
        icon: ""
    },
    
    createBoard(){
        this.currentPlayer.name = this.player1.name;
        this.currentPlayer.icon = this.player1.icon;

        let table = document.getElementById('boardTable');
        table.style.display = "table";
    
        let cells = document.querySelectorAll('#boardTable td');
        let board = this.board; 

        let currentPlayer = this.currentPlayer;
    
        cells.forEach((cell) => { 
            cell.innerHTML = "";

            cell.addEventListener('click', function clickHandler() {
                this.innerHTML = currentPlayer.icon; 
    
                let rowIndex = this.parentNode.rowIndex;
                let cellIndex = this.cellIndex;
    
                board[rowIndex][cellIndex] = currentPlayer.icon;
    
                gameBoard.checkWinner();
                gameBoard.changePlayer();

                cell.removeEventListener('click', clickHandler);
            });
        });
    },

    checkWinner(){
        let board = this.board; 

        let emptyCells = 0;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === null) {
                    emptyCells++;
                }
            }
        }

        if((board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X") ||
        (board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") ||
        (board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") ||
        (board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") ||
        (board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") ||
        (board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") ||
        (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") ||
        (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X")) 
        {
            alert(`${gameBoard.player1.name} wins`);
            this.ResetGame();
        }
        else if((board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O") ||
        (board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O") ||
        (board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O") ||
        (board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O") ||
        (board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O") ||
        (board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O") ||
        (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") ||
        (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O"))
        {
            alert(`${gameBoard.player2.name} wins`);
            this.ResetGame();
        }
        else if (emptyCells === 0) {
            alert("Game tied");
            this.ResetGame();
        }
    },

    changePlayer(){
        if(this.currentPlayer.name === this.player1.name){
            this.currentPlayer.name = this.player2.name;
            this.currentPlayer.icon = this.player2.icon;
        }
        else{
            this.currentPlayer.name = this.player1.name;
            this.currentPlayer.icon = this.player1.icon;
        }
    },

    ResetGame(player1Name = "player1", player2Name = "player2") {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        
        this.player1.name = player1Name;
        this.player1.icon = "X";
        
        this.player2.name = player2Name;
        this.player2.icon = "O";
    
        this.createBoard();
    }    
}



