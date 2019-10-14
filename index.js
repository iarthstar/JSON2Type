const R = require('ramda');
const utils = require('./utils');
const package = require('./package.json');

const transformer = (json) => {
    let name = utils.capitalizeFirstLetter(json.name);
    let type = json.type;

    let len = Object.keys(type).reduce((acc, val) => {
        if(acc >= val.length) return acc;
        else return val.length;
    }, 0);

    len = len % 2 ? len + 1 : len;

    let str = `newtype ${name} = ${name}`;

    Object.keys(type).forEach((key, index, arr) => {
        let keyType = type[key].split('-');
        if(index == 0){
            str += `\n  { `;
            switch( keyType[0] ){
                case "Boolean"  : str += `${utils.padStr(key, len)} :: Boolean`;                break;
                case "String"   : str += `${utils.padStr(key, len)} :: String`;                 break;
                case "Number"   : str += `${utils.padStr(key, len)} :: Number`;                 break;
                case "Object"   : str += `${utils.padStr(key, len)} :: ${ keyType[1] }`;        break;
                case "Array"    : str += `${utils.padStr(key, len)} :: Array ${ keyType[1] }`;  break;
    
                default: console.log(key, type);
            };
        } else if( (index + 1) == arr.length) {
            switch( keyType[0] ){
                case "Boolean"  : str += `\n  , ${utils.padStr(key, len)} :: Boolean`;              break;
                case "String"   : str += `\n  , ${utils.padStr(key, len)} :: String`;               break;
                case "Number"   : str += `\n  , ${utils.padStr(key, len)} :: Number`;               break;
                case "Object"   : str += `\n  , ${utils.padStr(key, len)} :: ${ keyType[1] }`;      break;
                case "Array"    : str += `\n  , ${utils.padStr(key, len)} :: Array ${ keyType[1] }`;break;
    
                default: console.log(key, type);
            };
            str += `\n  }`;
        } else {
            switch( keyType[0] ){
                case "Boolean"  : str += `\n  , ${utils.padStr(key, len)} :: Boolean`;              break;
                case "String"   : str += `\n  , ${utils.padStr(key, len)} :: String`;               break;
                case "Number"   : str += `\n  , ${utils.padStr(key, len)} :: Number`;               break;
                case "Object"   : str += `\n  , ${utils.padStr(key, len)} :: ${ keyType[1] }`;      break;
                case "Array"    : str += `\n  , ${utils.padStr(key, len)} :: Array ${ keyType[1] }`;break;
    
                default: console.log(key, type);
            };
        }
        
    });
    return str;
}

const transpiler = (name, json) => {
    let newJson = {};
    newJson.name = utils.capitalizeFirstLetter(name);
    newJson.type = {};

    Object.keys(json).forEach(key => {
        let type = utils.typeof(json[key]);
        switch(type){
            case "Boolean"  : newJson.type[key] = "Boolean";        break;
            case "String"   : newJson.type[key] = "String";         break;
            case "Number"   : newJson.type[key] = "Number";         break;
            case "Object"   : newJson.type[key] = `Object-${utils.capitalizeFirstLetter(key)}`;  break;
            case "Array"    : newJson.type[key] = `Array-${utils.capitalizeFirstLetter(key)}`;   break;

            default: console.log(key, type);
        }
    });
    return newJson;
};

const json2type = (name, json) => {
    let typedJson = transpiler(name, json);
    let typedStr = transformer(typedJson);
    return typedStr;
}

const typedStr = json2type('package', package);

console.log( typedStr );