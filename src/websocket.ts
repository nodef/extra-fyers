import {WebSocket} from "./_websocket";
import {Response, Authorization} from "./http";
export {WebSocket} from "./_websocket";
export {Authorization} from "./http";




// CONSTANTS
// =========

/** Root URL for Market data notifications. */
export const MARKET_DATA_URL: string  = "wss://api.fyers.in/socket/v2/dataSock";
/** Root URL for Order update notifications. */
export const ORDER_UPDATE_URL: string = "wss://api.fyers.in/socket/v2/orderSock";
/** Base query string for Market data notifications. */
const MARKET_DATA_QUERY:string  = "user-agent=fyers-api&type=symbolUpdate";
/** Base query string for Order update notifications. */
const ORDER_UPDATE_QUERY:string = "user-agent=fyers-api&type=orderUpdate";




// ORDER-UPDATE
// ------------

/** Update for order placed by the user in the current trading day. */
export interface OrderUpdate {
  /** The unique order id assigned for each order. */
  id: string,
  /** The order id provided by the exchange. */
  exchOrdId: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** Fytoken is a unique identifier for every symbol. */
  fyToken: string,
  /** The segment this order is placed in. */
  segment: string,
  /** Exchange instrument type. */
  instrument: string,
  /** The type of order. */
  type: number,
  /** The order is buy or sell. */
  side: number,
  /** The product type. */
  productType: string,
  /** The status of the order. */
  status: number,
  /** The order number and status of the order. */
  orderNumStatus: string,
  /** True when placing AMO order. */
  offlineOrder: boolean,
  /** The original order qty. */
  qty: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  filledQty: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** Disclosed quantity. */
  discloseQty: number,
  /** Remaining disclosed quantity. */
  dqQtyRem: number,
  /** Day or IOC. */
  orderValidity: string,
  /** The order time as per DD-MMM-YYYY hh:mm:ss in IST. */
  orderDateTime: string,
  /** The parent order id will be provided only for applicable orders. */
  parentId?: string,
  /** The average traded price for the order. */
  tradedPrice: number,
  /** This is used to sort the orders based on the time. */
  slNo: number,
  /** The error messages are shown here. */
  message: string,
}


/** String notification on order update. */
export interface OrderUpdateNotification extends Notification {
  /** Websocket type [1]. */
  ws_type?: number,
  /** Data for the notification. */
  d?: OrderUpdate,
}




// TYPES
// =====

// NOTIFICATION
// ------------

/** Common notification format. */
export type Notification = Response;




// MARKET-DATA HEADER
// ------------------

/** Size of header in binary message. */
const HEADER_SIZE   = 24;
/** Offset of header in binary message. */
const HEADER_OFFSET = 0;


/** Header for each binary message. */
export interface Header {
  /** Fytoken is a unique identifier for every symbol. */
  token: BigInt,
  /** Timestamp sent by exchange (UNIX epoch). */
  tt: number,
  /** 7202: OI data (NSE FO/CD, MCX), 7207/7208: NSE, BSE (indices/data), 31038: MCX. */
  fyCode: number,
  /** Market status flag? */
  marketStat: number,
  /** Packet length, including header? */
  pktlen: number,
  /** Has L2 data (market depth)? */
  L2: number,
}


function toHeader(x: DataView, i: number): Header {
  return {
    token:       x.getBigUint64(i + 0),
    tt:          x.getUint32(i + 8),
    fyCode:      x.getUint16(i + 12),
    marketStat:  x.getUint16(i + 14),
    pktlen:      x.getUint16(i + 16),
    L2:          x.getUint8(i + 18),
  };
}

function writeHeader(a: Header, x: DataView, i: number): void {
  a.token      = x.getBigUint64(i + 0);
  a.tt         = x.getUint32(i + 8);
  a.fyCode     = x.getUint16(i + 12);
  a.marketStat = x.getUint16(i + 14);
  a.pktlen     = x.getUint16(i + 16);
  a.L2         = x.getUint8(i + 18);
}




// MARKET-DATA OI-DATA
// -------------------

/** Size of OI data in binary message. */
const OI_DATA_SIZE   = 8;
/** Offset of OI data in binary message. */
const OI_DATA_OFFSET = HEADER_SIZE;

/** Open interest data (fyCode === 7202). */
export interface OiData {
  /** Open interest. */
  oi: number,
  /** Previous day open interest. */
  pdoi: number,
}


