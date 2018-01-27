const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});
/**
* responding to a message from a patient
* @param {string} smsService received message from patient. responding back to patient
* @param {string} patient receiver of the automated response.
* @param {string} message message
* @returns {string}
*/
module.exports = (smsService = '12262123518', patient = '6472701402', message = 'received message', context, callback) => {

  //creat message that sends to smsService to patient
  lib.messagebird.tel.sms({
    originator:  smsService,
    recipient: patient,
    body: 'message received. sending message back'
  }, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });

};
