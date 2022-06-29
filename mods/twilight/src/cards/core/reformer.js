
    if (card == "reformer") {

      this.game.state.events.reformer = 1;

      if (this.game.player == 2) {
        return 0;
      }
      if (this.game.player == 1) {
        //If the event card has a UI component, run the clock for the player we are waiting on
        this.startClock();

        var twilight_self = this;
        twilight_self.playerFinishedPlacingInfluence();

        let influence_to_add = (this.game.state.vp < 0)? 6: 4;

        this.addMove("resolve\treformer");
        this.updateStatus(`<div class="status-message" id="status-message">${twilight_self.cardToText(card)}: Add ${influence_to_add} influence in Europe (max 2 per country)</div>`);

        var ops_placed = {};

        for (var i in twilight_self.countries) {
          if (this.countries[i].region == "europe") {
            ops_placed[i] = 0;
            $("#"+i).addClass("easterneurope");  
          }
        }

        $(".easterneurope").off();
        $(".easterneurope").on('click', function() {

          let c = $(this).attr('id');

          if (ops_placed[c] >= 2) {
            twilight_self.displayModal("Invalid Placement");
          } else {
            ops_placed[c]++;
            twilight_self.placeInfluence(c, 1, "ussr");
            twilight_self.addMove("place\tussr\tussr\t"+c+"\t1");

            influence_to_add--;

            if (influence_to_add == 0) {
              twilight_self.playerFinishedPlacingInfluence();
              twilight_self.endTurn();
            }
            twilight_self.updateStatus(`<div class="status-message" id="status-message">${twilight_self.cardToText(card)}: Add ${influence_to_add} influence in Europe (max 2 per country)</div>`);
          }
        });
         
        return 0;
      }

      
    }


