const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});

function handleList(sender, receiver, message, callback) {
  lib.utils.storage.get(sender, (err, aptData) => {
    if(err){
      return callback(err);
    }

    if(aptData == null){
      return callback(null, "You did not select a location.");
    }

    lib['nim-wijetunga'].patient['@dev']({location: aptData.location, numResults: 2}, (err, results) => {

      var jsonData = JSON.parse(JSON.stringify(results, null, 2));

      var msg = "";


      for(var i = 0; i < jsonData.length; i++){
        var clinic = jsonData[i];

        var location = clinic.location;
        var address = clinic.address_dest;
        var dist = clinic.dist;
        var name = clinic.clinic_name;
        var waitTime = clinic.wait_time;
          var hours = Math.floor(waitTime / 60);
          var minutes = waitTime - 60 * hours;

        msg = msg + (i + 1) + ". " + name + "\n";
        msg = msg + "Address is " +  address.substring(0, address.substring(0, address.lastIndexOf(',')).lastIndexOf(','))+ ", ";
        msg = msg + dist[0] + " away.\n";
        msg = msg + "Travel Time is About " + dist[1] + ".\n";
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

      }

      return callback(null, msg);
    });
  });
};
/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "test", callback) => {

    return handleList("6472701402", "12262123518", message, callback);

};
