// Game.js
/**
 * Game is a class that represents the game, which includes players, the quantum circuit, and card piles.
 */
import Circuit from "./components/Circuit.js";
import Player from "./components/Player.js";
import Pile from "./components/Pile.js";

export default class Game {
  constructor(players, circuit, drawPile, discardPile) {
    this.players = players; // Players in the game
    this.circuit = circuit; // Quantum circuit used in the game
    this.drawPile = drawPile; // Deck of cards to draw from
    this.discardPile = discardPile; // Pile of discarded cards
    this.currentPlayer = players[0];  // The first player goes first
  }

  /**
   * Starts the game, including shuffling the deck and dealing cards to players.
   */
  startGame() {
    this.drawPile.shuffle();
    this.players.forEach(player => {
      for (let i = 0; i < 7; i++) {
        const card = this.drawPile.drawCard();
        player.hand.addCard(card);
      }
    });
    this.forceRender()
  }

  /**
   * Advances the game to the next turn.
   */
  nextTurn() {
    if (this.isGameOver()) {
      return;
    }

    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];
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
  }
}