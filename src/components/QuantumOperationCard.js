// QuantumOperationCard.js

/**
 * QuantumOperationCard is a class that represents a quantum operation card.
 */
import getGateIconPath from "../util/AssetFinder.js";
import Card from "./Card.js";

export default class QuantumOperationCard extends Card {
  /**
   * Constructs a new QuantumOperationCard instance.
   * @param {string} gateType - The type of the gate.
   * @param {Object} operationData - The data for the quantum operation.
   */
  constructor(gateType, operationData) {    
    super({
      type: "gate",
      gateType: gateType,
      gateIconPath: getGateIconPath(gateType)
    }); // Initialize with parent class constructor
    this.operationData = operationData; // Data for the quantum operation
  }

  /**
   * Applies the quantum operation to a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to apply the operation to.
   * @param {Array} qubits - The qubits to apply the operation to.
   */
  // applyOperation(circuit, qubits) {
  //   const gate = new Gate(this.operationData);
  //   circuit.applyGate(gate, qubits);
  // }

  /**
   * Generates the HTML representation of the quantum operation card.
   * @returns {string} The HTML code for the card.
   */
  getHTML() {
    return `<div class="card gate" draggable="true" ondragstart="drag(event)"><div class="card-title">Gate</div><img src="${this.cardData.gateIconPath}" class="card-symbol" /><div class="card-description">${this.cardData.gateType}</div></div>`;
  }
}
