const os = require('os');
const fs = require('fs');
const fyers = require('./index.js');




function readFile(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n/g, '\n');
}

function writeFile(pth, d) {
  var d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


async function main() {
  var app_id = readFile('app_id.log').trim();
  var access_token = readFile('access_token.log').trim();
  var auth = {app_id, access_token};
  var res  = await fyers.userProfile(auth);
  console.log(res);
}
main();
