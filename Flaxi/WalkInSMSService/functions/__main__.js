//
let responseText = function (phoneNum, msg){

  //1 -> book msg
  if(msg == "1"){

     return msg;
  }
  //2 -> cancel message
  else if(msg == "2"){

    return msg + " asdsakdjhaslkaslkhdj";
  }
  //3 -> check wait time
  else if(msg == "3"){

  }
  //4 -> help
  else if(msg == "4"){

  }
  //error message
  else {

  }

  return 'nothing';

}

const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});

/**
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
*/
module.exports = (sender = '6472701402', receiver = '12262123518', message = '2', createdDatetime = '', context, callback) => {

  lib.messagebird.tel.sms({
    originator:  receiver,
    recipient: sender,
    body: responseText(sender, message)
  }, (err, result) => {
    console.log(result);
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });

};