function toOiData(x: DataView, i: number): OiData {
  return {
    oi:   x.getUint32(i + 0),
    pdoi: x.getUint32(i + 4),
  };
}

function writeOiData(a: CommonData, x: DataView, i: number): void {
  a.oi   = BigInt(x.getUint32(i + 0));
  a.pdoi = BigInt(x.getUint32(i + 4));
}




// MARKET-DATA COMMON-DATA
// -----------------------

/** Size of common data in binary message. */
const COMMON_DATA_SIZE = 64;
/** Offset of common data in binary message. */
const COMMON_DATA_OFFSET = HEADER_SIZE;

/** Common data (fyCode !== 7202). */
export interface CommonData {
  /** Price conversion, divisor for all prices. */
  price_conv: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  ltp: number,
  /** Price at market opening time. */
  open_price: number,
  /** Highest price for the day. */
  high_price: number,
  /** Lowest price for the day. */
  low_price: number,
  /** Close price of the previous trading day. */
  prev_close_price: number,
  /** Open price (1 minute). */
  o: number,
  /** High price (1 minute). */
  h: number,
  /** Low price (1 minute). */
  l: number,
  /** Close price (1 minute). */
  c: number,
  /** Volume (1 minute). */
  v: BigInt,
  /** Open interest. */
  oi: BigInt,
  /** Previous day open interest. */
  pdoi: BigInt,
}


function toCommonData(x: DataView, i: number): CommonData {
  return {
    price_conv: x.getUint32(i + 0),
    ltp:        x.getUint32(i + 4),
    open_price: x.getUint32(i + 8),
    high_price: x.getUint32(i + 12),
    low_price:  x.getUint32(i + 16),
    prev_close_price: x.getUint32(i + 20),
    o:    x.getUint32(i + 24),
    h:    x.getUint32(i + 28),
    l:    x.getUint32(i + 32),
    c:    x.getUint32(i + 36),
    v:    x.getBigUint64(i + 40),
    oi:   x.getBigUint64(i + 48),
    pdoi: x.getBigUint64(i + 56),
  };
}

function writeCommonData(a: CommonData, x: DataView, i: number): void {
  a.price_conv = x.getUint32(i + 0);
  a.ltp        = x.getUint32(i + 4);
  a.open_price = x.getUint32(i + 8);
  a.high_price = x.getUint32(i + 12);
  a.low_price  = x.getUint32(i + 16);
  a.prev_close_price = x.getUint32(i + 20);
  a.o    = x.getUint32(i + 24);
  a.h    = x.getUint32(i + 28);
  a.l    = x.getUint32(i + 32);
  a.c    = x.getUint32(i + 36);
  a.v    = x.getBigUint64(i + 40);
  a.oi   = x.getBigUint64(i + 48);
  a.pdoi = x.getBigUint64(i + 56);
}




// MARKET-DATA L1-DATA
// -------------------

/** Minimum size of L1 data in binary message. */
const L1_DATA_SIZE   = 32;
/** Offset of L1 data in binary message. */
const L1_DATA_OFFSET = HEADER_SIZE + COMMON_DATA_SIZE;

/** Additional data (fyCode === 7208, 31038). */
export interface L1Data {
  /** Last traded quantity. */
  LTQ: number,
  /** Last traded time (UNIX epoch). */
  L2_LTT: number,
  /** Average traded price. */
  ATP: number,
  /** Today's volume. */
  volume: number,
  /** Total buy quantity. */
  tot_buy: BigInt,
  /** Total sell quantity. */
  tot_sell: BigInt,
  /** Highest bid price. */
  bid: number,
  /** Lowest ask price. */
  ask: number,
}


function toL1Data(x: DataView, i: number, bidAsk: boolean): L1Data {
  return {
    LTQ:      x.getUint32(i + 0),
    L2_LTT:   x.getUint32(i + 4),
    ATP:      x.getUint32(i + 8),
    volume:   x.getUint32(i + 12),
    tot_buy:  x.getBigUint64(i + 16),
    tot_sell: x.getBigUint64(i + 24),
    bid: bidAsk? x.getUint32(i + 32) : 0,
    ask: bidAsk? x.getUint32(i + 36) : 0,
  };
}

function writeL1Data(a: L1Data, x: DataView, i: number, bidAsk: boolean): void {
  a.LTQ      = x.getUint32(i + 0);
  a.L2_LTT   = x.getUint32(i + 4);
  a.ATP      = x.getUint32(i + 8);
  a.volume   = x.getUint32(i + 12);
  a.tot_buy  = x.getBigUint64(i + 16);
  a.tot_sell = x.getBigUint64(i + 24);
  if (!bidAsk) return;
  a.bid = x.getUint32(i + 32);
  a.ask = x.getUint32(i + 36);
}




