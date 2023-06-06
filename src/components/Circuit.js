// Circuit.js
/**
 * Circuit is a class that represents a quantum circuit.
 */
class Circuit {
  constructor(qubits) {
    this.qubits = qubits; // Qubits in the circuit
  }

  /**
   * Applies a gate to the specified target qubits in the circuit.
   * @param {Object} gate - The gate to apply.
   * @param {Array} targetQubits - The qubits to apply the gate to.
   */
  applyGate(gate, targetQubits) {
    targetQubits.forEach(qubit => {
      gate.applyToQubit(qubit);
    });
  }
}