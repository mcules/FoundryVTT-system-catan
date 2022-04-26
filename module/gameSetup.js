
//randomize game board
game.canvas.background.placeables.forEach(t =>
    {
    /*add logic to determine whether to use the 4 or 6 player board, probably by checking a flag on the active scene
    because each board type will be created from a duplicate of a template scene, which can be flagged appropriately */

    let curLandHexImg = '' //initialize with first card in shuffled land tile deck of appropriate player num
    let curPortHexImg = '' //initialize with first card in shuffled port tile deck of appropriate player num
    let curLetDiscTexture = '' //define as set array appropriate for player num, perhaps as a CONFIG.

    switch(t.data.img) {
        case CONFIG.blankLandTexture:
            //Add logic to set curHex to be one of the texture configuration values, based on the order of cards in the LandHexTile deck
            t.data.img = curLandHexImg
            //curLandHexImg = <image path of next card in land hex deck>
            break;

        case CONFIG.blankPortTexture:
            //do same thing with port tiles
            t.data.img = curPortHexImg
            //curPortHexImg = <image path of next card in port hex deck>
            break;  
    }
});

//drop correct letter number discs on game board
/* use ordinal flags on the land hex tiles to iterate through tiles in some way
set the letter disc with the matching ordinal to be the appropriate value, or hide that disc if it is on a desert */

//shuffle and reset all decks