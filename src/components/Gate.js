/**
 * Gate is a class that represents a quantum gate.
 */
export default class Gate {
  /**
   * Constructs a new Gate instance.
   * @param {string} gateType - The type of the quantum gate (e.g., "hadamard", "pauli-x", "pauli-y", "pauli-z", "cnot", "measure").
   */
  constructor(gateType) {
    this.gateType = gateType;
    this.slotnumber = null;
    this.varient = null;
    this.flipped = false;
  }
}
