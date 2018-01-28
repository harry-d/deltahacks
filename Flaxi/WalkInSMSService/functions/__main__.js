function text(phoneNum, msg){



}

const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});
/**
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
*/
module.exports = (sender = '6472701402', receiver = '12262123518', message = 'received message', createdDatetime = '', context, callback) => {

  lib.messagebird.tel.sms({
    originator:  receiver,
    recipient: sender,
    body: message + " " + receiver + " " + sender
  }, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });

};
