import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api/index.js'

const EditDeck = ({updateAppDecks}) => {

    const [deck, setDeck] = useState({name: "", description: ""})
    const history = useHistory()
    const {deckId} = useParams()

    useEffect(() => {
        const deckInfo = async () => {
            const response = await readDeck(deckId)
            setDeck(() => response)
        }
        deckInfo()
    }, [deckId]) 

    const changeHandler = ({ target }) => {
        setDeck({...deck, [target.name]: target.value})
    } 
    
    const submitHandler = async (event) => {
        event.preventDefault()
        const response = await updateDeck(deck)
        history.push(`/decks/${response.id}`)
        updateAppDecks(1)
    }

    if (!deck) {
        return (
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">
                   Loading...
                </span>
            </div>

    )} else {
    
        return (
            <div className="col-9 mx-auto">
                
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}> Home </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}> {deck.name} </Link>
                        </li>
                        <li className="breadcrumb-item"> Edit </li>
                    </ol>
                </nav>

                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={deck.name}
                        onChange={changeHandler}
                        id="name" 
                        className="form-control" 
                        placeholder={deck.name} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                        name="description" 
                        value={deck.description}
                        onChange={changeHandler}
                        className="form-control" 
                        id="description" 
                        placeholder={deck.description}
                        rows={4}
                        />
                    </div>

                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">
                        Cancel
                    </Link>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default EditDeck
                