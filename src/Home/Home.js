import React, { useState, useEffect } from "react";
import DeckList from "../Decks/DeckList";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";

function Home ({ updateAppDecks, appDecks }) {
    const [homeDecks, setHomeDecks] = useState([]);

    useEffect(() => {
        const fetchDecks = async () => {
            const ApiDecks = await listDecks();
            setHomeDecks(ApiDecks);
        }
        fetchDecks();
    }, [appDecks] );

    return (
        <div>
            <div className='row mx-auto'>
                <Link to={'/decks/new'} className='btn btn-secondary mb-2'>
                <button type="button" className="btn btn-secondary">+ Create Deck</button>   
                </Link>
            </div>
            <div className='row mx-auto'>
                {homeDecks.map((deck) => 
                <DeckList 
                    key={deck.id}
                    homeDeck={deck}
                    updateAppDecks={updateAppDecks}
                />
                )}
            </div>
        </div>
    )   
}

export default Home;