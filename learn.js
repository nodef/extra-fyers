const https = require('https');
const fs = require('fs');

const UROOT = 'https://api.fyers.in/api/v2/';



// Make an HTTP request.
function httpsRequest(url, options, data) {
  return new Promise((fres, frej) => {
    var req = https.request(url, options, res => {
      var data = '';
      res.setEncoding('utf8');
      res.on('error', frej);
      res.on('data',  chunk => data += chunk);
      res.on('end',   () => { res.data = data; fres(res); });
    });
    req.on('error', frej);
    req.write(data);
    req.end();
  });
}

// Make an HTTPS GET request.
function httpsGet(url, options) {
  var opts = Object.assign({method: 'GET'}, options);
  return httpsRequest(url, opts, '');
}

function httpsPost(url, options, data) {
  var type = 'application/json';
  var text = JSON.stringify(data);
  var size = text.length.toString();
  var hdrs = Object.assign({'Content-Type': type, 'Content-Length': size}, options.headers);
  var opts = Object.assign({method: 'POST', headers: hdrs});
  return httpsRequest(url, opts, text);
}




// var qs  = new URLSearchParams(query).toString();
async function main() {
  // https://api.fyers.in/api/v2/generate-authcode?client_id=sample_client_id&  redirect_uri=sample_redirect_uri&response_type=code&state=sample_state
  var query = {client_id: 'LALZPZQHYL-100', redirect_uri: 'https://extra-fyers.glitch.me/', response_type: 'code', state: '123'};
  var qs    = new URLSearchParams(query).toString();
  var res   = await httpsGet('https://api.fyers.in/api/v2/generate-authcode?'+qs, {});
  var {statusCode, statusMessage, headers, data} = res;
  console.log(statusCode, statusMessage, headers);
  fs.writeFileSync('response.log', data);
}
main();
