import WebSocket from "ws";

const app_id = '****';
const access_token = '****';

function mainData() {
  var n = 0;
  var url = `wss://api.fyers.in/socket/v2/dataSock?access_token=${app_id}:${access_token}&user-agent=fyers-api&type=symbolUpdate`;
  var ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onerror = e => { console.error(`Error!`) };
  ws.on('error', (err) => {
    console.error(err);
  });
  ws.on('close', (code, reason) => {
    console.log(`Closed!`, code, reason);
  });
  ws.on('open', () => {
    console.log(`Opened!`);
    var data = {"T": "SUB_L2", "L2LIST": ["NSE:SBIN-EQ", "NSE:FCONSUMER-EQ"], "SUB_T": 1};
    //var data = {"T": "SUB_DATA", "TLIST": ["NSE:SBIN-EQ", "NSE:FCONSUMER-EQ"], "SUB_T": 1};
    ws.send(JSON.stringify(data));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  });
  ws.on('message', (data, isBinary) => {
    if (!isBinary) { console.log('MEssage', data.toString()); return; }
    console.log('Binary message!');
    console.log(data.byteLength);
    if (++n == 20) ws.close();
  });
}

function mainOrder() {
  var n = 0;
  var url = `wss://api.fyers.in/socket/v2/orderSock?access_token=${app_id}:${access_token}&user-agent=fyers-api&type=orderUpdate`;
  var ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onerror = e => { console.error(`Error!`) };
  ws.on('error', (err) => {
    console.error(err);
  });
  ws.on('close', (code, reason) => {
    console.log(`Closed!`, code, reason);
  });
  ws.on('open', () => {
    console.log(`Opened!`);
    var data = {"T": "SUB_ORD", "SLIST": ["orderUpdate"], "SUB_T": 1};
    ws.send(JSON.stringify(data));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  });
  ws.on('message', (data, isBinary) => {
    if (!isBinary) { console.log('MEssage', data.toString()); return; }
    console.log('Binary message!');
    console.log(data.byteLength);
    if (++n == 20) ws.close();
  });
}


function mainDataWeb() {
  var n = 0;
  var url = `wss://api.fyers.in/socket/v2/dataSock?access_token=${app_id}:${access_token}&user-agent=fyers-api&type=symbolUpdate`;
  var ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onerror = (err) => {
    console.error(err);
  };
  ws.onclose = (code, reason) => {
    console.log(`Closed!`, code, reason);
  };
  ws.onopen = () => {
    console.log(`Opened!`);
    var data = {"T": "SUB_L2", "L2LIST": ["NSE:SBIN-EQ", "NSE:FCONSUMER-EQ"], "SUB_T": 1};
    ws.send(JSON.stringify(data));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  };
  ws.onmessage = (e) => {
    if (typeof e.data==='string') { console.log('MEssage', e.data); return; }
    console.log('Binary message!',  );
    var view = new DataView(e.data);
    console.log(view.byteLength);
    if (++n == 20) ws.close();
  };
}

function mainOrderWeb() {
  var n = 0;
  var url = `wss://api.fyers.in/socket/v2/orderSock?access_token=${app_id}:${access_token}&user-agent=fyers-api&type=orderUpdate`;
  var ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onerror = (err) => {
    console.error(err);
  };
  ws.onclose = (code, reason) => {
    console.log(`Closed!`, code, reason);
  };
  ws.onopen = () => {
    console.log(`Opened!`);
    var data = {"T": "SUB_ORD", "SLIST": ["orderUpdate"], "SUB_T": 1};
    ws.send(JSON.stringify(data));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  };
  ws.onmessage = (e) => {
    console.log(typeof e.data);
    if (typeof e.data==='string') { console.log('MEssage', e.data); return; }
    console.log('Binary message!', typeof e.data);
    var view = new DataView(e.data);
    console.log(view.byteLength);
    if (++n == 20) ws.close();
  };
}
mainDataWeb();
