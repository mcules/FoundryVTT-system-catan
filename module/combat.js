/**
 * Add tiebreaker to Combat prototype
 */
 
 Combat.prototype.tiebreakers = function() {
    var tbArray = [];

    for(var i = 0; i < game.users.size; i++) {
        tbArray.push(i);
    }
    shuffleArray(tbArray);
    return(tbArray);
}

/**
 * Override the default Initiative formula to customize special behaviors of the system.
 * Catan initiative is simple, but ties are not allowed so a simple unique tiebreaker is added.
 * See Combat._getInitiativeFormula for more detail.
 * @returns {string}  Final initiative formula for the actor.
 */
 export const _getInitiativeFormula = function() {
    const actor = this.actor;
    if ( !actor ) return "2d6";
    const actorData = actor.data.data;
    const rollData = actor.getRollData();

    return Roll.create(formula, rollData);
};

/**
 * Define how the array of Combatants is sorted in the displayed list of the tracker.
 * This method can be overridden by a system or module which needs to display combatants in an alternative order.
 * By default sort by initiative, next falling back to name, lastly tie-breaking by combatant id.
 * Catan overrides this by adding a randomly determined unique tiebreaker to each combatant when added and sorting on that.
 * This tiebreaker value is a unique ordinal equal to or less than the total number of registered users, chosen without replacement. 
 */
//TODO: Check parameter syntax.
 export const _sortCombatants = function(a, b) {
    const ia = Number.isNumeric(a.initiative) ? a.initiative : -9999;
    const ib = Number.isNumeric(b.initiative) ? b.initiative : -9999;
    const ci = ib - ia;
    if ( ci !== 0 ) return ci;
    const atb = this.tiebreakers[0];
    const btb = this.tiebreakers[1];
    tbArray.splice(0,2);
    return atb > btb ? 1 : -1;
}

/**
 * Generic private function to randomize the order of an existing array.
*/   
function shuffleArray(array) {
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