// Deck.js
/**
 * Deck is a class that represents a deck of cards.
 */
export default class Deck {
  constructor(cards) {
    this.cards = cards; // Cards in the deck
  }

  /**
   * Shuffles the deck of cards.
   */
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  /**
   * Draws a card from the deck.
   * @return {Object} card - The card that was drawn.
   */
  drawCard() {
    return this.cards.pop();
  }
}
