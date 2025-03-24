
const names = require("./04-names");
const greet = require("./05-utils");
const data = require("./06-alternative-flavor");
require("./07-mind-grenade"); 

console.log("Imported names:", names);
console.log("Imported alternative data:", data);


greet(names.firstName);
greet(names.lastName);
