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
    this.currentSlotnumber = 0;
  }

  /**
   * Applies a gate to the specified target qubits in the circuit.
   * @param {Object} gate - The gate to apply.
   * @param {number} slotnumber - The slot number for the gate.
   * @param {number} qubitIndex - The index of the target qubit.
   */
  applyGate(gate, slotnumber=this.currentSlotnumber, qubitIndex) {
    console.log(`Apply ${gate.gateType} on qubit ${qubitIndex} in slotnumber ${slotnumber}`)
    this.qubits.forEach(qubit => {
      if (qubit.index === qubitIndex) {
        console.log("Qubit found")
        qubit.addGate(gate, slotnumber);
        this.currentSlotnumber = slotnumber + 1;
      }
    });
    this.render()
  }

  destroyGate(gateType, qubitIndex, slotnumber) {
    if((qubitIndex < this.qubits.length) && (qubitIndex >= 0)){
      const qubit = this.qubits[qubitIndex]
      const gateIsRemoved = qubit.removeGate(gateType, slotnumber)
      if(gateIsRemoved) {
        this.lowerSlotnumbers(slotnumber)
        this.currentSlotnumber -= 1
      }
      this.render()
    }
  }

  lowerSlotnumbers(fromSlotnumber) {
    this.qubits.forEach(qubit => {
      qubit.lowerSlotnumber(fromSlotnumber)
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
    console.log("Start circuit render")
    console.log(this)
    var qubitsHTML = "";
    this.qubits.forEach(qubit => {
      qubitsHTML += qubit.getHTML(OFFSET, DISTANCE);
    });
    document.getElementById("circuit-container").innerHTML = qubitsHTML;
    // Add event listeners
    const qubits = document.getElementsByClassName("qubit-row");
    for (const qubit of qubits) {
      qubit.addEventListener("dragover", allowDrop);
      qubit.addEventListener("drop", drop.bind(this));
    }
    console.log("Circuit rendered:")
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}
function drop(ev) {
  ev.preventDefault();
  var cardType = ev.dataTransfer.getData("cardType");
  if (cardType === "measure") {
    console.log("Measurement Card Dropped. Measuring circuit after turn")
  } else {
    var qubitNumber = ev.target.id
    if(qubitNumber[0] !== "q")
      qubitNumber = ev.target.parentNode.id
      if(qubitNumber[0] !== "q")
        qubitNumber = ev.target.parentNode.parentNode.id
    var gateType = ev.dataTransfer.getData("gateType")
    if(cardType === "gate") {
      this.applyGate(new Gate(gateType), this.currentSlotnumber, parseInt(qubitNumber[1]))
    } else if(cardType === "destroy") {
      console.log("In destroy")
      if(ev.target.attributes.slotnumber !== undefined){
        var targetSlotnumber = ev.target.attributes.slotnumber.value
        console.log(`Target slotnumber ${targetSlotnumber}`)
        this.destroyGate(gateType, parseInt(qubitNumber[1]), targetSlotnumber)
      }else {
        console.log("Incorrect destroy move")
      }
    }
  }
}
