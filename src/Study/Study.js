import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api/index';
import CardList from '../Cards/CardList';

function Study() {

    const [studyDeck, setStudyDeck] = useState({});
    const {deckId} = useParams();

    useEffect(() => { 
            const findDeck = async () => { 
                const currentDeck = await readDeck(deckId)
                setStudyDeck(()=> currentDeck)  
            }
            findDeck()
    }, [deckId]);

    if (Object.keys(studyDeck).length) {
        return (
            <div className="col-9 mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}> Home </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}> {studyDeck.name} </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                <div> <h1>{studyDeck.name}: Study</h1> </div>
                <CardList cards={studyDeck.cards}/>

            </div>
    )
    } else { 
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"> Loading... </span>
            </div>
        ) 
    };
};

export default Study;          