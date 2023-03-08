const Invite = require("./invite");
const JSON = require("json-bigint");

class GameManager {
	constructor(app, mod, container = "") {
		this.app = app;
		this.mod = mod;
		this.container = container;
		this.name = "GameManager";
		this.type = "sparse";
		this.filter = null;
    	// For filtering which games get displayed
		// We may want to only display one type of game invite, so overwrite this before render()
		this.lists = ["over"];
		
		app.connection.on("league-overlay-games-list", (filter)=>{
			this.filter = filter;
			this.render();
		});
	}

	render() {
		//
		// replace element or insert into page (deletes invites for a full refresh)
		//
		let target = this.container + " .game-manager";

		if (document.querySelector(target)) {
			this.app.browser.replaceElementBySelector(`<div class="game-manager"></div>`, target);
		} else {
			this.app.browser.addElementToSelectorOrDom(`<div class="game-manager"></div>`, this.container);
		}

		if (!this.filter) { return; }


		for (let list of this.lists) {
			if (this.mod.games[list]){

				let gameList = this.mod.games[list].filter(game =>{
					//console.log(JSON.parse(JSON.stringify(game)));

					let gametxmsg = game.returnMessage();

					//console.log(JSON.parse(JSON.stringify(gametxmsg)));
					
					if (!gametxmsg) { return false; }
					
					let gameOptions = gametxmsg.options;

					//console.log(JSON.parse(JSON.stringify(gameOptions)));
					
					if (!gameOptions) { return false; }
					
					for (let req in this.filter){
						//console.log(req);
						if (!gameOptions[req] || gameOptions[req] != this.filter[req]){
							return false;
						}
					}
					return true;

				});

				if (gameList.length > 0){
					for (let i = 0; i < gameList.length; i++) {
						let newInvite = new Invite(
							this.app,
							this.mod,
							target,
							this.type,
							gameList[i]
						);
						newInvite.render();	
					}
				}
				
			}
		}

		this.attachEvents();
		this.filter = null;
	}

	attachEvents() {}

}

module.exports = GameManager;