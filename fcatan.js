/**
 * The minimal possible Foundry game system intended for board game use.
 * Founders of Catan PERSONAL USE ONLY added.
 * Author: Norc
 */

 //TODO: Convert from Pseudocode
 //Hooks.on("createCombat") { init array with all tiles with water texture. Opacity blue = port. Opacity black = land }
 //Store array in combat.
 //Shuffle appropriate sized tile decks and set images accordingly.
 //If possible, place number tiles also, skipping deserts.

 //TODO: Extend core card applications to be more catan-friendly
 
//MUST DO:
//Extend Pass to also pass the card data (nicely sorted and grouped string of passed cards). submit feature request also.
//populate player macro barsvideo

//VERY NICE TO DO:
//Auto game setup.

// Import Modules
import { addTiebreaker } from "./module/combat.js";
import { FCCards } from "./module/FCCards.js";

/* -----------------------------------------*/
/*  Founders of Catan System Initialization */
/* -----------------------------------------*/

/**
 * Init hook.
 */
Hooks.once("init", async function() {

  console.log(`CATAN | Initializing Founders of Catan System`);

  //set CONFIGs and define any non-optional things as basically as possible here.
  CONFIG.Combat.initiative.formula = '2d6';
  CONFIG.Catan = {waterTexture: 'Catan/Land%20Tiles/Water.png'
   , desertTexture: 'Catan/Land%20Tiles/Desert-1.png'
   , fieldsTexture: 'Catan/Land%20Tiles/Plains-1.png'
   , forestTexture: 'Catan/Land%20Tiles/Wood-1.png'
   , hillsTexture: 'Catan/Land%20Tiles/Brick-1.png'
   , mountainsTexture: 'Catan/Land%20Tiles/Stone-1.png'
   , pastureTexture: 'Catan/Land%20Tiles/Sheep-1.png'
   , port3to1Texture: 'Catan/Port%20Tiles/3Port%20Tile.png'
   , portGrainTexture: 'Catan/Port%20Tiles/GrainPort.png'
   , portSheepTexture: 'Catan/Port%20Tiles/SheepPort.png'
   , portWoodTexture: 'Catan/Port%20Tiles/WoodPort.png'
   , portBrickTexture: 'Catan/Port%20Tiles/BrickPort.png'
   , portStoneTexture: 'Catan/Port%20Tiles/StonePort.png'
   , blankLandTexture: 'Catan/Land%20Tiles/BlankLand.png'
   , blankPortTexture: 'Catan/Land%20Tiles/BlankPort.png'
   , blankLetDiscTexture: 'Catan/Number%tiles/BlankNum'
  };
  CONFIG.Cards.documentClass = FCCards;
});

/**
 * Add array of possible tiebreakers to combat when it is created
 */
  Hooks.on("createCombat", (combat, opts, ID) => addTiebreaker(combat));
 // Hooks.on("hotbarDrop", (bar, data, slot) => macros.create5eMacro(data, slot));

/**
 * Clear Discard pile on combat turn end
 */