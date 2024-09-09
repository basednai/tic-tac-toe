const Gameboard = (function () {

    let gameboard = Array(9).fill(null);

    const checkWinner = () => {

        // check horizontals
        if (areEqual(0, 1, 2)) return true //`${gameboard[0]} wins`
        if (areEqual(3, 4, 5)) return true //`${gameboard[3]} wins`
        if (areEqual(6, 7, 8)) return true //`${gameboard[6]} wins`
        // check verticals
        if (areEqual(0, 3, 6)) return true //`${gameboard[0]} wins`
        if (areEqual(1, 4, 7)) return true //`${gameboard[1]} wins`
        if (areEqual(2, 5, 8)) return true //`${gameboard[2]} wins`
        // check diagonals
        if (areEqual(0, 4, 8)) return true //`${gameboard[0]} wins`
        if (areEqual(2, 4, 6)) return true //`${gameboard[2]} wins`

        function areEqual(X, Y, Z) {
            if (gameboard[X] != undefined)
                if (gameboard[X] == gameboard[Y] && gameboard[X] == gameboard[Z]) return true;
            return false
        }

    };

    const newGame = () => {
        let gameGrid = document.querySelector(".gameGrid");
        gameGrid.innerHTML = ""

        let player1Turn = true;
        for (let i = 0; i < 9; i++) {
            let gameSquare = document.createElement("div")
            gameSquare.classList.add("gameSquare")
            gameGrid.appendChild(gameSquare)

            gameSquare.addEventListener("click", () => {
                if (player1Turn) {
                    gameSquare.innerHTML = player1.marker
                }
                else {
                    gameSquare.innerHTML = player2.marker
                }
                gameboard[i] = gameSquare.innerHTML

                if (checkWinner()) console.log(`${player1Turn ? "Player 1" : "Player 2"} wins!`);
                // if (!checkWinner()) console.log("it's a draw");
                flipTurn()

            })
        }

        function flipTurn() {
            player1Turn = !player1Turn;
        }
    }

    return { newGame, gameboard }

})();

function player(name, marker) {
    return { name, marker }
}


let player2 = player("player2", "O")
let player1 = player("player1", "$")
Gameboard.newGame()

