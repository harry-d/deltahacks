const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});



function handleShow(sender, receiver, message, callback){
  lib.utils.storage.get(sender, (err, aptData) => {
    if(err){
      return callback(err);
    }

    var ranking = Math.floor(aptData.ranking);
    var totalPatients = aptData.totalPatients;
    var waitTime = aptData.waitTime;
    var hours = Math.floor(waitTime / 60);
    var minutes = waitTime - 60 * hours;

    var msg = "Your current wait time is ";

    if(hours == 0 && minutes == 0){
      msg = msg + "is now!";
    }
    else if(hours == 0 && minutes > 1){
      msg = msg + minutes + " minutes. \n";
    }
    else if(hours == 0 && minutes == 1 ){
      msg = msg + "1 minute. \n";
    }
    else if(minutes == 0 && hours > 1){
      msg = msg + hours + " hours. \n";
    }
    else if(minutes == 0 && hours == 1){
      msg = msg + "1 hour. \n";
    }
    else if(hours == 1){
      msg = msg + hours + " hour and " + minutes + " minutes. \n";
    }
    else if(minutes == 1){
      msg = msg + hours + " hours and " + minutes + " minute. \n";
    }
    else {
      msg = msg + hours + " hours and " + minutes + " minutes. \n";
    }
     msg = msg + "You are queued: " + ranking + "/" + totalPatients + ".\n";

      return callback(null, msg);
   });
}

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "test", callback) => {

    return handleShow("6472701402", "12262123518", message, callback);

};
