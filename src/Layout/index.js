import React, { useState } from "react";
import { Switch, Route } from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import Deck from "../Decks/Deck";
import CreateDeck from "../Decks/CreateDeck";
import Study from "../Study/Study";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import EditDeck from "../Decks/EditDeck";

function Layout() {
  const [ appDecks, setAppDecks ] = useState (0);

  const updateAppDecks = (newDecks) => {
    setAppDecks(() => appDecks + newDecks)
  };

  return (
    <>
      <Header />
      
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        
        <Switch>
          
          {/* Home screen component */}
          <Route path="/" exact>
            <Home updateAppDecks={updateAppDecks} appDecks={appDecks} />
          </Route>

          {/* CreateDeck screen component */}
          <Route path="/decks/new">
            <CreateDeck updateAppDecks={updateAppDecks} />
          </Route>
          
          {/* Deck screen component */}
          <Route path="/decks/:deckId" exact>
            <Deck updateAppDecks={updateAppDecks} />
          </Route>

          {/* Study screen component */}
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          {/* edit deck component */}
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateAppDecks} />
          </Route>

          {/* Add Card screen component */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          {/* Edit Card screen component */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

           {/* not found component  */}
          <Route>
            <NotFound />  
          </Route>

        </Switch>
        
      </div>
    </>
  );
};

export default Layout;