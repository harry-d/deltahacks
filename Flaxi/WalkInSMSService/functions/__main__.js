const lib = require('lib');
/**
* A basic Hello World function
* @param {string} sender who is sending msg
* @param {string} receiver who is receiving  msg
* @param {string} message message
* @returns {string}
*/
module.exports = (sender = '12262860336', receiver = '6472701402', message = 'received message', context, callback) => {

  lib.messagebird.tel.sms({
    originator:  receiver,
    recipient: sender,
    body: 'message received. sending message back'
  }, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });

};
