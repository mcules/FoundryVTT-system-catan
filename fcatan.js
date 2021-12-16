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
  CONFIG.Combat.initiative.formula = "2d6";

});

/**
 * Add array of possible tiebreakers to combat when it is created
 */
 
 Hooks.on("createCombat", (combat, opts, ID) => addTiebreaker(combat));
 // Hooks.on("hotbarDrop", (bar, data, slot) => macros.create5eMacro(data, slot));