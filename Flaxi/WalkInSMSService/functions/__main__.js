//
let responseText = function (phoneNum, msg, data){

  //msg
  var jsonData = JSON.parse(data);

  var newMsg = "";

  //1 -> list
  if(msg == "1"){

    for(var i = 0; i < jsonData.length; i++){
      var clinic = jsonData[i];

      var location = clinic.location;
      var dest = clinic.dest;
      var dist = clinic.dist;
      var name = clinic['clinic name'];

      msg = msg + i + ". " + name + "\n";
      msg = msg + "Location: " + location + "\n";
      msg = msg + "Destination: " + dest + "\n";
      msg = msg + "Distance: " + dist + "\n";
      msg = msg + "---------------------------\n\n";
    }

  }
  //2 -> book apt
  else if(msg == "2"){

    /*
    book apt 2

    jsonData[2]



    */
  }
  //3 -> cancel
  else if(msg == "3"){

    msg = "Cancelled booking";

  }
  //4 -> check wait time
  else if(msg == "4"){

    var ranking = Math.random() * 40;
    var totalPatients = Math.random() * 40 + ranking;
    var waitTime = Math.random() * 40;

    msg = "Total wait time is: " + waitTime + " You are queued: " + ranking + "/" + totalPatients;

  }
  //5 -> help
  else if(msg == "5"){

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
