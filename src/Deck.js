import React, {useState} from "react";
import axios from "axios";

const CARD_DECK_URL = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"


function Deck(){

  const [card, setCard] = useState("");

  async function getCard(){
    const response = await axios.get(`${CARD_DECK_URL}`);
    const randomCard = response.data.cards[0]
    setCard(randomCard)
  }

  return (
    <div>
      <button onClick={getCard}>Get Card Using handler</button>
      <img src= {card.image} alt={card.code} />
    </div>
  )

}
export default Deck;