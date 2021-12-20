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

 //should use localeCompare 
 // caS = ca.sort((a,b) => (a.data.name > b.data.name) ? 1 : -1)

 let caS = d2.cards.contents.sort((a,b) => (a.data.name > b.data.name) ? 1 : -1)
 
//Replaces all cards in a deck with an array of new cards.
//Particularly useful for sorting a deck. (replace existing cards with a sorted array)
async function replaceEmbeddedCards(replDeck, newArr) {
//Parameter explanations
//replDeck is deck that needs to have its cards replaced (its Card embedded docs)
//newArr is the array of new cards

//useful contextOptions
//deleteAll
//keepId

let delIds = getArrIds(replDeck);
await replDeck.deleteEmbeddedDocuments("Card", delIds);

let newArrData = [];

newArr.forEach( (item) => newArrData.push(item.data) );

await replDeck.createEmbeddedDocuments("Card", newArrData);
return replDeck;
}

function objArrToMap(arr) {
    let dcS = new Map();
    arr.forEach( (item) => {
        dcS.set(item.id, item)
    } ); 
    return dcS
}

d2.deleteEmbeddedDocuments({embeddedName:"Card", ids:[], context:"deleteAll"})

d2.deleteEmbeddedDocuments("Card", [""], "deleteAll")

d2.deleteEmbeddedDocuments("Card", [...d2.id])

//Returns array of IDs of all cards in a deck
function getArrIds(deck) {
    let r = [];
    deck.cards.contents.forEach( (item) => {
        r.push(item.id);
    })
    return r;
}

