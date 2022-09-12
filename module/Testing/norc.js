/* library of commonly used functions

/**
 * Generic private function to randomize the order of an existing array.
*/   
export function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

//TODO: Check terminology. Should these be working with "decks,"" or rather "stacks"?
//TODO: Data input validation and messaging

//adds an int number of copies (numCopies) of a source Card (srcCard) to the end of the destination deck (dstDeck).
async function addCardCopy(dstDeck, srcCard, numCopies) {
    let newArrCardData = Array.from({length: numCopies}, () => srcCard.data);
    await dstDeck.createEmbeddedDocuments("Card", newArrCardData);
    return dstDeck;
}

//function to sort the cards in a given deck by name. returns array of sorted card objects.
async function sortDeckByCardName(sortDeck) {
    //TODO: Add better number sorting, reverse sort as optional param
    let newArrCard = sortDeck.cards.contents.sort( (a,b) => String(a.data.name).localeCompare(b.data.name) );
    //built-in version of replaceEmbeddedCards function for convenience
    await sortDeck.deleteEmbeddedDocuments("Card", [""], {deleteAll: true});

    let newArrCardData = [];
    newArrCard.forEach( (item) => newArrCardData.push(item.data) );

    await sortDeck.createEmbeddedDocuments("Card", newArrCardData);
    return sortDeck;
}

//Replaces all Card embedded documents in a deck with a new array of Card embedded docs.
//Particularly useful for sorting a deck arbitrarily
//(sort the array of Card embeddedDocuments however you want, then pass as arg)
async function replaceEmbeddedCards(replDeck, newArr) {
    //replDeck is the deck to work with, newArr is the array of new Card embedded docs to store
    await replDeck.deleteEmbeddedDocuments("Card", [""], {deleteAll: true});

    let newArrData = [];
    newArr.forEach( (item) => newArrData.push(item.data) );

    await replDeck.createEmbeddedDocuments("Card", newArrData);
    return replDeck;
}

//Display a new application to select cards.
//Creates a temporary stack of cards that should be "discarded" - returned to their deck.
//Display application with list of cards in current hand, each with checkbox
//When user clicks okay, create a temporary stack of these cards and Return them. 
async function playHandCards() {
  //write code here
}

//Crate a generic macro so a player can draw from a particular deck
async function drawCard(deckName, numCards=1) {
  //write code here
}

//Returns the Cards document that is the player's hand. 
//if player is GM, return the hand that is named the name of the user plus " Hand"
function getHand() {
 let h = game.cards.contents.filter( (d) => ( d.isOwner && d.type === 'hand') );
 h = h[0];
 if ( game.user.isGM ) h = game.cards.getName(`${game.user.name} Hand`);  
 //TODO: needs sadpath handling
 return h;
}

