import { shuffleArray } from "./norc.js";

/**
 * Add array of possible tiebreakers to combat when it is created
 */

export function addTiebreaker(combat) {
 console.log('CATAN | Attempting to add tiebreaker to combat:');
 console.log(combat);
 combat.tiebreaker = [0.1,0.2,0.3,0.4,0.5,0.6];
 shuffleArray(combat.tiebreaker);
}

/**
 * Override the default Initiative formula to customize special behaviors of the system.
 * Catan initiative is simple, but ties are not allowed so a simple unique tiebreaker is added.
 * See Combat._getInitiativeFormula for more detail.
 * @returns {string}  Final initiative formula for the actor.

 export const _getInitiativeFormula = function() {
    const actor = this.actor;
    if ( !actor ) {
        console.log (`CATAN | No actor detected`);
        return CONFIG.Combat.initiative.formula;
    }
    const actorData = actor.data.data;
    const rollData = actor.getRollData();

    return Roll.create(formula, rollData);
}; */

/**
 * Define how the array of Combatants is sorted in the displayed list of the tracker.
 * This method can be overridden by a system or module which needs to display combatants in an alternative order.
 * By default sort by initiative, next falling back to name, lastly tie-breaking by combatant id.
 * Catan overrides this by adding a randomly determined unique tiebreaker to each combatant when added and sorting on that.
 * This tiebreaker value is a unique ordinal equal to or less than the total number of registered users, chosen without replacement. 
 */

// TODO:    Either figure out how to actually override this function, or figure out a way to add the tiebreaker to the initiative (better).
//          Perhaps override the roll initiative function itself?
 export const _sortCombatants = function(a, b) {
    console.log(`CATAN | Sorting combatants`);
    const ia = Number.isNumeric(a.initiative) ? a.initiative : -9999;
    const ib = Number.isNumeric(b.initiative) ? b.initiative : -9999;
    const ci = ib - ia;
    if ( ci !== 0 ) return ci;
    a.initiative = a.initiative + this.tiebreaker[0];
    b.initiative = b.initiative + this.tiebreaker[1];
    this.tiebreaker.splice(0,2);
    return atb > btb ? 1 : -1;
}