// MARKET-DATA L2-DATA
// -------------------

/** Open buy/sell orders at a particular price (L2 === 1). */
export interface L2MarketOffer {
  /** Bid/ask price. */
  price: number,
  /** Bid/ask volume. */
  volume: number,
  /** Number of orders. */
  ord: number,
}


/** Size of L2 data in binary message. */
const L2_DATA_SIZE   = 120;
/** Offset of L1 data in binary message. */
const L2_DATA_OFFSET = HEADER_SIZE + COMMON_DATA_SIZE + L1_DATA_SIZE;

/** Market depth data, 5 rows (L2 === 1). */
export interface L2Data {
  /** Bidding price along with volume and total number of orders. */
  bids: L2MarketOffer[],
  /** Offer price with volume and total number of orders. */
  asks: L2MarketOffer[],
}


function toL2MarketOffer(x: DataView, i: number): L2MarketOffer {
  return {
    price:  x.getUint32(i + 0),
    volume: x.getUint32(i + 4),
    ord:    x.getUint32(i + 8),
  };
}

function toL2Data(x: DataView, i: number): L2Data {
  var bids = [], asks = [];
  for (var i = 0; i < 60; i += 12) {
    bids.push(toL2MarketOffer(x, i));
    asks.push(toL2MarketOffer(x, i + 60));
  }
  return {bids, asks};
}

function writeL2Data(a: L2Data, x: DataView, i: number): void {
  var bids = [], asks = [];
  for (var i = 0; i < 60; i += 12) {
    bids.push(toL2MarketOffer(x, i));
    asks.push(toL2MarketOffer(x, i + 60));
  }
  a.bids = bids;
  a.asks = asks;
}




// MARKET-DATA
// -----------

/** Split Market data (oi/quote/depth) for symbols subscribed by the user. */
interface SplitMarketData extends Header {
  /** Open interest data (fyCode === 7202). */
  oi_data: OiData | null,
  /** Common data (fyCode !== 7202). */
  common_data: CommonData | null,
  /** Additional data (fyCode === 7208, 31038). */
  l1_data: L1Data | null,
  /** Market depth data, 5 rows (L2 === 1). */
  l2_data: L2Data | null,
}

/** Market data (oi/quote/depth) for symbols subscribed by the user. */
export interface MarketData extends Header, CommonData, L1Data, L2Data {}


function toSplitMarketData(x: DataView, i: number): SplitMarketData {
  var fyCode = x.getUint16(i + 12);
  var L2     = x.getUint8(i + 18);
  return {
    token:       x.getBigUint64(i + 0),
    tt:          x.getUint32(i + 8),
    fyCode:      x.getUint16(i + 12),
    marketStat:  x.getUint16(i + 14),
    pktlen:      x.getUint16(i + 16),
    L2:          x.getUint8(i + 18),
    oi_data:     fyCode === 7202? toOiData(x, i + OI_DATA_OFFSET) : null,
    common_data: fyCode !== 7202? toCommonData(x, i + COMMON_DATA_OFFSET) : null,
    l1_data:     fyCode === 7208 || fyCode === 31038? toL1Data(x, i + L1_DATA_OFFSET, L2 !== 1) : null,
    l2_data:     L2 === 1? toL2Data(x, i + L2_DATA_OFFSET) : null,
  };
}

function writeMarketData(a: MarketData, x: DataView, i: number): void {
  writeHeader(a, x, i + HEADER_OFFSET);
  if (a.fyCode === 7202) writeOiData(a, x, i + OI_DATA_OFFSET);
  else writeCommonData(a, x, i + COMMON_DATA_OFFSET);
  if (a.fyCode === 7208 || a.fyCode === 31038) writeL1Data(a, x, i + L1_DATA_OFFSET, a.L2 !== 1);
  if (a.L2 === 1) writeL2Data(a, x, i + L2_DATA_OFFSET);
}

