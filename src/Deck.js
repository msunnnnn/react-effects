import React, { useState, useEffect } from "react";
import axios from "axios";

const CARD_DECK_URL = "https://deckofcardsapi.com/api/deck/";


function Deck() {
  const [deck, setDeck] = useState({
    id: "",
    card: "",
    isLoading: true,
    remaining: ""
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
    // try {
    const response = await axios.get(
      `${CARD_DECK_URL}${deck.id}/draw/?count=1`);
    const randomCard = response.data.cards[0];
    const remainingCards = response.data.remaining;
    console.log("remaining cards:", remainingCards);
    setDeck(deck => (
      {
        ...deck,
        card: randomCard,
        remaining: remainingCards
      }));
    // } catch (err) {
    //   setDeck(deck => (
    //     {
    //       ...deck,
    //       error: err
    //     }));
    //   // console.log("no more cards")
    // }
  }

  async function shuffleDeck() {
    await axios.get(`${CARD_DECK_URL}${deck.id}/shuffle`);
    console.log("SHUFFLING")
    setDeck(deck => (
      {
        ...deck,
        card: "",
        isLoading: false
      }));
  }



  if (deck.remaining === 0) {
    return (
      alert("No More Cards")
      // <h1>No More Cards</h1>
    );
  }

  return (
    <div>
      <button onClick={getCard}>Get Card</button>
      <button disabled={deck.isLoading ? true : false}
        onClick={shuffleDeck}>Shuffle Card</button>
      <img src={deck.card.image} alt={deck.card.code} />
    </div>
  );

}
export default Deck;