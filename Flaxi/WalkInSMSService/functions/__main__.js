//msg

const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});

function handleList(sender, receiver, message, callback) {
  lib.utils.storage.get(sender, (err, aptData) => {
    if(err){
      return callback(err);
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

      lib.messagebird.tel.sms({
        originator:  receiver,
        recipient: sender,
        body: msg
      }, (err, result) => {

        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    });
  });
};

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

      var msg = "";
      msg += "Appt. at " + name + ".\n";
      msg += "Location at: " + address.substring(0, address.substring(0, address.lastIndexOf(',')).lastIndexOf(',')) + ".\n";
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
      msg += "Queued: " + totalPatients + " out of " + totalPatients + ".\n";

      lib.messagebird.tel.sms({
        originator:  receiver,
        recipient: sender,
        body: msg
      }, (err, result) => {

        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    });
  })
}

function handleCancel(sender, receiver, message, callback){
    var msg = "Your booking has been cancelled.";
    return callback(null, msg);
}

function handleShow(sender, receiver, message, callback){
  lib.utils.storage.get(sender, (err, aptData) => {
    if(err){
      return callback(err);
    }

    var ranking = Math.floor(Math.random() * 40) + 1;
    var totalPatients = Math.floor(Math.random() * 40) + ranking;
    var waitTime = Math.floor(Math.random() * 40);
    var hours = Math.floor(waitTime / 60);
    var minutes = waitTime - 60 * hours;

    var msg = "Your current wait time is: ";

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

     lib.messagebird.tel.sms({
       originator:  receiver,
       recipient: sender,
       body: msg
     }, (err, result) => {

       if (err) {
         return callback(err);
       }
       return callback(null, result);
     });
   });
}

function handleHelp(sender, receiver, message, callback){
  var msg = "Type 'list' to get list of nearby clinics and their wait times.\n\n"
  + "Type 'book apt <insert appointment number>' to book an appointment.\n\n"
  + "Type 'cancel' to cancel your appointment.\n\n"
  + "Type 'show apt' to see your booked appointment.\n\n";

  lib.messagebird.tel.sms({
    originator:  receiver,
    recipient: sender,
    body: msg
  }, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
}

function handleLocation(sender, receiver, location, callback){

  var jsonObjectToStore = { location: location };

  lib.utils.storage.set(sender, jsonObjectToStore, (err, result) => {
    if (err) {
      return callback(err);
    }

    lib.messagebird.tel.sms({
      originator:  receiver,
      recipient: sender,
      body: location + " is saved as your location."
    }, (err, result) => {

      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  });

}
/**
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
*/
module.exports = (sender = '6472701402', receiver = '12262123518', message = 'book apt 2', createdDatetime = '', context, callback) => {

    if(message.toLowerCase().includes("list")) {
        return handleList(sender, receiver, message, callback);
      }
    else if(message.toLowerCase().includes("book apt")){
        return handleBook(sender, receiver, message, callback);
    }
   else if(message.toLowerCase().includes("cancel")){
        return handleCancel(sender, receiver, message, callback);
   }
   else if(message.toLowerCase().includes("show apt")){
        return handleShow(sender, receiver, message, callback);
   }
   else if(message.toLowerCase().includes("help")){
        return handleHelp(sender, receiver, message, callback);
   }
   else{
        return handleLocation(sender, receiver, message, callback);
   }
};
