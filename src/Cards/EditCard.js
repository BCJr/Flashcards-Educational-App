import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import CardForm from "./CardForm.js";

const EditCard = ({ updateDecks }) => {
  const [deck, setDeck] = useState([]);
  const [card, editCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const cardInfo = async () => {
      const response = await readCard(cardId);
      editCard(() => response);
    };
    cardInfo();
  }, [cardId]);

  useEffect(() => {
    const deckInfo = async () => {
      const response = await readDeck(deckId);
      setDeck(() => response);
    };
    deckInfo();
  }, [deckId]);

  const changeForm = ({ target }) => {
    editCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault()
    await updateCard(card)
    history.push(`/decks/${deck.id}`)
    updateDecks(1)
  }

  return (
    <div className='col-9 mx-auto'>

        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to={'/'}>  Home </Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}> {deck.name} </Link>
                </li>
                <li className='breadcrumb-item'> Edit Card {cardId}
                </li>
            </ol>
        </nav>
        <div className='row pl-3 pb-2'>
            <h1>Edit Card</h1>
        </div>
        <CardForm 
            submitForm={submitForm}
            changeForm={changeForm}
            card={card}
            deckId={deckId}
        />
    </div>
  );
};

export default EditCard;
