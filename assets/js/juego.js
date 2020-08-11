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

const value = valueDeck(takeADeck());

// Events

btnTake.addEventListener("click", () => {
  const deck = takeADeck();

  playerPoints = playerPoints + valueDeck(deck);

  smalls[0].innerText = playerPoints;

  console.log(playerPoints);
});
