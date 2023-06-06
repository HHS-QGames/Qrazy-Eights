// Player.js
class Player {
  constructor(name, game) {
    this.name = name; // Player's name
    this.game = game; // Game the player is participating in
    this.hand = new Hand([]); // Player's hand of cards
  }

  /**
   * Draws a card from the game's draw pile.
   */
  drawCard() {
    const card = this.game.drawPile.drawCard();
    if (card) {
      this.hand.addCard(card);
    }
  }

  /**
   * Plays a card from the player's hand.
   * @param {Number} cardIndex - The index of the card to play from the player's hand.
   * @param {Object} circuit - The quantum circuit to apply the card to (if applicable).
   * @param {Array} qubits - The qubits to apply the card to (if applicable).
   * @return {Object} result - The result of the card action (if applicable).
   */
  playCard(cardIndex, circuit, qubits) {
    const card = this.hand.cards[cardIndex];
    if (!card) {
      throw new Error("Invalid card index");
    }

    this.hand.removeCard(card);
    let result = null;
    if (card instanceof QuantumOperationCard) {
      card.applyOperation(circuit, qubits);
    } else if (card instanceof MeasurementCard) {
      result = card.measureCircuit(circuit);
      if (result === "|1⟩") { // Simplified win condition: player wins if they measure the state |1⟩
        this.game.endGame(this);
      }
    }
    this.game.discardPile.addCard(card);
    return result;
  }
}
