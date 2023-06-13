// main.js
/**
 * The entry point of the application.
 * This function creates objects, links them together, and starts the game.
 */
import QuantumOperationCard from "./components/QuantumOperationCard";
import QuantumDestroyOperationCard from "./components/QuantumDestroyOperationCard";
import MeasurementCard from "./components/MeasurementCard";
const main = () => {
    // Create players
    const player1 = new Player("Alice");
    const player2 = new Player("Bob");
    
    // Create cards and deck
    const cards = [
      new QuantumOperationCard(gateType = "hadamard"), 
      new QuantumOperationCard(gateType = "cnot"), 
      new QuantumOperationCard(gateType = "pauli-x"), 
      new QuantumOperationCard(gateType = "pauli-y"), 
      new QuantumOperationCard(gateType = "pauli-z"), 
      new MeasurementCard(),
      new QuantumDestroyOperationCard(gateType = "hadamard"), 
      new QuantumDestroyOperationCard(gateType = "cnot"), 
      new QuantumDestroyOperationCard(gateType = "pauli-x"), 
      new QuantumDestroyOperationCard(gateType = "pauli-y"), 
      new QuantumDestroyOperationCard(gateType = "pauli-z"), 
    ];  // fill in your own card data
    const deck = new Deck(cards);
    
    // Create discard pile
    const discardPile = new Pile([]);
    
    // Create quantum circuit
    const qubits = [new Qubit(), new Qubit(), ...];  // fill in your own qubits
    const circuit = new Circuit(qubits);
    
    // Create game and connect players to it
    const game = new Game([player1, player2], circuit, deck, discardPile);
    player1.game = game;
    player2.game = game;
  
    // Start the game
    game.startGame();
    
  // Game loop
    while (!game.isGameOver()) {
      const currentPlayer = game.currentPlayer;
      console.log(`It's ${currentPlayer.name}'s turn`);
  
      // For simplicity, this example makes the player play their first card on the first qubit
      // In a real game, you would want to get user input for the card and target qubits
      try {
        currentPlayer.playCard(0, game.circuit, [game.circuit.qubits[0]]);
      } catch (error) {
        console.error(`Failed to play card: ${error}`);
      }
  
      game.nextTurn();
    }
  }
  
  main();