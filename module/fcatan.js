/**
 * The minimal possible Foundry game system.
 * Author: Norc
 */

// Import Modules
// Import Modules
import { _getInitiativeFormula } from "./module/combat.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */




/**
 * Init hook.
 */
Hooks.once("init", async function() {

  console.log(`Initializing Founders of Catan System`);
  //set CONFIGs and define any non-optional things as basically as possible here.
});


//add begin combat hook that creates array of possible tiebreaker values (1 integer per registered user) and saves it as a flag on the encounter instance
