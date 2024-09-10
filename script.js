const Gameboard = (function () {

    let gameboard

    let player1 = player("Player 1", "x")
    let player2 = player("Player 2", "O")

    const printGame = () => console.log(gameboard);

    const checkWinner = () => {

        // check horizontals
        if ((areEqual(0, 1, 2)) ||
            (areEqual(3, 4, 5)) ||
            (areEqual(6, 7, 8)) ||
            //    check verticals
            (areEqual(0, 3, 6)) ||
            (areEqual(1, 4, 7)) ||
            (areEqual(2, 5, 8)) ||
            //   check diagonals
            (areEqual(0, 4, 8)) ||
            (areEqual(2, 4, 6))) {

            return "winner";
        }

        if (!gameboard.includes(null)) return "draw";


        function areEqual(X, Y, Z) {
            if (gameboard[X] != undefined)
                if (gameboard[X] == gameboard[Y] && gameboard[X] == gameboard[Z]) return true;
            return false
        }

    };

    const newGame = () => {



        gameboard = Array(9).fill(null);
        let gameGrid = document.querySelector(".gameGrid");
        gameGrid.innerHTML = "";


        let winGrid = document.createElement("div");
        winGrid.classList.add("winGrid");
        gameGrid.appendChild(winGrid)

        let results = document.querySelector(".results")
        results.innerHTML = ""

        let player1Turn = true;
        results.textContent = `${player1.getName()}'s turn.`


        for (let i = 0; i < 9; i++) {
            let gameSquare = document.createElement("div")
            gameSquare.classList.add("gameSquare")
            gameGrid.appendChild(gameSquare)

            gameSquare.addEventListener("click", () => {
                if (player1Turn) {
                    results.textContent = `${player2.getName()}'s turn.`
                    gameSquare.innerHTML = player1.getMarker()
                }
                else {
                    results.textContent = `${player1.getName()}'s turn.`
                    gameSquare.innerHTML = player2.getMarker()
                }
                gameboard[i] = gameSquare.innerHTML

                if (checkWinner() == "winner") {
                    let winner = player1Turn ? player1 : player2;
                    results.textContent = ""
                    results.innerHTML = `Congrats ${winner.getName()}! <br> You won!`;
                    winGrid.style.zIndex = "10"
                }

                if (checkWinner() == "draw") {
                    results.innerHTML = `It's a draw!`;
                    winGrid.style.zIndex = "10"
                }
                flipTurn();
                gameSquare.removeEventListener("mouseover", highlight)

            }, { once: true })

            function highlight() { gameSquare.classList.add("highlight") }
            gameSquare.addEventListener("mouseover", highlight)
            gameSquare.addEventListener("mouseout", () => gameSquare.classList.remove("highlight"))


        }

        function flipTurn() {
            player1Turn = !player1Turn;
        }



    }

    let changeNames = document.querySelector(".changeNames");
    changeNames.addEventListener("click", () => {
        player1.changeName(prompt("Enter Player 1 name", "Player 1"))
        player2.changeName(prompt("Enter Player 2 name", "Player 2"))
    })

    let changeMarkers = document.querySelector(".changeMarkers");
    changeMarkers.addEventListener("click", () => {
        player1.changeMarker(prompt("Enter Player 1 marker", "X"))
        player2.changeMarker(prompt("Enter Player 2 marker", "O"))
    })

    return { newGame, printGame }

})();

function player(name, marker) {

    const getName = () => name
    const getMarker = () => marker

    let changeName = (newName) => {
        if (newName == null) return
        name = newName
    }
    let changeMarker = (newMarker) => {
        if (newMarker == null) return
        marker = newMarker
    }
    return { getName, getMarker, changeName, changeMarker }
}



Gameboard.newGame()

