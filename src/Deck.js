import React, { useState, useEffect } from "react";
import axios from "axios";

const CARD_DECK_URL = "https://deckofcardsapi.com/api/deck/";


function Deck() {

  const [deck, setDeck] = useState({
    id: "",
    card: "",
    isLoading: true,
    remaining: "",
    error: null
  });

  useEffect(function getDeckIdWhenMounted() {
    async function getDeckId() {
      const response = await axios.get(`${CARD_DECK_URL}new/`);
      const deckId = response.data.deck_id;
      const remainingCards = response.data.remaining;
      setDeck({
        id: deckId,
        card: "",
        isLoading: false,
        remaining: remainingCards
      });
    }
    getDeckId();
  }, []);


  async function getCard() {
    try {
      const response = await axios.get(`${CARD_DECK_URL}${deck.id}/draw/?count=1`);
      const randomCard = response.data.cards[0];
      const remainingCards = response.data.remaining;
      console.log("remaining cards:", remainingCards);
      setDeck(deck => (
        {
          ...deck,
          card: randomCard,
          remaining: remainingCards
        }));
    } catch (err) {
      setDeck(deck => (
        {
          ...deck,
          error: err
        }));
      console.log("no more cards")
    }
  }
  if (deck.remaining === 1){
    console.log("error", deck.error)
    return (

      <h1>No More Cards</h1>

    )
  }

  return (
    <div>
      <button onClick={getCard}>Get Card Using handler</button>
      <img src={deck.card.image} alt={deck.card.code} />
    </div>
  );

}
export default Deck;