const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});



function handleHelp(sender, receiver, message, callback){
  var msg = "Say 'list' to get list of nearby clinics and their wait times.\n\n"
  + "Say 'book apt insert appointment number' to book an appointment.\n\n"
  + "Say 'cancel' to cancel your appointment.\n\n"
  + "Say 'show apt' to see your booked appointment.\n\n"
  + "Say any location to search for nearby clinics.\n\n";

      return callback(null, msg);
}

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "test", callback) => {

    return handleHelp("6472701402", "12262123518", message, callback);

};
