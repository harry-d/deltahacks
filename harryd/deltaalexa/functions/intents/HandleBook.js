const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});


function handleBook(sender, receiver, message, callback) {
  lib.utils.storage.get(sender, (err, aptData) => {
    if (err) {
      return callback(err);
    }
    lib['nim-wijetunga'].patient['@dev']({location: aptData.location, numResults: 2}, (err, results) => {
      let clinic = results[parseInt(message.substring(message.length-1)) - 1];

      var address = clinic.address_dest;
      var dist = clinic.dist;
      var name = clinic.clinic_name;
      var waitTime = clinic.wait_time;
        var hours = Math.floor(waitTime / 60);
        var minutes = waitTime - 60 * hours;
      var ranking = Math.random() * 40;
      var totalPatients = Math.floor(Math.random() * 40 + ranking) + 1;

      var newAptData = {addressDest : address, dist : dist, name : name, waitTime : waitTime, ranking : ranking, totalPatients : totalPatients};

      var msg = "";
      msg += "Appointment is at" + name + ".\n";
      msg += "Address is at " + address.substring(0, address.substring(0, address.lastIndexOf(',')).lastIndexOf(',')) + ".\n";
      msg = msg + "Wait Time is ";
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
      msg += "Queued: " + totalPatients + " out of " + totalPatients + ".\n";

        return callback(null, msg);
      });
    });
}

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "test", callback) => {

    return handleBook("6472701402", "12262123518", message, callback);

};
