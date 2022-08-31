//shuffle and reset decks




/*
await resetBoard();

await randomizeBoard();

let hexDeck = game.cards.getName("Land Tiles");
let desNumArr = hexDeck.cards.contents.filter( c => c.img == 'Catan/Land%20Tiles/Desert-1.png').map(c => (c.sort + 1) ) ;


*/

async function resetDecks() {
    game.cards.contents.forEach(d => {
        d.recall();
        d.shuffle();
    });
}

//reset used game board
async function resetBoard() {
    await resetDecks();
    let newImg = '/error.png' 

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

            //upgrade to config later
            case 'Catan/Number%20Tiles/5-6/A2.png':
            case 'Catan/Number%20Tiles/5-6/B5.png':
            case 'Catan/Number%20Tiles/5-6/C4.png':
            case 'Catan/Number%20Tiles/5-6/D6.png':
            case 'Catan/Number%20Tiles/5-6/E3.png':
            case 'Catan/Number%20Tiles/5-6/F9.png':
            case 'Catan/Number%20Tiles/5-6/G8.png':
            case 'Catan/Number%20Tiles/5-6/H11.png':
            case 'Catan/Number%20Tiles/5-6/I11.png':
            case 'Catan/Number%20Tiles/5-6/J10.png':
            case 'Catan/Number%20Tiles/5-6/K6.png':
            case 'Catan/Number%20Tiles/5-6/L3.png':
            case 'Catan/Number%20Tiles/5-6/M8.png':
            case 'Catan/Number%20Tiles/5-6/N4.png':
            case 'Catan/Number%20Tiles/5-6/O8.png':
            case 'Catan/Number%20Tiles/5-6/P10.png':
            case 'Catan/Number%20Tiles/5-6/Q11.png':
            case 'Catan/Number%20Tiles/5-6/R12.png':
            case 'Catan/Number%20Tiles/5-6/S10.png':
            case 'Catan/Number%20Tiles/5-6/T5.png':
            case 'Catan/Number%20Tiles/5-6/U4.png':
            case 'Catan/Number%20Tiles/5-6/V9.png':
            case 'Catan/Number%20Tiles/5-6/W5.png':
            case 'Catan/Number%20Tiles/5-6/X9.png':
            case 'Catan/Number%20Tiles/5-6/Y12.png':
            case 'Catan/Number%20Tiles/5-6/Za3.png':
            case 'Catan/Number%20Tiles/5-6/Zb2.png':
            case 'Catan/Number%20Tiles/5-6/Zc6.png':
                //Tile is a number disc that should be reset
                //will eventually have to set Z level back for Desert tiles
                console.log("non-default number disc tile found");          
                newImg = 'Catan/Number%20Tiles/BlankNum.png';
                console.log(`Current img: ${td.texture.src}. Trying to reset to ${newImg}`); 
                //TODO: set Z value to front value again also
                await td.update({ "texture.src": newImg });
            break;  

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
    let discArr = [           
        'Catan/Number%20Tiles/5-6/A2.png'
        ,'Catan/Number%20Tiles/5-6/B5.png'
        ,'Catan/Number%20Tiles/5-6/C4.png'
        ,'Catan/Number%20Tiles/5-6/D6.png'
        ,'Catan/Number%20Tiles/5-6/E3.png'
        ,'Catan/Number%20Tiles/5-6/F9.png'
        ,'Catan/Number%20Tiles/5-6/G8.png'
        ,'Catan/Number%20Tiles/5-6/H11.png'
        ,'Catan/Number%20Tiles/5-6/I11.png'
        ,'Catan/Number%20Tiles/5-6/J10.png'
        ,'Catan/Number%20Tiles/5-6/K6.png'
        ,'Catan/Number%20Tiles/5-6/L3.png'
        ,'Catan/Number%20Tiles/5-6/M8.png'
        ,'Catan/Number%20Tiles/5-6/N4.png'
        ,'Catan/Number%20Tiles/5-6/O8.png'
        ,'Catan/Number%20Tiles/5-6/P10.png'
        ,'Catan/Number%20Tiles/5-6/Q11.png'
        ,'Catan/Number%20Tiles/5-6/R12.png'
        ,'Catan/Number%20Tiles/5-6/S10.png'
        ,'Catan/Number%20Tiles/5-6/T5.png'
        ,'Catan/Number%20Tiles/5-6/U4.png'
        ,'Catan/Number%20Tiles/5-6/V9.png'
        ,'Catan/Number%20Tiles/5-6/W5.png'
        ,'Catan/Number%20Tiles/5-6/X9.png'
        ,'Catan/Number%20Tiles/5-6/Y12.png'
        ,'Catan/Number%20Tiles/5-6/Za3.png'
        ,'Catan/Number%20Tiles/5-6/Zb2.png'
        ,'Catan/Number%20Tiles/5-6/Zc6.png'];

        let desNumArr = [];
        //check is correct in console. not sure if following statement is more than pseudocode
        desNumArr = hexDeck.cards.contents.filter( c => c.img == 'Catan/Land%20Tiles/Desert-1.png').map(c => (c.sort + 1) ) ;

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
                if(hexCnt < hexDeck.cards.size) hexCnt++;
                //grabbing wrong image to set somehow!
                newImg = hexDeck.cards.contents.filter( c => c.sort == (hexCnt - 1) )[0].img
                console.log(`Current img: ${td.texture.src}. Trying to assign ${newImg}`); 

                console.log(`${hexCnt} land tiles set, ${portCnt} ports set, and ${discCnt} number discs set.`)                 
                await td.update({ "texture.src": newImg });
            break;

            //upgrade to config later
            case 'Catan/Port%20Tiles/MysteryPort.png':
                //do same thing with port tiles
                console.log("blank port tile found"); 
                if(portCnt < portDeck.cards.size) portCnt++; 
                //grabbing wrong image to set somehow!                          
                newImg = portDeck.cards.contents.filter( c => c.sort == (portCnt -1) )[0].img
                console.log(`Current img: ${td.texture.src}. Trying to assign ${newImg}`); 
                console.log(`${hexCnt} land tiles set, ${portCnt} ports set, and ${discCnt} number discs set.`)
                await td.update({ "texture.src": newImg });
            break;  

            //upgrade to config later
            case 'Catan/Number%20Tiles/BlankNum.png':
                //Set up number discs
                console.log("blank number disc tile found"); 
                if(discCnt < discArr.length) discCnt++;
                newImg = discArr[discCnt - 1];           
                //TODO: verify following logical clause
                console.log(`Checking number disc tile number ${discCnt}. Desert discs are`);
                desNumArr.forEach(function(n) {
                console.log(n);
                });
                console.log(desNumArr.filter( n => n == discCnt).length);
                if ( desNumArr.filter( n => n == discCnt).length > 0) {
                    console.log("Desert location found, skipping disc setting and sending to back")
                    //TODO: send to back
                } else 
                { 
                    console.log(`Current img: ${td.texture.src}. Trying to assign ${newImg}`);   
                    console.log(`${hexCnt} land tiles set, ${portCnt} ports set, and ${discCnt} number discs set.`)
                    await td.update({ "texture.src": newImg });
                }
            break;  
        }



    });
    
return true;
}
//drop correct letter number discs on game board
/* use ordinal flags on the land hex tiles to iterate through tiles in some way
set the letter disc with the matching ordinal to be the appropriate value, or hide that disc if it is on a desert */

//shuffle and reset all decks