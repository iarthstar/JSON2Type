exports.capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

exports.isArray = (obj) => Object.prototype.toString.call(obj) === "[object Array]";

exports.typeof = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

exports.padStr = (str, len) => str.padEnd(len);