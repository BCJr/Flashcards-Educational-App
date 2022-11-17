import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from './CardForm';

const AddCard = () => {
 
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({
        front:'',
        back:'',
        deckId:''
    })

    const { deckId } = useParams();
    
    useEffect(() => {
        const deckInfo = async () => {
            const response = await readDeck(deckId)
            setDeck(() => response)
        }
        deckInfo()
    }, [deckId])


    const changeHandler = ({ target }) => {
        setCard({...card, [target.name]: target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setCard({...card, deckId: deckId})
        createCard(deckId, card)
        setCard({front: '', back: '', deckId: ''})
    }

    return ( 
    <div className='col-9 mx-suto'>
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to={'/'}> Home </Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}> {deck.name} </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${deckId}/cards/new`}> Add Card </Link>
                </li>
            </ol>
        </nav>
        <div className='row pl-3 pb-2'>
            <h1>{deck.name}: Add Card</h1>
        </div>
        <CardForm 
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            card={card}
            deckId={deckId}
        />
        
    </div> );
}
 
export default AddCard;

