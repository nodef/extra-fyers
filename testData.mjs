import fs from "fs";
import WebSocket from "ws";

const app_id       = fs.readFileSync("app_id.log", "utf8").trim();
const access_token = fs.readFileSync("access_token.log", "utf8").trim();
const DATA_URL     = "wss://api.fyers.in/socket/v2/dataSock";
const DATA_QUERY   = "user-agent=fyers-api&type=symbolUpdate";
const REQUEST_L1   = {"T": "SUB_DATA", "TLIST":  ["NSE:SBIN-EQ", "NSE:FCONSUMER-EQ"], "SUB_T": 1};
const REQUEST_L2   = {"T": "SUB_L2",   "L2LIST": ["NSE:SBIN-EQ", "NSE:FCONSUMER-EQ"], "SUB_T": 1};




function mainDataUsingOn() {
  var url = `${DATA_URL}?${DATA_QUERY}&access_token=${app_id}:${access_token}`;
  var ws  = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.on('error', (err) => {
    console.error("Error:", err);
  });
  ws.on('close', (code, reason) => {
    console.log("Closed:", code, reason);
  });
  ws.on('open', () => {
    console.log("Opened:");
    ws.send(JSON.stringify(REQUEST_L2));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  });
  ws.on('message', (data, isBinary) => {
    if (!isBinary) console.log('Message:', data.toString());
    else console.log('Binary message:', data.byteLength);
  });
}


function mainDataUsingProperty() {
  var url = `${DATA_URL}?${DATA_QUERY}&access_token=${app_id}:${access_token}`;
  var ws  = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onerror = (err) => {
    console.error("Error:", err);
  };
  ws.onclose = (code, reason) => {
    console.log("Closed:", code, reason);
  };
  ws.onopen = () => {
    console.log("Opened.");
    ws.send(JSON.stringify(REQUEST_L2));
    setInterval(() => ws.send(JSON.stringify('ping')), 5000);
  };
  ws.onmessage = (e) => {
    if (typeof e.data==='string') console.log('Message:', e.data);
    else console.log('Binary message:', new DataView(e.data).byteLength);
  };
}
mainDataUsingProperty();
