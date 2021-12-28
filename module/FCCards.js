export class FCCards extends Cards {
   
    async deal(to, number=1, {action="deal", how=0, updateData={}, chatNotification=true}={}) {

        // Validate the request
        if ( !to.every(d => d instanceof Cards) ) {
        throw new Error("You must provide an array of Cards documents as the destinations for the Cards#deal operation");
        }

        // Draw from the sorted stack
        const total = number * to.length;
        const drawn = this._drawCards(total, how);

        // Allocate cards to each destination
        const toCreate = to.map(() => []);
        const toUpdate = [];
        const toDelete = [];
        for ( let i=0; i<total; i++ ) {
        const n = i % to.length;
        const card = drawn[i];
        const createData = foundry.utils.mergeObject(card.toObject(), updateData);
        if ( !createData.origin ) createData.origin = this.id;
        toCreate[n].push(createData);
        if ( card.isHome ) toUpdate.push({_id: card.id, drawn: true});
        else toDelete.push(card.id);
        }

        /**
         * A hook event that fires when Cards are dealt from a deck to other hands
         * @function dealCards
         * @memberof hookEvents
         * @param {Cards} origin                The origin Cards document
         * @param {Cards[]} destinations        An array of destination Cards documents
         * @param {object} context              Additional context which describes the operation
         * @param {string} context.action       The action name being performed, i.e. "deal", "pass"
         * @param {object[][]} context.toCreate   An array of Card creation operations to be performed in each destination Cards document
         * @param {object[]} context.fromUpdate   Card update operations to be performed in the origin Cards document
         * @param {object[]} context.fromDelete   Card deletion operations to be performed in the origin Cards document
         *
         */
        const allowed = Hooks.call("dealCards", this, to, {
        action: action,
        toCreate: toCreate,
        fromUpdate: toUpdate,
        fromDelete: toDelete
        });
        if ( allowed === false ) {
        console.debug(`${vtt} | The Cards#deal operation was prevented by a hooked function`);
        return this;
        }

        // Perform database operations
        const promises = to.map((cards, i) => {
        return cards.createEmbeddedDocuments("Card", toCreate[i], {keepId: true})
        });
        promises.push(this.updateEmbeddedDocuments("Card", toUpdate));
        promises.push(this.deleteEmbeddedDocuments("Card", toDelete));
        await Promise.all(promises);

        // Create string with info about updates
        // (this addition is why overriding is necessary)
        // make smarter later
        let updStr = "";
        this.cards.contents.forEach( c => updStr += `${updStr}<br>${c.name}`); 

        // Dispatch chat notification
        if ( chatNotification ) {
        const chatActions = {
            deal: "CARDS.NotifyDeal",
            pass: "CARDS.NotifyPass"
        }
        this._postChatNotification(this, chatActions[action], {number, link: to.map(t => t.link).join(", "), updStr});
        }
        return this;
    }

    /* -------------------------------------------- */

  /**
   * Display a dialog which prompts the user to play a specific Card to some other Cards document
   * @see {@link Cards#pass}
   * @param {Card} card     The specific card being played as part of this dialog
   * @returns {Promise<Cards>}
   */
  async playDialog(card) {
    const cards = game.cards.filter(c => (c !== this) && (c.type !== "deck") && c.testUserPermission(game.user, "LIMITED"));
    if ( !cards.length ) return ui.notifications.warn("CARDS.PassWarnNoTargets", {localize: true});

    // Construct the dialog HTML
    const html = await renderTemplate("templates/cards/dialog-play.html", {card, cards});

    // Display the prompt
    return Dialog.prompt({
      title: game.i18n.localize("CARD.Play"),
      label: game.i18n.localize("CARD.Play"),
      content: html,
      callback: html => {
        const form = html.querySelector("form.cards-dialog");
        const fd = new FormDataExtended(form).toObject();
        const to = game.cards.get(fd.to);
        const updStr = card.name;
        const options = {action: "play", updateData: fd.down ? {face: null} : {}, updStr};
        return this.pass(to, [card.id], options).catch(err => {
          ui.notifications.error(err.message);
          return this;
        });
      },
      rejectClose: false,
      options: {jQuery: false}
    });
  }

    /* -------------------------------------------- */

  /**
   * Pass an array of specific Card documents from this document to some other Cards stack.
   * @param {Cards} to                Some other Cards document that is the destination for the pass operation
   * @param {string[]} ids            The embedded Card ids which should be passed
   * @param {object} [updateData={}]  Modifications to make to each Card as part of the pass operation,
   *                                  for example the displayed face
   * @param {string} [action=pass]    The name of the action being performed, used as part of the dispatched Hook event
   * @param {boolean} [chatNotification=true] Create a ChatMessage which notifies that this action has occurred
   * @returns {Promise<Card[]>}       An array of the Card embedded documents created within the destination stack
   */
   async pass(to, ids, {updateData={}, action="pass", chatNotification=true}={}) {
    if ( !(to instanceof Cards) ) {
      throw new Error("You must provide a Cards document as the recipient for the Cards#pass operation");
    }

    // Allocate cards to different required operations
    const toCreate = [];
    const toUpdate = [];
    const fromUpdate = [];
    const fromDelete = [];

    // Validate the provided cards
    for ( let id of ids ) {
      const card = this.cards.get(id, {strict: true});
      if ( card.data.drawn ) throw new Error(`You may not pass Card ${id} which has already been drawn`);

      // Return drawn cards to their origin deck
      if ( card.data.origin === to.id ) {
        toUpdate.push({_id: card.id, drawn: false});
      }

      // Create cards in a new destination
      else {
        const createData = foundry.utils.mergeObject(card.toObject(), updateData);
        if ( !createData.origin ) createData.origin = this.id;
        toCreate.push(createData);
      }

      // Update cards in their home deck
      if ( card.isHome ) fromUpdate.push({_id: card.id, drawn: true});

      // Remove cards from their current stack
      else fromDelete.push(card.id);
    }

    /**
     * A hook event that fires when Cards are passed from one stack to another
     * @function passCards
     * @memberof hookEvents
     * @param {Cards} origin                The origin Cards document
     * @param {Cards} destination           The destination Cards document
     * @param {object} context              Additional context which describes the operation
     * @param {string} context.action       The action name being performed, i.e. "pass", "play", "discard", "draw"
     * @param {object[]} context.toCreate     Card creation operations to be performed in the destination Cards document
     * @param {object[]} context.toUpdate     Card update operations to be performed in the destination Cards document
     * @param {object[]} context.fromUpdate   Card update operations to be performed in the origin Cards document
     * @param {object[]} context.fromDelete   Card deletion operations to be performed in the origin Cards document
     *
     */
    const allowed = Hooks.call("passCards", this, to, {action, toCreate, toUpdate, fromUpdate, fromDelete});
    if ( allowed === false ) {
      console.debug(`${vtt} | The Cards#pass operation was prevented by a hooked function`);
      return [];
    }

    // Perform database operations
    const created = to.createEmbeddedDocuments("Card", toCreate, {keepId: true});
    await Promise.all([
      created,
      to.updateEmbeddedDocuments("Card", toUpdate),
      this.updateEmbeddedDocuments("Card", fromUpdate),
      this.deleteEmbeddedDocuments("Card", fromDelete)
    ]);

    // Dispatch chat notification
    if ( chatNotification ) {
      const chatActions = {
        pass: "CARDS.NotifyPass",
        play: "CARDS.NotifyPlay",
        discard: "CARDS.NotifyDiscard",
        draw: "CARDS.NotifyDraw"
      }
      const chatFrom = action === "draw" ? to : this;
      const chatTo = action === "draw" ? this : to;
      let updStr = "";
      let newCards = await created;
      newCards.forEach( c => updStr += `${updStr}<br>${c.name}`); 
      this._postChatNotification(chatFrom, chatActions[action], {number: ids.length, link: chatTo.link, updStr});
    }
    return created;
  }

}
    