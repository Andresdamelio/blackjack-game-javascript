/*
  Referencia

  2C - Two of Clubs
  2D - Two of Diaminds
  2H - Two of Hearts
  2S - Two of Spades

*/

const moduleBlackjack = (() => {
  "use strict";

  // definition of variables
  let decks = [],
    playersPoints = [];

  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  // definition of variables for HTML
  const btnNew = document.querySelector("#btn-new"),
    btnTake = document.querySelector("#btn-take"),
    btnStop = document.querySelector("#btn-stop");

  const smalls = document.querySelectorAll("small"),
    decksContainers = document.querySelectorAll(".decks-container");

  // initialize game
  const initializeGame = (numberPlayers = 2) => {
    decks = createDeck();
    playersPoints = new Array(numberPlayers).fill(0);

    smalls.forEach((small) => (small.innerText = 0));
    decksContainers.forEach((small) => (small.innerHTML = ""));

    btnTake.disabled = false;
    btnStop.disabled = false;
  };

  // Create new deck
  const createDeck = () => {
    decks = [];

    for (let i = 2; i <= 10; i++) {
      for (const type of types) {
        decks.push(i + type);
      }
    }

    for (const type of types) {
      for (const special of specials) {
        decks.push(special + type);
      }
    }

    return _.shuffle(decks);
  };

  // Take a deck
  const takeADeck = () => {
    if (!decks.length) {
      throw new Error("No hay más cartas");
    }

    return decks.pop();
  };

  // value of the selected deck
  const valueDeck = (deck) => {
    const value = deck.substring(0, deck.length - 1);

    return !isNaN(value) ? parseInt(value) : value === "A" ? 11 : 10;
  };

  // player: 0 = first player and computer is last
  const accumulatePoints = (deck, player) => {
    playersPoints[player] = playersPoints[player] + valueDeck(deck);

    smalls[player].innerText = playersPoints[player];

    return playersPoints[player];
  };

  // create HTML for selected deck
  const createImageDeck = (deck, player) => {
    const imgDeck = document.createElement("img");

    imgDeck.src = `assets/cartas/cartas/${deck}.png`;

    imgDeck.classList.add("deck-image");

    decksContainers[player].append(imgDeck);
  };

  // Determine the winner of the game
  const determineWinner = () => {
    const [playerPoints, computerPoints] = playersPoints;

    setTimeout(() => {
      if (
        computerPoints === playerPoints ||
        (computerPoints > 21 && playerPoints > 21)
      ) {
        alert("Nadie gana :(");
      } else if (
        computerPoints < playerPoints &&
        computerPoints <= 21 &&
        playerPoints !== 21
      ) {
        alert("Gana la computadora");
      } else if (
        playerPoints < computerPoints &&
        playerPoints <= 21 &&
        computerPoints !== 21
      ) {
        alert("Ganaste");
      }
    }, 100);
  };

  const computerTurn = (minPoints) => {
    let computerPoints = 0;

    do {
      const deck = takeADeck();

      computerPoints = accumulatePoints(deck, playersPoints.length - 1);

      createImageDeck(deck, playersPoints.length - 1);
    } while (computerPoints <= minPoints && minPoints <= 21);

    determineWinner();
  };

  /*  Events */

  // New Game
  btnNew.addEventListener("click", () => {
    initializeGame();
  });

  // Take a deck
  btnTake.addEventListener("click", () => {
    const deck = takeADeck();

    const playerPoints = accumulatePoints(deck, 0);

    createImageDeck(deck, 0);

    if (playerPoints > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnTake.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      console.log("21, genial");
      btnTake.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  });

  // Stop game for player
  btnStop.addEventListener("click", () => {
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(playersPoints[0]);
  });

  return {
    newGame: initializeGame
  }
})();
