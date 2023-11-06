// Game.js
/**
 * Game is a class that represents the game, which includes players, the quantum circuit, and card piles.
 */
import Circuit from "./components/Circuit.js";
import Player from "./components/Player.js";
import Pile from "./components/Pile.js";
import Scoreboard from "./components/Scoreboard.js";
import GameSettings from "./components/Gamesettings.js";
import Qubit from "./components/Qubit.js";
import Deck from "./components/Deck.js";
import { main } from "./main.js";
import { execute } from "./util/QuantumAPI.js";
import { randomSeed } from "./random.js";

export default class Game {
  constructor(players, gameSettings, connection, moveSender) {
    this.gameSettings = gameSettings;
    this.moveSender = moveSender;
    this.players = players;

    this.scoreboard = new Scoreboard(players);

    const qubits = [];
    for (let i = 0; i < gameSettings.qubitCount; i++) {
      qubits.push(new Qubit(i));
    }
    this.circuit = new Circuit(qubits, connection, moveSender);
  }
  doMove(move) {
    if (move["type"] === "nextPlayer")
      this.nextTurnWithoutTrigger(move["outcome"]);
    else
      this.circuit.doMove(move);
  }
  /**
   * Starts the game, including shuffling the deck and dealing cards to players.
   */
  startGame() {
    this.players.forEach((player) => {
      player.game = this;
    });
    this.currentPlayer = this.players[0]; // The first player goes first

    this.drawPile = new Deck([]);
    this.drawPile.addCards(
      { cardType: "gate", gateType: "hadamard" },
      this.gameSettings.hadamardCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-x" },
      this.gameSettings.pauli_xCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-y" },
      this.gameSettings.pauli_yCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-z" },
      this.gameSettings.pauli_zCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-x" },
      this.gameSettings.prep_xCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-y" },
      this.gameSettings.prep_yCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-z" },
      this.gameSettings.prep_zCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "cnot" },
      this.gameSettings.hadamardCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "hadamard" },
      this.gameSettings.hadamardCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-x" },
      this.gameSettings.pauli_xCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-y" },
      this.gameSettings.pauli_yCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-z" },
      this.gameSettings.pauli_zCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-x" },
      this.gameSettings.prep_xCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-y" },
      this.gameSettings.prep_yCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-z" },
      this.gameSettings.prep_zCountPP *
        this.players.length *
        this.gameSettings.destroyPerGateCount *
        this.gameSettings.totalCardMultiplier
    );
    // this.drawPile.addCards({cardType: "destroy", gateType: "cnot"}, this.gameSettings.hadamardCountPP * this.players.length * this.gameSettings.destroyPerGateCount * this.gameSettings.totalCardMultiplier)
    this.drawPile.addCards(
      { cardType: "measure", gateType: undefined },
      this.gameSettings.measureCountPP *
        this.players.length *
        this.gameSettings.totalCardMultiplier
    );

    this.discardPile = new Pile([]);
    this.measureCircuit = false;

    this.players.forEach((player) => {
      console.log("Player:");
      console.log(player);
      if (player.connection !== null) // me
        player.connection.send(JSON.stringify({ type: "starting", seed: randomSeed, players: this.players.map(p => p.name) }));
    });
    this.drawPile.shuffle();
    this.players.forEach((player) => {
      player.drawCards(this.gameSettings.startingHandSize, true);
    });
    this.currentPlayer.isCurrentTurn = true;
    this.forceRender();
  }

  /**
   * Advances the game to the next turn.
   */
  async nextTurn() {
    outcome = this.nextTurnWithoutTrigger();
    this.moveSender({
      "type": "nextPlayer",
      outcome
    });
  }
  async nextTurnWithoutTrigger(outcome) {
    let ret;
    console.log(this.circuit.to_cQASM())
    if (this.isGameOver()) {
      alert(`${this.currentPlayer.name} heeft gewonnen!`);
      main();
      return;
    }
    if (this.measureCircuit) {
      // console.log("Circuit as cQasm")
      // console.log(this.circuit)
      // console.log(this.circuit.to_cQASM())
      // const measurementValue = Math.floor(Math.random() * 17); // Binary value of the qubits 0 1 0 0
      let measurementValue;
      if (outcome) {
        const results = await execute(this.circuit.to_cQASM());
        measurementValue = this.findMostFrequentNumber(results); // Binary value of the qubits 0 1 0 0  
      } else measurementValue = outcome;
      var binaryResult = measurementValue.toString(2)
      while (binaryResult.length < this.circuit.qubits.length) {
        binaryResult = "0" + binaryResult;
      }
      ret = measurementValue;
      console.log(measurementValue);
      alert(
        `The result of the measurement is ${measurementValue}! (binary: ${binaryResult})\n${
          measurementValue === 0
            ? `Nobody needs to draw a card.`
            : `Everybody except for ${this.currentPlayer.name} gets to draw ${measurementValue} cards.`
        }`
      );
      // Now give the other players this amount of cards
      this.players.forEach((player) => {
        if (player != this.currentPlayer) player.drawCards(measurementValue);
      });
      this.measureCircuit = false;
      this.circuit.clear();
    }
    this.currentPlayer.isCurrentTurn = false;
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer =
      this.players[(currentPlayerIndex + 1) % this.players.length];
    this.currentPlayer.giveTurn();
    console.log(
      `Current turn player ${(currentPlayerIndex + 2) % this.players.length}: ${
        this.currentPlayer.name
      }`
    );
    this.forceRender();
  }
  findMostFrequentNumber(numbers) {
    const frequency = {};

    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    return +Object.keys(frequency).reduce((a, b) =>
      frequency[a] > frequency[b] ? a : b
    );
  }
  /**
   * Checks if the game is over.
   * @return {Boolean} True if the game is over, false otherwise.
   */
  isGameOver() {
    console.log("Cards" + this.currentPlayer.hand.cards.length);
    return this.currentPlayer.hand.cards.length === 0;
  }

  forceRender() {
    this.circuit.render();
    this.currentPlayer.hand.render();
    this.scoreboard.render();
  }
}
