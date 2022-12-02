const LeagueRankingsTemplate = require("./rankings.template");

class LeagueRankings {
	
  constructor(app, mod, container="") {
    this.app = app;
    this.mod = mod;
    this.container = container;

    app.connection.on('league-update', (obj) => {
console.log("league update processed here!");
    });


  }

  render() {

    //
    // insert content we will render into
    //
    if (document.querySelector(".league-rankings")) {
      this.app.browser.replaceElementBySelector(LeagueRankingsTemplate(), ".league-rankings");
    } else {
      if (this.container) {
        this.app.browser.addElementToSelector(LeagueRankingsTemplate(), this.container);
      } else {
        this.app.browser.addElementToDom(LeagueRankingsTemplate());
      }
    }


    //
    // add content to league rankings
    //
    let leagues = this.mod.filterLeagues(this.app);
    let html = "";
    if (leagues.length > 0){
      let cnt = 0;
      leagues.forEach(l => {
        if (l.myRank > 0) {
          html += `
	    <div id="league_${l.id}" class="saito-table-row league-leaderboard-ranking${(cnt%2 == 1)?" odd":""}">
              <div class="saito-table-gamename">${l.name}</div>
              <div class="saito-table-rank">${l.myRank}</div>
            </div>
                  `;
        }
      });
      leagues.forEach(l => {
        if (l.myRank <= 0) {
          html += `
	    <div id="league_${l.id}" class="saito-table-row league-leaderboard-ranking${(cnt%2 == 1)?" odd":""}">
              <div class="saito-table-gamename">${l.name}</div>
              <div class="saito-table-rank saito-deemphasize">…</div>
            </div>`;
        }
      });
    }
    this.app.browser.addElementToSelector(html, ".league-rankings .saito-table");


    this.attachEvents();
  }

  attachEvents() {

  }

};

module.exports = LeagueRankings;

