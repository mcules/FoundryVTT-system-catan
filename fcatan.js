/**
 * The minimal possible Foundry game system.
 * Author: Norc
 */

// Import Modules
// Import Modules
import { addTiebreaker } from "./module/combat.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */




/**
 * Init hook.
 */
Hooks.once("init", async function() {

  console.log(`CATAN | Initializing Founders of Catan System`);

  //set CONFIGs and define any non-optional things as basically as possible here.
  CONFIG.Combat.initiative.formula = '2d6';
  //TODO: define
  CONFIG.Catan.waterTexture = 'Catan/Land%20Tiles/Water.png';
  CONFIG.Catan.desertTexture = 'Catan/Land%20Tiles/Desert-1.png'

});

/**
 * Add array of possible tiebreakers to combat when it is created
 */
 
 Hooks.on("createCombat", (combat, opts, ID) => addTiebreaker(combat));
 // Hooks.on("hotbarDrop", (bar, data, slot) => macros.create5eMacro(data, slot));

 //TODO: Convert from Pseudocode
 //Hooks.on("createCombat") { init array with all tiles with water texture. Opacity blue = port. Opacity black = land }
 //Store array in combat.
 //Shuffle appropriate sized tile decks and set images accordingly.
 //If possible, place number tiles also, skipping deserts.