function toMarketData(x: DataView, i: number): MarketData {
  var a: MarketData = {
    // HEADER
    token: BigInt(0),
    tt: 0,
    fyCode: 0,
    marketStat: 0,
    pktlen: 0,
    L2: 0,
    // COMMON DATA
    price_conv: 0,
    ltp: 0,
    open_price: 0,
    high_price: 0,
    low_price: 0,
    prev_close_price: 0,
    o: 0,
    h: 0,
    l: 0,
    c: 0,
    v: BigInt(0),
    oi: BigInt(0),
    pdoi: BigInt(0),
    // L1 DATA
    LTQ: 0,
    L2_LTT: 0,
    ATP: 0,
    volume: 0,
    tot_buy: BigInt(0),
    tot_sell: BigInt(0),
    bid: 0,
    ask: 0,
    // L2 DATA
    bids: null,
    asks: null,
  };
  writeMarketData(a, x, i);
  return a;
}


/** Binary notification on Market data. */
export interface MarketDataNotification extends Notification {
  /** Data for the notification. */
  d?: MarketData,
}




// FUNCTIONS
// =========

/**
 * Notified function.
 * @param notification notification
 */
export type NotifiedFunction = (notification: Notification) => void;

/**
 * Order update notified function.
 * @param notification notification
 */
export type OrderUpdateNotifiedFunction = (notification: OrderUpdateNotification) => void;

/**
 * Market data notified function.
 * @param notification notification
 */
export type MarketDataNotifiedFunction = (notification: MarketDataNotification) => void;




// ORDER-UPDATE
// ------------

/**
 * Connect to Order update URL with WebSocket.
 * @param auth authorization {app_id, access_token}
 * @param fn notified function
 * @returns WebSocket connection
 */
export function connectOrderUpdate(auth: Authorization, fn: OrderUpdateNotifiedFunction): WebSocket {
  var {app_id, access_token} = auth;
  var query = `${ORDER_UPDATE_QUERY}&access_token=${app_id}:${access_token}`;
  var conn  = new WebSocket(`${ORDER_UPDATE_URL}?${query}`);
  conn.onmessage = e => {
    if (typeof e.data !== "string") return;
    if (e.data !== "pong") fn(JSON.parse(e.data));
  };
  return conn;
}


/**
 * Subscribe to order update.
 * @param conn websocket connection
 */
export function subscribeOrderUpdate(conn: WebSocket): void {
  var req = {T: "SUB_ORD", SLIST: ["orderUpdate"], SUB_T: 1};
  conn.send(JSON.stringify(req));
}


/**
 * Unsubscribe to order update.
 * @param conn websocket connection
 */
export function unsubscribeOrderUpdate(conn: WebSocket): void {
  var req = {T: "SUB_ORD", SLIST: ["orderUpdate"], SUB_T: 0};
  conn.send(JSON.stringify(req));
}




// MARKET-DATA
// -----------

/**
 * Connect to Market data URL with WebSocket.
 * @param auth authorization {app_id, access_token}
 * @param fn notified function
 * @returns WebSocket connection
 */
export function connectMarketData(auth: Authorization, fn: MarketDataNotifiedFunction): WebSocket {
  var {app_id, access_token} = auth;
  var query = `${MARKET_DATA_QUERY}&access_token=${app_id}:${access_token}`;
  var conn  = new WebSocket(`${MARKET_DATA_URL}?${query}`);
  conn.onmessage = e => {
    if (typeof e.data === "string") {
      if (e.data !== "pong") fn(JSON.parse(e.data));
    }
    else {
      var binary = new DataView(e.data as ArrayBuffer);
      fn({s: "ok", d: toMarketData(binary, 0)});
    }
  };
  return conn;
}


/**
 * Subscribe to market quote.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export function subscribeMarketQuote(conn: WebSocket, symbols: string[]): void {
  var req = {T: "SUB_DATA", TLIST: symbols, SUB_T: 1};
  conn.send(JSON.stringify(req));
}


/**
 * Subscribe to market depth.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export function subscribeMarketDepth(conn: WebSocket, symbols: string[]): void {
  var req = {T: "SUB_L2", L2LIST: symbols, SUB_T: 1};
  conn.send(JSON.stringify(req));
}


/**
 * Unsubscribe to market quote.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export function unsubscribeMarketQuote(conn: WebSocket, symbols: string[]): void {
  var req = {T: "SUB_DATA", TLIST: symbols, SUB_T: 0};
  conn.send(JSON.stringify(req));
}


/**
 * Unsubscribe to market depth.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export function unsubscribeMarketDepth(conn: WebSocket, symbols: string[]): void {
  var req = {T: "SUB_L2", L2LIST: symbols, SUB_T: 0};
  conn.send(JSON.stringify(req));
}
