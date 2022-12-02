const SaitoUser = require('./../../../lib/saito/ui/templates/saito-user.template');

module.exports = (app, mod, tweet) => {
  let txmsg = tweet.tx.msg;
  let optional = tweet.tx.optional;
  let notice = "";
  let publickey = tweet.tx.transaction.from[0].add || "";
  let text = txmsg.data.text || "";
  let flagged =  optional.flagged ||  null;
  let link_properties =  optional.link_properties ||  null;
  let num_likes =  optional.num_likes ||  0;
  let num_replies =  optional.num_replies ||  0;
  let num_retweets = optional.num_retweets || 0;
  let parent_id = optional.parent_id || "";
  let dt = app.browser.formatDate(tweet.tx.transaction.ts);
  
  if (text == "" && tweet.retweet_tx != "") {
    //
    // set tweet preview
    //

    //
    // set notice
    // 
    notice = "retweeted by " + app.browser.returnAddressHTML(tweet.tx.transaction.from[0].add);
  }

  let userline = "posted on " + dt.month + " " + dt.day + ", " + dt.year + " at  " + dt.hours + ":" + dt.minutes;

  return `
        <div class="tweet" id="tweet-${tweet.tx.transaction.sig}">
          <div class="tweet-notice">${notice}</div>
          <div class="tweet-header">

            ${SaitoUser(app, publickey, userline)}

          </div>
          <div class="tweet-body">
            <div class="tweet-sidebar">
            </div>
            <div class="tweet-main">
              <div class="tweet-text">${text}</div>
              <div class="tweet-preview tweet-previous-${tweet.tx.transaction.sig}">

              </div>
              <div class="tweet-controls">
                <div class="tweet-tool tweet-tool-comment">
                  <span class="tweet-tool-comment-count">${num_replies}</span> <i class="far fa-comment"></i>
                </div>
                <div class="tweet-tool tweet-tool-retweet"><span class="tweet-tool-retweet-count">${num_retweets}</span>
                  <i class="fa fa-repeat"></i>
                </div>
                <div class="tweet-tool tweet-tool-like"><span class="tweet-tool-like-count  ">${num_likes}</span> <i
                    class="far fa-heart"></i></div>
                <div class="tweet-tool tweet-tool-share "><i class="fa fa-arrow-up-from-bracket"></i>
                </div>
                <div class="tweet-tool tweet-tool-flag"><i class="fa fa-flag"></i></div>
              </div>
            </div>
          </div>
        </div>
  `;
}



