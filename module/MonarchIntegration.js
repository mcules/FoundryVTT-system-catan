export default class MonarchIntegration {
	static init() {
		Hooks.on("getMonarchHandComponents", this.getMonarchComponents.bind(this));
		Hooks.on("getMonarchHandComponents", this.getMonarchHandComponents.bind(this));

		Hooks.on("getMonarchCardComponents", this.getMonarchComponents.bind(this));

		Hooks.on("clickMonarchCard", this.clickMonarchCard.bind(this));
	}

	static getMonarchComponents(monarch, components) {
		const basic = components.controls.find(control => control.class == "basic-controls");
		if (basic) basic.controls = [
			this.spend,
			this.playCard,
		];

		components.contextMenu.push(...this.getPassControls());
		components.cardClasses.push(card => `fcatan-${card.data.suit}`);
	}


	static getMonarchHandComponents(monarch, components) {
		components.appControls.length = 0;
		components.appControls.push(...this.getResourceControls(), this.drawDevelopment);

		components.cardClasses.push(
			// For resources, add the fcatan-selected class if the card is selected
			card => card.data.suit == "resource" && card.getFlag("fcatan", "selected") ? "fcatan-selected" : ""
		);
	}

	static clickMonarchCard(event, monarch, card) {
		if (monarch.constructor.name != "MonarchHand") return true;
		
		if (card.data.suit == "resource") {
			if (!event.ctrlKey) return true;
			const selected = Boolean(card.getFlag("fcatan", "selected"));
			card.setFlag("fcatan", "selected", !selected);
			return false;
		}

		return true;
	}

	static getPassControls() {
		return game.cards.filter(cards => cards.type == "hand")
			.map((hand, i) => ({
				class: `pass-card-${i}`,
				icon: "fas fa-share-square",
				label: `Pass to ${hand.name}`,
				hide: (card, pile) => card.data.suit !== "resource" || pile == hand,
				onclick: (event, card, pile) => this.passCard(card, hand, pile),
			}))
	}

	static getResourceControls() {
		return this.resources.map(resource => ({
			class: `produce-${resource.toLowerCase()}`,
			icon: `fcatan-icon ${resource.toLowerCase()}`,
			label: `${resource}`,
			tooltip: `Produce ${resource}`,
			onclick: (event, monarch, hand) => this.produceResource(hand, resource)
		}));
	}

	static drawDevelopment = {
		class: `draw-development`,
		icon: `fcatan-icon development`,
		label: `Development`,
		tooltip: `Draw Development Card`,
		onclick: (event, monarch, hand) => this.buyDevelopment(hand)
	}

	static spend = {
		class: "spend-resource",
		icon: "fas fa-coins",
		label: card => `Spend ${card.data.name}`,
		hide: card => card.data.suit !== "resource",
		onclick: this.spendResource.bind(this)
	}

	static playCard = {
		class: "play-card",
		icon: "fas fa-chevron-circle-right",
		label: card => `Activate ${card.data.name}`,
		hide: card => card.data.suit !== "development" && card.data.suit !== "knight",
		onclick: this.playDevelopmentCard.bind(this)
	}

	static async spendResource(event, card, hand) {
		const updateData = { "flags.fcatan.selected": false }
		// If not selected, just spend the card
		if (!card.getFlag("fcatan", "selected")) return await card.pass(Monarch.discardPile, { updateData });

		// Otherwise spend all the selected cards
		const cards = hand.cards.filter(card => card.getFlag("fcatan", "selected"));
		for (let card of cards) await card.pass(Monarch.discardPile, { updateData });
	}
	static async playDevelopmentCard(event, card, hand) {
		return await card.pass(Monarch.discardPile);
	}
	static async passCard(card, target, hand) {
		const updateData = { "flags.fcatan.selected": false }
		
		// If not selected, just pass the card
		if (!card.getFlag("fcatan", "selected")) return await card.pass(target, { updateData });

		// Otherwise pass all the selected cards
		const cards = hand.cards.filter(card => card.getFlag("fcatan", "selected"));
		for (let card of cards) await card.pass(target, { updateData });
	}
	static produceResource(hand, resource) {
		hand.draw(this[`${resource.toLowerCase()}Pile`]);
	}
	static buyDevelopment(hand) {
		hand.draw(this.developmentPile);
	}

	static get resources() {
		return ["Brick", "Grain", "Lumber", "Ore", "Wool"];
	}

	static get brickPile() {
		return game.cards.getName("Bricks");
	}
	static get grainPile() {
		return game.cards.getName("Grain");
	}
	static get lumberPile() {
		return game.cards.getName("Lumber");
	}
	static get orePile() {
		return game.cards.getName("Ore");
	}
	static get woolPile() {
		return game.cards.getName("Wool");
	}
	static get developmentPile() {
		return game.cards.getName("Development Cards");
	}
}