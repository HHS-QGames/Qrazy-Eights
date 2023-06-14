/**
 * Circuit is a class that represents a quantum circuit.
 */
import Gate from "./Gate.js";

const DISTANCE = 3;
const OFFSET = 0.5;

export default class Circuit {
  /**
   * Constructs a new Circuit instance.
   * @param {Array} qubits - The qubits in the circuit.
   */
  constructor(qubits) {
    this.qubits = qubits;
  }

  /**
   * Applies a gate to the specified target qubits in the circuit.
   * @param {Object} gate - The gate to apply.
   * @param {number} slotnumber - The slot number for the gate.
   * @param {number} qubitIndex - The index of the target qubit.
   */
  applyGate(gate, slotnumber, qubitIndex) {
    this.qubits.forEach(qubit => {
      if (qubit.index === qubitIndex) {
        qubit.addGate(gate, slotnumber);
      }
    });
  }

  /**
   * Applies a CNOT gate to the specified control and target qubits in the circuit.
   * @param {number} controlQubitIndex - The index of the control qubit.
   * @param {number} notQubitIndex - The index of the target qubit.
   * @param {number} slotnumber - The slot number for the gate.
   */
  applyCNOT(controlQubitIndex, notQubitIndex, slotnumber) {
    // Set the control
    var controlGate = new Gate("cnot");
    controlGate.varient = "control";
    if (controlQubitIndex > notQubitIndex) {
      controlGate.flipped = true;
    }
    this.applyGate(controlGate, slotnumber, controlQubitIndex);

    // Set the not
    var notGate = new Gate("cnot");
    notGate.varient = "not";
    if (controlQubitIndex > notQubitIndex) {
      notGate.flipped = true;
    }
    this.applyGate(notGate, slotnumber, notQubitIndex);

    // Render the middle connection parts
    if (Math.abs(notQubitIndex - controlQubitIndex) > 1) {
      var lowValue = controlQubitIndex < notQubitIndex ? controlQubitIndex : notQubitIndex;
      var highValue = controlQubitIndex > notQubitIndex ? controlQubitIndex : notQubitIndex;
      for (var i = lowValue + 1; i < highValue; i++) {
        var middleGate = new Gate("cnot");
        middleGate.varient = "middle";
        this.applyGate(middleGate, slotnumber, i);
      }
    }
  }

  /**
   * Renders the quantum circuit.
   */
  render() {
    var qubitsHTML = "";
    this.qubits.forEach(qubit => {
      qubitsHTML += qubit.getHTML(OFFSET, DISTANCE);
    });
    document.getElementById("circuit-container").innerHTML = qubitsHTML;
  }
}
