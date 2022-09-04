//shuffle and reset decks




/*
await resetBoard();

await randomizeBoard();

    let landCnt = 1;
    let portCnt = 0;
    let discCnt = 0;

let landDeck = game.cards.getName("Land Tiles");
let desNumArr = landDeck.cards.contents.filter( c => c.img == 'Catan/Land%20Tiles/Desert-1.png').map(c => (c.sort + 1) ) ;
let newImg = landDeck.cards.contents.filter( c => c.sort == (landCnt - 1) )[0].img

let t = game.canvas.tiles.controlled[0]
await t.document.setFlag("fcatan","hexName","land1")

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

            case 'Catan/Number%20Tiles/BlankNum.png':
                await td.update({ z: 200 });
            break; 
        }
    });
    
return true;
}

//randomize game board
async function randomizeBoard() {

    let desCnt = 0;

    let newImg = '/error.png' 

    let landDeck = game.cards.getName("Land Tiles");
    let portDeck = game.cards.getName("Port Tiles");
    let discArr = [
        'Catan/Number%20Tiles/5-6/A2.png'   //1
        ,'Catan/Number%20Tiles/5-6/B5.png'  //2
        ,'Catan/Number%20Tiles/5-6/C4.png'  //3
        ,'Catan/Number%20Tiles/5-6/D6.png'  //4
        ,'Catan/Number%20Tiles/5-6/E3.png'  //5
        ,'Catan/Number%20Tiles/5-6/F9.png'  //6
        ,'Catan/Number%20Tiles/5-6/G8.png'  //7
        ,'Catan/Number%20Tiles/5-6/H11.png' //8
        ,'Catan/Number%20Tiles/5-6/I11.png' //9
        ,'Catan/Number%20Tiles/5-6/J10.png' //10
        ,'Catan/Number%20Tiles/5-6/K6.png'  //11
        ,'Catan/Number%20Tiles/5-6/L3.png'  //12
        ,'Catan/Number%20Tiles/5-6/M8.png'  //13
        ,'Catan/Number%20Tiles/5-6/N4.png'  //14
        ,'Catan/Number%20Tiles/5-6/O8.png'  //15
        ,'Catan/Number%20Tiles/5-6/P10.png' //16
        ,'Catan/Number%20Tiles/5-6/Q11.png' //17
        ,'Catan/Number%20Tiles/5-6/R12.png' //18
        ,'Catan/Number%20Tiles/5-6/S10.png' //19
        ,'Catan/Number%20Tiles/5-6/T5.png'  //20
        ,'Catan/Number%20Tiles/5-6/U4.png'  //21
        ,'Catan/Number%20Tiles/5-6/V9.png'  //22
        ,'Catan/Number%20Tiles/5-6/W5.png'  //23
        ,'Catan/Number%20Tiles/5-6/X9.png'  //24
        ,'Catan/Number%20Tiles/5-6/Y12.png' //25
        ,'Catan/Number%20Tiles/5-6/Za3.png' //26
        ,'Catan/Number%20Tiles/5-6/Zb2.png' //27
        ,'Catan/Number%20Tiles/5-6/Zc6.png' //28
];           
    let desNumArr = [];

    //create array of land number of hexes that are deserts
    desNumArr = landDeck.cards.contents.filter( c => c.img == 'Catan/Land%20Tiles/Desert-1.png').map(c => (c.sort + 1) ) ;
    //desNumArr = [29,30];
    //desNumArr = [29,30];
    let earlyDesNumArr = [];


    //create array of all land tiles
    let landTArr = game.canvas.tiles.placeables.filter( t => (t.document.getFlag("fcatan","landNum") > 0 ) );

    //create array of all port tiles
    let portTArr = game.canvas.tiles.placeables.filter( t => (t.document.getFlag("fcatan","portNum") > 0 ) );

    //create array of all number disc tiles
    let discNumTArr = game.canvas.tiles.placeables.filter( t => (t.document.getFlag("fcatan","discNum") > 0 ) );
 
    //use the shuffled land deck to randomize the land tiles

    landTArr.forEach ( async t => {
            newImg = landDeck.cards.contents.filter( c => c.sort == t.document.getFlag("fcatan","landNum")-1)[0].img 
            await t.document.update({ "texture.src": newImg });
        });
    
    //use the shuffled port deck to randomize the land tiles
    portTArr.forEach ( async t => {
        newImg = portDeck.cards.contents.filter( c => c.sort == t.document.getFlag("fcatan","portNum")-1)[0].img 
        await t.document.update({ "texture.src": newImg });
    });

    //Randomize starting corner for placing numbered discs
    //Corners are numbered clockwise as follows, 
    // with Corner 1 being the traditional start in top-left:
    /*

        2
    1       3

    6       4
        5

    */    
    
    //let numCornerStart = Math.floor(Math.random() * 6) + 1;
    let numCornerStart = 1;
    let discNumOrderArr = [];

    //define the array of images of the numbered discs to match the rolled layout
    switch (numCornerStart) {
        case 1: 
            //standard order
            //set DiscOrder flag on disc tiles equal to discNum flag
            discNumTArr.forEach( t => t.document.setFlag("fcatan", "discOrder", t.document.getFlag("fcatan", "discNum")));

            //first land tile to apply a number disc to
            numStartLand = 1;
            break;
        case 2: 
            numStart = 4; 
            //new tile order 4-16,1-3,19-26,17-18,28-29,30,27
            discNumOrderArr = [
                4,5,6,7,8,9,10,11,12,13,14,15,16,1,2,3,19
                ,20,21,22,23,24,25,26,17,18,28,29,30,27
            ];
            //TODO: MAKE WORKY. Also standardize first case to use this logic also?
            discNumTArr.forEach( t => t.document.setFlag("fcatan", "discOrder", discOrderArr[discNumTArr]));
            /*
            discArr = [
                //1-5
                'Catan/Number%20Tiles/5-6/N4.png'  //14
                ,'Catan/Number%20Tiles/5-6/O8.png'  //15
                ,'Catan/Number%20Tiles/5-6/P10.png' //16
                , 'Catan/Number%20Tiles/5-6/A2.png'   //1
                ,'Catan/Number%20Tiles/5-6/B5.png'  //2

                //6-10
                ,'Catan/Number%20Tiles/5-6/C4.png'  //3
                ,'Catan/Number%20Tiles/5-6/D6.png'  //4
                ,'Catan/Number%20Tiles/5-6/E3.png'  //5
                ,'Catan/Number%20Tiles/5-6/F9.png'  //6
                ,'Catan/Number%20Tiles/5-6/G8.png'  //7
                
                //11-15
                ,'Catan/Number%20Tiles/5-6/H11.png' //8
                ,'Catan/Number%20Tiles/5-6/I11.png' //9
                ,'Catan/Number%20Tiles/5-6/J10.png' //10
                ,'Catan/Number%20Tiles/5-6/K6.png'  //11
                ,'Catan/Number%20Tiles/5-6/L3.png'  //12
                
                //16-20
                ,'Catan/Number%20Tiles/5-6/M8.png'  //13
                ,'Catan/Number%20Tiles/5-6/Y12.png' //25
                ,'Catan/Number%20Tiles/5-6/Za3.png' //26
                ,'Catan/Number%20Tiles/5-6/Q11.png' //17
                ,'Catan/Number%20Tiles/5-6/R12.png' //18

                //21-25
                ,'Catan/Number%20Tiles/5-6/S10.png' //19
                ,'Catan/Number%20Tiles/5-6/T5.png'  //20
                ,'Catan/Number%20Tiles/5-6/U4.png'  //21
                ,'Catan/Number%20Tiles/5-6/V9.png'  //22
                ,'Catan/Number%20Tiles/5-6/W5.png'  //23

                //26-28
                ,'Catan/Number%20Tiles/5-6/X9.png'  //24
                ,'Catan/Number%20Tiles/5-6/Zb2.png' //27
                ,'Catan/Number%20Tiles/5-6/Zc6.png' //28


            ];
            */
            //first land tile to apply a number disc to
            numStartLand = 4;
            break;
        /*
        case 3: numStart = 7;
        case 4: numStart = 9;
        case 5: numStart = 12;
        case 6: numStart = 15;
        */
    }
    //insert deserts into the array at the appropriate locations
    desNumArr.forEach(n => discArr.splice(n-1, 0, 'Desert'));
    //calculate adjustment for early deserts possibly throwing off first land to number
    earlyDesNumArr = desNumArr.filter( n => (n < numStartLand) );
    earlyDesOffsetNum = earlyDesNumArr.length;

    //place the numbered discs, skipping deserts and adjusting for early deserts
    //TODO: Desert skipping not QUITE right, fix
    discNumTArr.forEach ( async t => {
        //console.log(`Desert discs are`);
        //desNumArr.forEach(function(n) {
        //console.log(n);
        //});
        //
        newImg = discArr[ t.document.getFlag("fcatan","discOrder") - 1 ];
        if (newImg === 'Desert') {
            console.log("Desert location found, skipping disc setting and sending to back")
            await t.document.update({ z: 0 });
        } else { 

            console.log(`Current img: ${t.document.texture.src}. Trying to assign ${newImg}`);   
            await t.document.update({ "texture.src": newImg });
        }
    });
console.log(discArr);
}