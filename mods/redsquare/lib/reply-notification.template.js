
module.exports = (app, mod, tx, txmsg) => {

    let txsig = "";
    let tweet_to_show = txmsg.data.text;
    if (txmsg.data?.parent_id) { txsig = txmsg.data.parent_id; }

    return `
        <div class="tweet notification-item-${tx.transaction.sig} tweet-notif-reply-${txsig}" data-id="${txsig}">
          <div class="tweet-notice"></div>
          <div class="tweet-header">
          </div>
          <div class="tweet-body">
            <div class="tweet-sidebar">
            </div>
            <div class="tweet-main">
              <div class="notification-tweet" id="tweet-${tx.transaction.sig}" data-id="${tx.transaction.sig}">${tweet_to_show}</div>
            </div>
          </div>
        </div>
    `;

}

