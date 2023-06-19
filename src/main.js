// main.js
/**
 * The entry point of the application.
 * This function creates objects, links them together, and starts the game.
 */
import QuantumOperationCard from "./components/QuantumOperationCard.js";
import QuantumDestroyOperationCard from "./components/QuantumDestroyOperationCard.js";
import MeasurementCard from "./components/MeasurementCard.js";
import Game from "./game.js";
import Player from "./components/Player.js";
import Qubit from "./components/Qubit.js";
import Circuit from "./components/Circuit.js";
import Deck from "./components/Deck.js";
import Pile from "./components/Pile.js";

export var game = undefined;
export function main() {
  console.log("Start main")
  // Create players
  const players = [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Thomas"),
    new Player("Arthur"),
  ]

  // Create cards and deck
  const hadamardCount = 10;
  const cnotCount = 6;
  const xCount = 8;
  const yCount = 8;
  const zCount = 8;
  const measureCount = 6;
  
  const cards = [];
  
  // Create and add 'hadamard' cards
  for (let i = 0; i < hadamardCount; i++) {
    cards.push(new QuantumOperationCard("hadamard"));
    if(i%2 === 0)
     cards.push(new QuantumDestroyOperationCard("hadamard"))
  }
  
  // Create and add 'cnot' cards
  for (let i = 0; i < cnotCount; i++) {
    cards.push(new QuantumOperationCard("cnot"));
    if(i%2 === 0)
     cards.push(new QuantumDestroyOperationCard("cnot"))
  }
  
  // Create and add 'pauli-x' cards
  for (let i = 0; i < xCount; i++) {
    cards.push(new QuantumOperationCard("pauli-x"));
    if(i%2 === 0)
     cards.push(new QuantumDestroyOperationCard("pauli-x"))
  }
  
  // Create and add 'pauli-y' cards
  for (let i = 0; i < yCount; i++) {
    cards.push(new QuantumOperationCard("pauli-y"));
    if(i%2 === 0)
     cards.push(new QuantumDestroyOperationCard("pauli-y"))
  }
  
  // Create and add 'pauli-z' cards
  for (let i = 0; i < zCount; i++) {
    cards.push(new QuantumOperationCard("pauli-z"));
    if(i%2 === 0)
     cards.push(new QuantumDestroyOperationCard("pauli-z"))
  }
  
  // Create and add 'measurement' cards
  for (let i = 0; i < measureCount; i++) {
    cards.push(new MeasurementCard());
  }
  
  console.log(cards);
  
  const deck = new Deck(cards);

  // Create discard pile
  const discardPile = new Pile([]);

  // Create quantum circuit
  const qubits = [new Qubit(0), new Qubit(1), new Qubit(2), new Qubit(3)]; // fill in your own qubits
  const circuit = new Circuit(qubits);

  // Create game and connect players to it
  game = new Game(players, circuit, deck, discardPile);

  players.forEach(player => {
    player.game = game
  })
  
  console.log(game)
  // Start the game
  game.startGame();

  // Game loop
  // while (!game.isGameOver()) {
  //   const currentPlayer = game.currentPlayer;
  //   console.log(`It's ${currentPlayer.name}'s turn`);

  //   // For simplicity, this example makes the player play their first card on the first qubit
  //   // In a real game, you would want to get user input for the card and target qubits
  //   try {
  //     currentPlayer.playCard(0, game.circuit, [game.circuit.qubits[0]]);
  //   } catch (error) {
  //     console.error(`Failed to play card: ${error}`);
  //   }

  //   game.nextTurn();
  // }
}
