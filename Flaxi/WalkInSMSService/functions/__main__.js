//
let responseText = function (phoneNum, oldMsg, data){

  //msg
  var jsonData = JSON.parse(data);

  var msg = "";

  //1 -> list
  if(oldMsg == "1"){

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
      msg = msg + "Address: " +  address.substring(0, address.substring(0, address.lastIndexOf(',')).lastIndexOf(','))+ "\n";
      msg = msg + "Distance: " + dist[0] + ".\n";
      msg = msg + "Travel Time: About " + dist[1] + ".\n";
      msg = msg + "Wait Time: ";
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

      msg = msg + "----------------------------------------------\n\n";
    }

  }
  //2 -> book apt
  else if(oldMsg == "2"){

    /*
    book apt 2

    jsonData[2]



    */
  }
  //3 -> cancel
  else if(oldMsg == "3"){

    msg = "Cancelled booking";

  }
  //4 -> check wait time
  else if(oldMsg == "4"){

    var ranking = Math.random() * 40;
    var totalPatients = Math.random() * 40 + ranking;
    var waitTime = Math.random() * 40;

    msg = "Total wait time is: " + waitTime + " You are queued: " + ranking + "/" + totalPatients;

  }
  //5 -> help
  else if(oldMsg == "5"){

    msg = "Type 'list' to get list of appointments." + "\n"
    + "Type 'book apt <insert appointment number>' to book an appointment." + "\n"
    + "Type 'cancel' to cancel appointment." + "\n"
    + "Type 'wait time' to get wait time and queue status" + "\n";

  }
  //error message
  else {
    msg = "ERRORRRRRRRRRRRRRRRRRRRRR";
  }

  return msg;

}

const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});

/**
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
*/
module.exports = (sender = '6472701402', receiver = '12262123518', message = '1', createdDatetime = '', context, callback) => {

  lib['nim-wijetunga'].patient['@dev']({location: 'Toronto', numResults: 2}, (err, results) => {

    lib.messagebird.tel.sms({
      originator:  receiver,
      recipient: sender,
      body: responseText(sender, message, JSON.stringify(results, null, 2))
    }, (err, result) => {

      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });

  });


};
