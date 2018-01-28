const lib = require('lib');

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} name Your name
* @returns {string}
*/
module.exports = (name = 'World', callback) => {

  return callback(null, `I am another endpoint ${name}`);

};
