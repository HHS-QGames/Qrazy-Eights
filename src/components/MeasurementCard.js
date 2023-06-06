// MeasurementCard.js
/**
 * MeasurementCard is a class that represents a measurement card.
 */
class MeasurementCard extends Card {
  constructor(cardData, measurementData, api) {
    super(cardData); // Initialize with parent class constructor
    this.measurementData = measurementData; // Data for the measurement
    this.api = api; // Quantum computer API for measurement
  }

  /**
   * Measures the current state of a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to measure.
   * @return {Object} result - The result of the measurement.
   */
  measureCircuit(circuit) {
    return this.api.executeCircuit(circuit);
  }
}