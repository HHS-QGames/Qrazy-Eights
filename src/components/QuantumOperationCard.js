// QuantumOperationCard.js

/**
 * QuantumOperationCard is a class that represents a quantum operation card.
 */
import getGateIconPath from "../util/AssetFinder.js";
import Card from "./Card.js";
import Gate from "./Gate.js";

export default class QuantumOperationCard extends Card {
  /**
   * Constructs a new QuantumOperationCard instance.
   * @param {string} gateType - The type of the gate.
   */
  constructor(gateType) {    
    super({
      type: "gate",
      gateType: gateType,
      gateIconPath: getGateIconPath(gateType)
    }); // Initialize with parent class constructor
  }

  /**
   * Applies the quantum operation to a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to apply the operation to.
   * @param {Array} qubits - The qubits to apply the operation to.
   */
  applyOperation(circuit, qubits, isDestroy = false) {
    if (isDestroy) {
      circuit.destroy
    }
    const gate = new Gate(gateType);
    circuit.applyGate(gate, qubits);
  }

  /**
   * Generates the HTML representation of the quantum operation card.
   * @returns {string} The HTML code for the card.
   */
  getHTML() {
    return `<div class="card gate" draggable="true" ><div class="card-title">Gate</div><img src="${this.cardData.gateIconPath}" class="card-symbol" /><div class="card-description">${this.cardData.gateType}</div></div>`;
  }
}
