/*
  Referencia

  2C - Two of Clubs
  2D - Two of Diaminds
  2H - Two of Hearts
  2S - Two of Spades

*/

let decks = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];
let playerPoints = 0,
  computerPoints = 0;

// References

const btnNew = document.querySelector("#btn-new");
const btnTake = document.querySelector("#btn-take");
const btnStop = document.querySelector("#btn-stop");
const smalls = document.querySelectorAll("small");
const playerDecks = document.querySelector("#player-decks");
const computerDecks = document.querySelector("#computer-decks");

// Función para crear una nueva baraja
const createDeck = () => {
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

  decks = _.shuffle(decks);
};

createDeck();

const takeADeck = () => {
  if (!decks.length) {
    throw new Error("No hay más cartas");
  }

  const deck = decks.pop();

  return deck;
};

const valueDeck = (deck) => {
  const value = deck.substring(0, deck.length - 1);

  return !isNaN(value) ? parseInt(value) : value === "A" ? 11 : 10;
};

const computerTurn = (minPoints) => {
  do {
    const deck = takeADeck();

    computerPoints = computerPoints + valueDeck(deck);

    smalls[1].innerText = computerPoints;

    const imgDeck = document.createElement("img");
    imgDeck.src = `assets/cartas/cartas/${deck}.png`;
    imgDeck.classList.add("deck-image");

    computerDecks.append(imgDeck);

    if (minPoints > 21) {
      break;
    }
  } while (computerPoints < minPoints && minPoints <= 21);
};

// Events

btnTake.addEventListener("click", () => {
  const deck = takeADeck();

  playerPoints = playerPoints + valueDeck(deck);

  smalls[0].innerText = playerPoints;

  const imgDeck = document.createElement("img");
  imgDeck.src = `assets/cartas/cartas/${deck}.png`;
  imgDeck.classList.add("deck-image");

  playerDecks.append(imgDeck);

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

btnNew.addEventListener("click", () => {});
btnStop.addEventListener("click", () => {
  btnTake.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerPoints);
});
