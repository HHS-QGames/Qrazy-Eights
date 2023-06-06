// Qubit.js
/**
 * Qubit is a class that represents a quantum bit.
 */
class Qubit {
  constructor(state = "|0⟩") {
    this.state = state; // Initialize the qubit to the ground state
  }

  /**
   * Sets the state of the qubit.
   * @param {string} state - The state to set the qubit to.
   */
  setState(state) {
    this.state = state;
  }
}