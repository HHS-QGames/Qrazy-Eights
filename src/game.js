// Game.js
/**
 * Game is a class that represents the game, which includes players, the quantum circuit, and card piles.
 */
import Circuit from "./components/Circuit.js";
import Player from "./components/Player.js";
import Pile from "./components/Pile.js";
import Scoreboard from "./components/Scoreboard.js";
import GameSettings from "./components/GameSettings.js";
import Qubit from "./components/Qubit.js";
import Deck from "./components/Deck.js";

export default class Game {
  // constructor(players, circuit, drawPile, discardPile) {
  //   this.players = players; // Players in the game
  //   this.circuit = circuit; // Quantum circuit used in the game
  //   this.drawPile = drawPile; // Deck of cards to draw from
  //   this.discardPile = discardPile; // Pile of discarded cards
  //   this.scoreboard = new Scoreboard(players)
  //   this.currentPlayer = players[0];  // The first player goes first
  // }
  constructor(players, gameSettings) {
    this.gameSettings = gameSettings

    this.players = players
    this.players.forEach(player => {
      player.game = this
    })
    this.currentPlayer = players[0];  // The first player goes first

    this.scoreboard = new Scoreboard(players)

    const qubits = []
    for (let i = 0; i < gameSettings.qubitCount; i++) {
      qubits.push(new Qubit(i))
    }
    this.circuit = new Circuit(qubits)

    this.drawPile = new Deck([])
    this.drawPile.addCards({cardType: "gate", gateType: "hadamard"}, gameSettings.hadamardCountPP * this.players.length * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "gate", gateType: "pauli-x"}, gameSettings.xCountPP * this.players.length * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "gate", gateType: "pauli-y"}, gameSettings.yCountPP * this.players.length * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "gate", gateType: "pauli-z"}, gameSettings.zCountPP * this.players.length * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "gate", gateType: "cnot"}, gameSettings.hadamardCountPP * this.players.length * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "destroy", gateType: "hadamard"}, gameSettings.hadamardCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "destroy", gateType: "pauli-x"}, gameSettings.xCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "destroy", gateType: "pauli-y"}, gameSettings.yCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "destroy", gateType: "pauli-z"}, gameSettings.zCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "destroy", gateType: "cnot"}, gameSettings.hadamardCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards({cardType: "measure", gateType: undefined}, gameSettings.measureCountPP * this.players.length * gameSettings.totalCardMultiplier)

    this.discardPile = new Pile([])
  }
  /**
   * Starts the game, including shuffling the deck and dealing cards to players.
   */
  startGame() {
    this.drawPile.shuffle();
    this.players.forEach(player => {
      for (let i = 0; i < this.gameSettings.startingHandSize; i++) {
        const card = this.drawPile.drawCard();
        player.hand.addCard(card);
      }
    });
    this.currentPlayer.isCurrentTurn = true
    this.forceRender()
  }

  /**
   * Advances the game to the next turn.
   */
  nextTurn() {
    if (this.isGameOver()) {
      return;
    }
    this.currentPlayer.isCurrentTurn = false
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];
    this.currentPlayer.isCurrentTurn = true
    console.log(`Current turn player ${(currentPlayerIndex + 2) % this.players.length}: ${this.currentPlayer.name}`)
    this.forceRender()
  }

  /**
   * Checks if the game is over.
   * @return {Boolean} True if the game is over, false otherwise.
   */
  isGameOver() {
    return this.winner !== undefined;
  }

  /**
   * Ends the game with the specified winner.
   * @param {Object} winner - The player who won the game.
   */
  endGame(winner) {
    this.winner = winner;
    console.log(`${winner.name} is the winner!`);
  }

  forceRender() {
    this.circuit.render()
    this.currentPlayer.hand.render()
    this.scoreboard.render()
  }
}