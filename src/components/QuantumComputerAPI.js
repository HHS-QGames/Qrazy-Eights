// QuantumComputerAPI.js
const QuantumComputerSDK = require('quantum-computer-sdk'); 

/**
 * QuantumComputerAPI is a class that communicates with the QuantumComputerSDK.
 * It sends quantum circuits to be executed and gets the result of the measurement.
 */
class QuantumComputerAPI {
  constructor() {
    this.sdk = new QuantumComputerSDK();
  }

  /**
   * Executes a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to be executed.
   * @return {Object} result - The result of the executed circuit.
   */
  executeCircuit(circuit) {
    return this.sdk.execute(circuit);
  }

  /**
   * Gets the result of the measurement from the QuantumComputerSDK.
   * @return {Object} result - The measurement result.
   */
  getMeasurementResult() {
    return this.sdk.getMeasurementResult();
  }
}