let responseText = function (phoneNum, msg, data){

  //msg
  var jsonData = JSON.parse(data);

  var newMsg = "";

  //1 -> list
  if(msg == "1"){
    msg = "";

    for(var i = 0; i < jsonData.length; i++){
      var clinic = jsonData[i];

      var location = clinic.location;
      var dist = clinic.dist;
      var name = clinic.clinic_name;
      var waitTime = clinic.wait_time;
      var hours = waitTime / 60;
      var minutes = waitTime % 60;

      msg += i + ". " + name + "\n";
      msg += "Location: " + location + "\n";
      msg += "Distance: " + dist + "\n";
      msg += "---------------------------\n\n";
    }

  }
  //2 -> book apt
  else if(msg == "2"){
    msg = "";

    var c = -1;
    if(/*book apt == 1*/){
      c = 0;
    }else if(/*book apt == 2*/){
      c = 1;
    }else if(/*book apt == 3*/){
      c = 2;
    }else{
      msg = "Error: not a valid clinic. Enter a clinic number between 1 and 3.";
    }

    var clinic = jsonData[c];

    var location = clinic.location;
    var dist = clinic.dist;
    var name = clinic.clinic_name;
    var waitTime = clinic.wait_time;
    var hours = waitTime / 60;
    var minutes = waitTime % 60;
    var totalPatients = Math.random() * 40 + ranking;

    msg += "Your appointment has been booked at " + name + ".\n";
    msg += "The location is: " + location + ".\n";
    msg += "Your current wait time is: " + hours + " hours and " + minutes + " minutes.\n";
    msg += "You are queued: " + totalPatients + "/" + totalPatients + ".\n";

  }
  //3 -> cancel
  else if(msg == "3"){

    msg = "Your booking has been cancelled.";

  }
  //4 -> check show apt
  else if(msg == "4"){

    var ranking = Math.random() * 40;
    var totalPatients = Math.random() * 40 + ranking;
    var waitTime = Math.random() * 40;
    var hours = waitTime / 60;
    var minutes = waitTime % 60;

    msg = "Your current wait time is: " + hours + " hours and " + minutes + " minutes. You are queued: " + ranking + "/" + totalPatients + ".\n";

  }
  //5 -> help
  else if(msg == "5"){
    msg = "Type 'list' to get list of nearby clinics and their wait times.\n"
    + "Type 'book apt <insert appointment number>' to book an appointment.\n"
    + "Type 'cancel' to cancel your appointment.\n"
    + "Type 'show apt' to see your booked appointment.\n";

  }
  //error message
  else{

    msg = "Error: not a valid command. Type "help" for a list of commands.";

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
