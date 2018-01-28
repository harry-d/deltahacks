const lib = require('lib')({token:'m2RTVxgdm8r835hLA-l5VERydWYBPjF1FMzKuInbSwNYoA9b_LRO3ly9cQBR7C88'});




function handleCancel(sender, receiver, message, callback){
    var msg = "Your booking has been cancelled.";
    lib.utils.storage.set(sender, null, (err, results) => {
        return callback(null, msg);
    });
}

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} message message
* @returns {string}
*/
module.exports = (message = "test", callback) => {

    return handleCancel("6472701402", "12262123518", message, callback);

};
