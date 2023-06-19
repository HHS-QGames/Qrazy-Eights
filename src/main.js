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
import GameSettings from "./components/GameSettings.js";

export var game = undefined;
export function main() {
  console.log("Start main")
  // Create players
  const players = [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Thomas"),
    new Player("Arthur"),
    new Player("Avi"),
  ]

  // Create game
  game = new Game(players, new GameSettings());
  // game = new Game(players, circuit, deck, discardPile);

  
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
