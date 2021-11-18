function simplelyValidEmail(str){
  return /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/.test(str)
}
function strictlyValidEmail(str){
  return /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/.test(str)
}
module.exports = simplelyValidEmail;
module.exports = strictlyValidEmail;