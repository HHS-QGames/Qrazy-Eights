// MeasurementCard.js
/**
 * MeasurementCard is a class that represents a measurement card.
 */
import Card from "./Card.js";

export default class MeasurementCard extends Card {
  constructor(measurementData, api) {
    super({
      type: "measurement",
      gateIconPath: 'assets\\measure.png'
    }); // Initialize with parent class constructor
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

  getHTML() {
    return '<div class="card measure" draggable="true" ondragstart="drag(event)"><div class="card-title">Measure</div><img src="assets/measure.png" class="card-symbol" /><div class="card-description">End Round</div></div>'
  }
}