// Player.js
import Hand from "./Hand.js";
import QuantumOperationCard from "./QuantumOperationCard.js";
import QuantumDestroyOperationCard from "./QuantumDestroyOperationCard.js";
import MeasurementCard from "./MeasurementCard.js";
import Gate from "./Gate.js";
export default class Player {
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
   * @param {Number} qubitIndex - The qubits to apply the card to (if applicable).
   * @return {Object} result - The result of the card action (if applicable).
   */
  playCard(cardIndex, circuit, qubitIndex, targetSlotnumber = undefined) {
    const card = this.hand.cards[cardIndex];
    console.log(card);
    if (!card) {
      throw new Error("Invalid card index");
    }

    let result = null;
    var succesfullAction = false;
    if (card instanceof QuantumOperationCard) {
      if (card.gateType === "cnot") {
        console.log("WIP: CNOT");
      } else {
        succesfullAction = this.game.circuit.applyGate(
          new Gate(card.cardData.gateType),
          qubitIndex
        );
      }
    } else if (card instanceof QuantumDestroyOperationCard) {
      succesfullAction = this.game.circuit.destroyGate(
        card.cardData.gateType,
        qubitIndex,
        targetSlotnumber
      );
    } else if (card instanceof MeasurementCard) {
      result = card.measureCircuit(circuit);
      if (result === "|1⟩") {
        // Simplified win condition: player wins if they measure the state |1⟩
        this.game.endGame(this);
      }
    }
    if (succesfullAction) {
      console.log("Action is succesfull");
      this.hand.removeCard(card);
      this.game.discardPile.addCard(card);
      this.hand.render();
    }
    return result;
  }
}
