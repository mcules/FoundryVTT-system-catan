//shuffle and reset decks




/*
await resetBoard();
await resetDecks();

await randomizeBoard();
*/

async function resetDecks() {
    game.cards.contents.forEach(d => {
        d.recall();
        d.shuffle();
    });
}
//reset used game board
async function resetBoard() {
    let hexCnt = 0;
    let portCnt = 0;
    let discCnt = 0;

    let newImg = '/error.png' 

    let hexDeck = game.cards.getName("Land Tiles");
    let portDeck = game.cards.getName("Port Tiles");
    let discArr = [];

    game.canvas.tiles.documentCollection.contents.forEach(async td =>
        {
           
        switch(td.texture.src) {
            //upgrade to config later
            case 'Catan/Land%20Tiles/Desert-1.png':
            case 'Catan/Land%20Tiles/Plains-1.png':
            case 'Catan/Land%20Tiles/Brick-1.png':
            case 'Catan/Land%20Tiles/Sheep-1.png':
            case 'Catan/Land%20Tiles/Stone-1.png':
            case 'Catan/Land%20Tiles/Wood-1.png':    
            //Tile is a land tile that should be reset
                console.log("non-default land tile found");
                newImg = 'Catan/Land%20Tiles/BlankLand.png';
                console.log(`Current img: ${td.texture.src}. Trying to reset to ${newImg}`);               
                await td.update({ "texture.src": newImg });
            break;

            //upgrade to config later
            case 'Catan/Port%20Tiles/3Port%20Tile.png':
            case 'Catan/Port%20Tiles/BrickPort.png':
            case 'Catan/Port%20Tiles/GrainPort.png':
            case 'Catan/Port%20Tiles/SheepPort.png':
            case 'Catan/Port%20Tiles/StonePort.png':
            case 'Catan/Port%20Tiles/WoodPort.png':
            //Tile is a port tile that should be reset
                console.log("non-default port tile found");          
                newImg = 'Catan/Port%20Tiles/MysteryPort.png';
                console.log(`Current img: ${td.texture.src}. Trying to reset to ${newImg}`); 
                await td.update({ "texture.src": newImg });
                break;  

            //add case number tile
        }
    });
    
return true;
}

//randomize game board
async function randomizeBoard() {
    let hexCnt = 0;
    let portCnt = 0;
    let discCnt = 0;

    let newImg = '/error.png' 

    let hexDeck = game.cards.getName("Land Tiles");
    let portDeck = game.cards.getName("Port Tiles");
    let discArr = [];

    game.canvas.tiles.documentCollection.contents.forEach(async td =>
        {
        /*add logic to determine whether to use the 4 or 6 player board, probably by checking a flag on the active scene
        because each board type will be created from a duplicate of a template scene, which can be flagged appropriately 
        
        Hardcoded to 6 for now
        */
        //console.log(hexDeck.cards.contents[hexCnt].img);
        //console.log(portDeck.cards.contents[hexCnt].img);
   
        switch(td.texture.src) {
            //upgrade to config later
            case 'Catan/Land%20Tiles/BlankLand.png':
                //Set tile to be one of the texture configuration values, based on the order of cards in the LandHexTile deck
                console.log("blank land tile found");
                newImg = hexDeck.cards.contents.filter( c => c.sort == hexCnt )[0].img
                console.log(`Current img: ${td.texture.src}. Trying to assign ${newImg}`); 
                if(hexCnt < hexDeck.cards.size) hexCnt++;
                console.log(`${hexCnt} land tiles set and ${portCnt} ports set`)                 
                await td.update({ "texture.src": newImg });
                //await t.refresh();
                break;

            //upgrade to config later
            case 'Catan/Port%20Tiles/MysteryPort.png':
                //do same thing with port tiles
                console.log("blank port tile found");            
                newImg = portDeck.cards.contents.filter( c => c.sort == portCnt )[0].img
                console.log(`Current img: ${td.texture.src}. Trying to assign ${newImg}`); 
                if(portCnt < portDeck.cards.size) portCnt++;
                console.log(`${hexCnt} land tiles set and ${portCnt} ports set`)
                await td.update({ "texture.src": newImg });
                break; 
                //await t.refresh();  

            //add case number tile
        }



    });
    
return true;
}
//drop correct letter number discs on game board
/* use ordinal flags on the land hex tiles to iterate through tiles in some way
set the letter disc with the matching ordinal to be the appropriate value, or hide that disc if it is on a desert */

//shuffle and reset all decks