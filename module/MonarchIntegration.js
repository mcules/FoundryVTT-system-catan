export default class MonarchIntegration {
	static init() {
		Hooks.on("getMonarchHandComponents", this.getMonarchComponents.bind(this));
		Hooks.on("getMonarchHandComponents", this.getMonarchApplicationComponents.bind(this));
		Hooks.on("getMonarchCardComponents", this.getMonarchComponents.bind(this));
	}

	static getMonarchComponents(monarch, components) {
		const basic = components.controls.find(control => control.class == "basic-controls");
		if (basic) basic.controls = [
			this.spend,
			this.playCard,
		];

		components.contextMenu.push(...this.getPassControls());
	}


	static getMonarchApplicationComponents(monarch, components) {
		console.log(components.appControls);
		components.appControls.length = 0;
		components.appControls.push(...this.getResourceControls(), this.drawDevelopment);
	}

	static getPassControls() {
		return game.cards.filter(cards => cards.type == "hand")
			.map((hand, i) => ({
				class: `pass-card-${i}`,
				icon: "fas fa-share-square",
				label: card => `Pass ${card.data.name} to ${hand.name}`,
				hide: (card, pile) => card.data.suit !== "resource" || pile == hand,
				onclick: (event, card, pile) => this.passCard(card, hand),
			}))
	}

	static getResourceControls() {
		return this.resources.map(resource => ({
			class: `produce-${resource.toLowerCase()}`,
			icon: `catan-icon ${resource.toLowerCase()}`,
			label: `${resource}`,
			tooltip: `Produce ${resource}`,
			onclick: (event, monarch, hand) => this.produceResource(hand, resource)
		}));
	}

	static drawDevelopment = {
		class: `draw-development`,
		icon: `catan-icon development`,
		label: `Development`,
		tooltip: `Draw Development`,
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
		hide: card => card.data.suit == "resource" || card.data.suit == "victory",
		onclick: this.playDevelopmentCard.bind(this)
	}

	static spendResource(event, card, hand) {
		card.pass(Monarch.discardPile);
	}
	static playDevelopmentCard(event, card, hand) {
		card.pass(Monarch.discardPile);
	}
	static passCard(card, hand) {
		card.pass(hand);
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