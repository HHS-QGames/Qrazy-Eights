// QuantumOperationCard.js
/**
 * QuantumOperationCard is a class that represents a quantum operation card.
 */
class QuantumOperationCard extends Card {
  constructor(cardData, operationData) {
    super(cardData); // Initialize with parent class constructor
    this.operationData = operationData; // Data for the quantum operation
  }

  /**
   * Applies the quantum operation to a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to apply the operation to.
   * @param {Array} qubits - The qubits to apply the operation to.
   */
  applyOperation(circuit, qubits) {
    const gate = new Gate(this.operationData);
    circuit.applyGate(gate, qubits);
  }
}