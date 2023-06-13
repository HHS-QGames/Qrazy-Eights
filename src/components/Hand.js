// Hand.js
/**
 * Hand is a class that represents a player's hand of cards.
 */
class Hand {
  constructor(cards) {
    this.cards = cards; // Cards in the player's hand
  }

  /**
   * Adds a card to the player's hand.
   * @param {Object} card - The card to add.
   */
  addCard(card) {
    this.cards.push(card);
  }

  /**
   * Removes a card from the player's hand.
   * @param {Object} card - The card to remove.
   */
  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
  render() {
    var cardsHTML = ""
    this.cards.forEach(card => {
      cardsHTML += card.getHTML()
    });
    document.getElementById("player-cards").innerHTML = cardsHTML
  }
}
