const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});


function handleLocation(sender, receiver, location, callback){

  var jsonObjectToStore = { location: location };

  lib.utils.storage.set(sender, jsonObjectToStore, (err, result) => {
    if (err) {
      return callback(err);
    }


    return callback(null, location + " is saved as your location.");


  });

}


/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "toronto", callback) => {

    return handleLocation("6472701402", "12262123518", message, callback);

};
