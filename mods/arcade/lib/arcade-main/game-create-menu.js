const saito = require('./../../../../lib/saito/saito');
const GameCreateMenuTemplate= require('./templates/game-create-menu.template');
const ArcadeGamesFullListOverlayTemplate = require('./../arcade-sidebar/arcade-games-full-list-overlay.template');
const SaitoOverlay = require('./../../../../lib/saito/ui/saito-overlay/saito-overlay');
const ModalRegisterUsername = require('./../../../../lib/saito/ui/modal-register-username/modal-register-username');
const ArcadeGameDetails = require('./../arcade-game/arcade-game-details');
module.exports = GameCreateMenu = {


  render(app, mod) {

    mod.overlay.show(app, mod, GameCreateMenuTemplate());

    let games_menu = document.querySelector(".arcade-games");
    games_menu.innerHTML = "";
    app.modules.respondTo("arcade-games").forEach(module => {
      let title = (module.gamename)? module.gamename: module.name;
      let status = (module.status)? `<div class="tiptext">This game is: ${module.status}.</div>`: "";
      games_menu.innerHTML += `<li class="arcade-navigator-item tip" id="${module.name}">${title}${status}</li>`;
    });
  },

  
  attachEvents(app, mod) {

    if (!document.getElementById("games-add-game") && !document.getElementById("arcade-games")) { return; }

    if (app.modules.returnModule("AppStore") != null) {
      document.getElementById("games-add-game").onclick = () => {
        let appstore_mod = app.modules.returnModule("AppStore");
        if (appstore_mod) {
          let options = { search : "" , category : "Entertainment" , featured : 1 };
          appstore_mod.openAppstoreOverlay(options);
        }
      };
    }
    Array.from(document.getElementsByClassName('arcade-navigator-item')).forEach(game => {
      game.addEventListener('click', (e) => {
        let gameName = e.currentTarget.id;
        app.browser.logMatomoEvent("Arcade", "ArcadeSidebarInviteCreateClick", gameName);
        let doGameDetails = () => {
          let tx = new saito.default.transaction();
          tx.msg.game = gameName;
          ArcadeGameDetails.render(app, mod, tx);
          ArcadeGameDetails.attachEvents(app, mod, tx);
        }
        /*
        // Skip registration prompt
        //
        if (app.keys.returnIdentifierByPublicKey(app.wallet.returnPublicKey()) == "") {
          if (app.options.wallet.anonymous != 1) {
            mod.modal_register_username = new ModalRegisterUsername(app, doGameDetails);
            mod.modal_register_username.render(app, mod);
            mod.modal_register_username.attachEvents(app, mod);
            return;
          }
        }*/
        doGameDetails();
      });
    });
  }
}



