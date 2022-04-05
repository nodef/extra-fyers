import {HttpRequestOptions} from "./_http";
import {Connection} from "./websocket";
import * as http from "./http";
import * as websocket from "./websocket";




// RE-EXPORT
// =========

export {HttpHeaders, HttpRequestOptions} from "./_http";
export * as http      from "./http";
export * as websocket from "./websocket";




// BASICS
// ======

// ERROR
// -----

const ERROR_DESCRIPTION : Map<number, string> = new Map([
  [-209, "Invalid order id"],
  [-101, "Invalid order type"],
  [-305, "For CO orders only market and limit orders are allowed"],
  [-323, "For BO orders only market and limit orders are allowed"],
  [-308, "Invalid limit price"],
  [-309, "Invalid stop price"],
  [-310, "Invalid order quantity"],
  [-311, "Invalid stop loss price"],
  [-313, "Invalid order side of either buy or sell"],
  [-314, "Invalid product type for the order"],
  [-315, "Invalid price for stop limit order"],
  [-316, "Invalid stop loss price for CO/BO orders"],
  [-323, "Invalid stop loss value"],
  [-325, "Ivalid target value (take_profit)"],
  [-326, "Invalid order validity"],
  [-327, "Invalid order disclosed quantity"],
  [-328, "Invalid order offline flag"],
  [-201, "Connection issue while processing your request"],
  [-202, "Connection timed out"],
  [-204, "Request wasnt processed"],
  [-205, "Market wasnt able to accept or process the request"],
  [-157, "User doesnt exist"],
  [-159, "Invalid order number"],
  [-161, "This order has already been cancelled"],
  [-162, "This order has already traded"],
  [-163, "Order modfication wasnt done successfully"],
  [-164, "This order has already been rejected"],
  [-390, "Invalid stop price"],
  [-392, "Price is not in multiples of tick size"],
  [-353, "API limit exceeded"],
  [-372, "Invalid price"],
  [-397, "Position quantity is zero"],
  [-398, "No open positions"],
  [-399, "No pending orders to be closed/cancelled"],
  [-329, "Please check if exit positions is complete"],
  [-373, "No permission"],
  [-374, "Invalid authorization code (auth_code)"],
  [-371, "Invalid SHA256 hash of (app_id:secret_key)"],
  [-17,  "Invalid access token used for authentication"],
  [-352, "Invalid app id"],
  [-96,  "An unexpected error occurred when processing request"],
  [-351, "Greater than 50 symbols"],
  [-300, "Invalid symbol"],
  [-310, "Invalid symbols"],
  [-301, "Invalid resolution format"],
  [-302, "Invalid historical timestamp from when you require data"],
  [-303, "Invalid historical timestamp till when you require data"],
  [-356, "The range_from value cannot be greater than range_to value"],
  [-334, "Invalid key date format value"],
  [-335, "Historical timestamp from when you require data not in epoch format"],
  [-336, "Historical timestamp till when you require data not in epoch format"],
  [-337, "Historical timestamp from when you require data not in YYYY-MM-DD format"],
  [-338, "Historical timestamp till when you require data not in YYYY-MM-DD format"],
  [-339, "The range cannot be more than 1 year for day resolution"],
  [-341, "The range cannot be more than 100 days for 1 min resolution"],
  [-343, "The range cannot be more than 100 days for 2 min resolution"],
  [-344, "The range cannot be more than 100 days for 3 min resolution"],
  [-345, "The range cannot be more than 100 days for 5 min resolution"],
  [-346, "The range cannot be more than 100 days for 10 min resolution"],
  [-347, "The range cannot be more than 100 days for 15 min resolution"],
  [-348, "The range cannot be more than 100 days for 20 min resolution"],
  [-349, "The range cannot be more than 100 days for 30 min resolution"],
  [-353, "The range cannot be more than 100 days for 60 min resolution"],
  [-354, "The range cannot be more than 100 days for 120 min resolution"],
  [-355, "The range cannot be more than 100 days for 240 min resolution"],
]);


/**
 * Get the error description.
 * @param code error code (-ve)
 * @returns error description
 */
function errorDescription(code: number): string {
  return code < 0? ERROR_DESCRIPTION.get(code) || "Unknown error" : "No error";
}




// YEAR2
// -----

/**
 * Get year2 description.
 * @param code year2 code (YY)
 * @returns year2 description
 */
function year2Description(code: string): string {
  var val = parseInt(code, 10);
  return val > 50? "19" + code : "20" + code;
}

/**
 * Get year2 code.
 * @param desc year2 description
 * @returns year2 code (YY)
 */
function year2(desc: string): string {
  return desc.substring(2);
}




// MONTH3
// ------

const MONTH3_DESCRIPTION: Map<string, string> = new Map([
  ["JAN", "January"],
  ["FEB", "February"],
  ["MAR", "March"],
  ["APR", "April"],
  ["MAY", "May"],
  ["JUN", "June"],
  ["JUL", "July"],
  ["AUG", "August"],
  ["SEP", "September"],
  ["OCT", "October"],
  ["NOV", "November"],
  ["DEC", "December"],
]);


/**
 * Get month3 description.
 * @param code month3 code (MMM)
 * @returns month3 description
 */
function month3Description(code: string): string {
  return MONTH3_DESCRIPTION.get(code);
}

/**
 * Get month3 code.
 * @param desc month3 description
 * @returns month3 code (MMM)
 */
function month3(desc: string): string {
  return desc.substring(0, 3).toUpperCase();
}




// MONTH1
// ------

const MONTH1_DESCRIPTION: Map<string, string> = new Map([
  ["1", "January"],
  ["2", "February"],
  ["3", "March"],
  ["4", "April"],
  ["5", "May"],
  ["6", "June"],
  ["7", "July"],
  ["8", "August"],
  ["9", "September"],
  ["O", "October"],
  ["N", "November"],
  ["D", "December"],
]);

const MONTH1_CODE: Map<string, string> = new Map([
  ["JAN", "1"],
  ["FEB", "2"],
  ["MAR", "3"],
  ["APR", "4"],
  ["MAY", "5"],
  ["JUN", "6"],
  ["JUL", "7"],
  ["AUG", "8"],
  ["SEP", "9"],
  ["OCT", "O"],
  ["NOV", "N"],
  ["DEC", "D"],
]);


/**
 * Get month1 description.
 * @param code month1 code (MMM)
 * @returns month1 description
 */
function month1Description(code: string): string {
  return MONTH1_DESCRIPTION.get(code);
}

/**
 * Get month1 code.
 * @param desc month1 description
 * @returns month1 code (MMM)
 */
function month1(desc: string): string {
  var key = desc.substring(0, 3).toUpperCase();
  return MONTH1_CODE.get(key);
}




// DAY2
// ----

/**
 * Get day2 description.
 * @param code day2 code (DD)
 * @returns day2 description
 */
function day2Description(code: string): string {
  return code.replace(/^0+/, "");
}

/**
 * Get day2 code.
 * @param desc day2 description
 * @returns day2 code (DD)
 */
function day2(desc: string): string {
  return desc.padStart(2, "0");
}




// EXCHANGE
// --------

/** Exchange code. */
export type Exchange = "NSE" | "MCX" | "BSE";

const enum InternalExchange {
  NSE = 10,
  MCX = 11,
  BSE = 12,
}


const TO_EXCHANGE: Map<number, Exchange> = new Map([
  [10, "NSE"],
  [11, "MCX"],
  [12, "BSE"],
]);

const FROM_EXCHANGE: Map<Exchange, number> = new Map([
  ["NSE", 10],
  ["MCX", 11],
  ["BSE", 12],
]);

const EXCHANGE_DESCRIPTION: Map<Exchange, string> = new Map([
  ["NSE", "National Stock Exchange"],
  ["MCX", "Multi Commodity Exchange"],
  ["BSE", "Bombay Stock Exchange"],
]);


function toExchange(x: number): Exchange {
  return TO_EXCHANGE.get(x);
}

function fromExchange(x: Exchange): number {
  return FROM_EXCHANGE.get(x);
}

/**
 * Get exchange description.
 * @param code exchange code (NSE, MCX, BSE)
 * @returns exchange description
 */
 export function exchangeDescription(code: Exchange): string {
  return EXCHANGE_DESCRIPTION.get(code);
}

/**
 * Get exchange code.
 * @param desc exchange description
 * @returns exchange code (NSE, MCX, BSE)
 */
export function exchange(desc: string): Exchange {
  if (/bse|native|bombay|mumbai/i.test(desc)) return "BSE";
  if (/\bcom\b|mcx|multi|commodit/i.test(desc)) return "MCX";
  return "NSE";
}




// SEGMENT
// -------

/** Segment code. */
export type Segment = "CM" | "FO" | "CD" | "COM";

const enum InternalSegment {
  CM  = 10,
  FO  = 11,
  CD  = 12,
  COM = 20,
}


const TO_SEGMENT: Map<number, Segment> = new Map([
  [10, "CM"],
  [11, "FO"],
  [12, "CD"],
  [20, "COM"],
]);

const FROM_SEGMENT: Map<string, number> = new Map([
  ["CM",  10],
  ["FO",  11],
  ["CD",  12],
  ["COM", 20],
]);

const SEGMENT_DESCRIPTION: Map<Segment, string> = new Map([
  ["CM",  "Capital Market"],
  ["FO",  "Equity Derivatives"],
  ["CD",  "Currency Derivatives"],
  ["COM", "Commodity Derivatives"],
]);


function toSegment(x: number): Segment {
  return TO_SEGMENT.get(x);
}

function fromSegment(x: Segment): number {
  return FROM_SEGMENT.get(x);
}

/**
 * Get segment description.
 * @param code segment code (CM, FO, CD, COM)
 * @returns segment description
 */
 export function segmentDescription(code: Segment): string {
  return SEGMENT_DESCRIPTION.get(code);
}

/**
 * Get segment code.
 * @param desc segment description
 * @returns segment code (CM, FO, CD, COM)
 */
export function segment(desc: string): Segment {
  if (/\bcom\b|mcx|multi|commodit/i.test(desc)) return "COM";
  if (/\bcd\b|currenc/i.test(desc)) return "CD";
  if (/\bfn?o\b|fut|opt|deriv/i.test(desc)) return "FO";
  return "CM";
}




// POSITION-SIDE
// -------------

/** Position side code. */
export type PositionSide = "LONG" | "SHORT" | "CLOSED";

const enum InternalPositionSide {
  LONG   =  1,
  SHORT  = -1,
  CLOSED =  0,
}


const TO_POSITION_SIDE: Map<number, PositionSide> = new Map([
  [1,  "LONG"],
  [-1, "SHORT"],
  [0,  "CLOSED"],
]);

const FROM_POSITION_SIDE: Map<PositionSide, number> = new Map([
  ["LONG",   1],
  ["SHORT", -1],
  ["CLOSED", 0],
]);

const POSITION_SIDE_DESCRIPTION: Map<PositionSide, string> = new Map([
  ["LONG",   "Long position"],
  ["SHORT",  "Short position"],
  ["CLOSED", "Closed position"],
]);


function toPositionSide(x: number): PositionSide {
  return TO_POSITION_SIDE.get(x);
}

function fromPositionSide(x: PositionSide): number {
  return FROM_POSITION_SIDE.get(x);
}

/**
 * Get position side description.
 * @param code position side code (LONG, SHORT, CLOSED)
 * @returns position side description
 */
 export function positionSideDescription(code: PositionSide): string {
  return POSITION_SIDE_DESCRIPTION.get(code);
}

/**
 * Get position side code.
 * @param desc position side description
 * @returns position side code (LONG, SHORT, CLOSED)
 */
export function positionSide(desc: string): PositionSide {
  if (/up|buy|long|rally/i.test(desc)) return "LONG";
  if (/down|sell|short|crash/i.test(desc)) return "SHORT";
  return "CLOSED";
}




// ORDER-SIDE
// ----------

/** Order side code. */
export type OrderSide = "BUY" | "SELL";

const enum InternalOrderSide {
  BUY  =  1,
  SELL = -1
}


const TO_ORDER_SIDE: Map<number, OrderSide> = new Map([
  [1,  "BUY"],
  [-1, "SELL"],
]);

const FROM_ORDER_SIDE: Map<OrderSide, number> = new Map([
  ["BUY",   1],
  ["SELL", -1],
]);

const ORDER_SIDE_DESCRIPTION: Map<OrderSide, string> = new Map([
  ["BUY",  "Buy"],
  ["SELL", "Sell"],
]);


function toOrderSide(x: number): OrderSide {
  return TO_ORDER_SIDE.get(x);
}

function fromOrderSide(x: OrderSide): number {
  return FROM_ORDER_SIDE.get(x);
}

/**
 * Get order side description.
 * @param code order side code (BUY, SELL)
 * @returns order side description
 */
 export function orderSideDescription(code: OrderSide): string {
  return ORDER_SIDE_DESCRIPTION.get(code);
}

/**
 * Get order side code.
 * @param desc order side description
 * @returns order side code (BUY, SELL)
 */
export function orderSide(desc: string): OrderSide {
  return /down|sell|short|crash/i.test(desc)? "SELL" : "BUY";
}




// ORDER-SOURCE
// ------------

/** Order source code. */
export type OrderSource = "MOBILE" | "WEB" | "ONE" | "ADMIN" | "API";

const enum InternalOrderSource {
  MOBILE = "M",
  WEB    = "W",
  ONE    = "R",
  ADMIN  = "A",
  API    = "ITS",
}


const TO_ORDER_SOURCE: Map<string, OrderSource> = new Map([
  ["M",   "MOBILE"],
  ["W",   "WEB"],
  ["R",   "ONE"],
  ["A",   "ADMIN"],
  ["ITS", "API"],
]);

const FROM_ORDER_SOURCE: Map<OrderSource, string> = new Map([
  ["MOBILE", "M"],
  ["WEB",    "W"],
  ["ONE",    "R"],
  ["ADMIN",  "A"],
  ["API",    "ITS"],
]);

const ORDER_SOURCE_DESCRIPTION: Map<OrderSource, string> = new Map([
  ["MOBILE", "FYERS Mobile"],
  ["WEB",    "FYERS Web"],
  ["ONE",    "FYERS One"],
  ["ADMIN",  "Admin"],
  ["API",    "FYERS API"],
]);


function toOrderSource(x: string): OrderSource {
  return TO_ORDER_SOURCE.get(x);
}

function fromOrderSource(x: OrderSource): string {
  return FROM_ORDER_SOURCE.get(x);
}

/**
 * Get order source description.
 * @param code order source code (MOBILE, WEB, ONE, ADMIN, API)
 * @returns order source description
 */
 export function orderSourceDescription(code: OrderSource): string {
  return ORDER_SOURCE_DESCRIPTION.get(code);
}

/**
 * Get order source code.
 * @param desc order source description
 * @returns order source code (MOBILE, WEB, ONE, ADMIN, API)
 */
export function orderSource(desc: string): OrderSource {
  if (/its|api|sys/i.test(desc)) return "API";
  if (/one|desk/i.test(desc)) return "ONE";
  if (/mob|app/i.test(desc))  return "MOBILE";
  if (/admin/i.test(desc))    return "ADMIN";
  return "WEB";
}




// ORDER-STATUS
// ------------

/** Order status code. */
export type OrderStatus = "CANCELLED" | "TRADED" | "TRANSIT" | "REJECTED" | "PENDING" | "EXPIRED";

const enum InternalOrderStatus {
  CANCELLED = 1,
  TRADED    = 2,
  UNUSED    = 3,
  TRANSIT   = 4,
  REJECTED  = 5,
  PENDING   = 6,
  EXPIRED   = 7,
}
import IOST = InternalOrderStatus;


const TO_ORDER_STATUS: Map<number, OrderStatus> = new Map([
  [1, "CANCELLED"],
  [2, "TRADED"],
//[3, "UNUSED"],
  [4, "TRANSIT"],
  [5, "REJECTED"],
  [6, "PENDING"],
  [7, "EXPIRED"],
]);

const FROM_ORDER_STATUS: Map<OrderStatus, number> = new Map([
  ["CANCELLED", 1],
  ["TRADED",    2],
//["UNUSED",    3],
  ["TRANSIT",   4],
  ["REJECTED",  5],
  ["PENDING",   6],
  ["EXPIRED",   7],
]);

const ORDER_STATUS_DESCRIPTION: Map<OrderStatus, string> = new Map([
  ["CANCELLED", "Cancelled"],
  ["TRADED",    "Traded / Filled"],
  ["TRANSIT",   "Transit"],
  ["REJECTED",  "Rejected"],
  ["PENDING",   "Pending"],
  ["EXPIRED",   "Expired"],
]);

const ORDER_STATUS_CODE: Map<string, OrderStatus> = new Map([
  ["C", "CANCELLED"],
  ["F", "TRADED"],
  ["T", "TRANSIT"],
  ["R", "REJECTED"],
  ["P", "PENDING"],
  ["E", "EXPIRED"],
]);


function toOrderStatus(x: number): OrderStatus {
  return TO_ORDER_STATUS.get(x);
}

function fromOrderStatus(x: OrderStatus): number {
  return FROM_ORDER_STATUS.get(x);
}

/**
 * Get order status description.
 * @param code order status code (CANCELLED, TRADED, ...)
 * @returns order status description
 */
 export function orderStatusDescription(code: OrderStatus): string {
  return ORDER_STATUS_DESCRIPTION.get(code);
}

/**
 * Get order status code.
 * @param desc order status description
 * @returns order status code (CANCELLED, TRADED, ...)
 */
export function orderStatus(desc: string): OrderStatus {
  var key = desc.charAt(0).toUpperCase();
  if (/traded/i.test(desc)) key = "F";
  return ORDER_STATUS_CODE.get(key);
}




// ORDER-TYPE
// ----------

/** Order type code. */
export type OrderType = "LIMIT" | "MARKET" | "SL_MARKET" | "SL_LIMIT";

const enum InternalOrderType {
  LIMIT     = 1,
  MARKET    = 2,
  SL_MARKET = 3,
  SL_LIMIT  = 4,
}


const TO_ORDER_TYPE: Map<number, OrderType> = new Map([
  [1, "LIMIT"],
  [2, "MARKET"],
  [3, "SL_MARKET"],
  [4, "SL_LIMIT"],
]);

const FROM_ORDER_TYPE: Map<OrderType, number> = new Map([
  ["LIMIT",     1],
  ["MARKET",    2],
  ["SL_MARKET", 3],
  ["SL_LIMIT",  4],
]);

const ORDER_TYPE_DESCRIPTION: Map<OrderType, string> = new Map([
  ["LIMIT",     "Limit order"],
  ["MARKET",    "Market order"],
  ["SL_MARKET", "Stop order (SL-M)"],
  ["SL_LIMIT",  "Stoplimit order (SL-L)"],
]);

const ORDER_TYPE_CODE: Map<string, OrderType> = new Map([
  ["L", "LIMIT"],
  ["M", "MARKET"],
  ["S", "SL_MARKET"],
  ["R", "SL_LIMIT"],
]);


function toOrderType(x: number): OrderType {
  return TO_ORDER_TYPE.get(x);
}

function fromOrderType(x: OrderType): number {
  return FROM_ORDER_TYPE.get(x);
}


/**
 * Get order type description.
 * @param code order type code (LIMIT, MARKET, SL_MARKET, SL_LIMIT)
 * @returns order type description
 */
 export function orderTypeDescription(code: OrderType): string {
  return ORDER_TYPE_DESCRIPTION.get(code);
}

/**
 * Get order type code.
 * @param desc order type description
 * @returns order type code (LIMIT, MARKET, SL_MARKET, SL_LIMIT)
 */
export function orderType(desc: string): OrderType {
  var key = desc.charAt(0).toUpperCase();
  if (/s.+l(?!oss)/i.test(desc)) key = "R";
  return ORDER_TYPE_CODE.get(key);
}




// ORDER-VALIDITY
// --------------

/** Order validity code. */
export type OrderValidity = "DAY" | "IOC";

const enum InternalOrderValidity {
  DAY = "DAY",
  IOC = "IOC",
}


const ORDER_VALIDITY_DESCRIPTION: Map<OrderValidity, string> = new Map([
  ["DAY", "End of day validity"],
  ["IOC", "Immediate or Cancel validity"],
]);


function toOrderValidity(x: string): OrderValidity {
  return x as OrderValidity;
}

function fromOrderValidity(x: OrderValidity): string {
  return x;
}

/**
 * Get order validity description.
 * @param code order validity code (DAY, IOC)
 * @returns order validity description
 */
 export function orderValidityDescription(code: OrderValidity): string {
  return ORDER_VALIDITY_DESCRIPTION.get(code);
}

/**
 * Get order validity code.
 * @param desc order validity description
 * @returns order validity code (DAY, IOC)
 */
export function orderValidity(desc: string): OrderValidity {
  return /ioc|cancel|immediate/i.test(desc)? "IOC" : "DAY";
}




// OPTION-TYPE
// -----------

/** Option type code. */
export type OptionType = "CE" | "PE";

const enum InternalOptionType {
  CE = "CE",
  PE = "PE",
}


const OPTION_TYPE_DESCRIPTION: Map<OptionType, string> = new Map([
  ["CE", "Call option"],
  ["PE", "Put option"],
]);


/**
 * Get option type description.
 * @param code option type code (CALL, PUT)
 * @returns option type description
 */
 export function optionTypeDescription(code: OptionType): string {
  return OPTION_TYPE_DESCRIPTION.get(code);
}

/**
 * Get option type code.
 * @param desc option type description
 * @returns option type code (CE, PE)
 */
export function optionType(desc: string): OptionType {
  return /pe|put|sell/i.test(desc)? "PE" : "CE";
}




// HOLDING-TYPE
// ------------

/** Holding type code. */
export type HoldingType = "T1" | "HLD";

const enum InternalHoldingType {
  T1  = "T1",
  HLD = "HLD",
}


const HOLDING_TYPE_DESCRIPTION: Map<HoldingType, string> = new Map([
  ["T1",  "The shares are purchased but not yet delivered to the demat account"],
  ["HLD", "The shares are purchased and are available in the demat account"],
]);


function toHoldingType(x: string): HoldingType {
  return x as HoldingType;
}

function fromHoldingType(x: HoldingType): string {
  return x;
}

/**
 * Get holding type description.
 * @param code holding type code (T1, HLD)
 * @returns holding type description
 */
 export function holdingTypeDescription(code: HoldingType): string {
  return HOLDING_TYPE_DESCRIPTION.get(code);
}

/**
 * Get holding type code.
 * @param desc holding type description
 * @returns holding type code (T1, HLD)
 */
export function holdingType(desc: string): HoldingType {
  return /un|not|pend|t1/i.test(desc)? "T1" : "HLD";
}




// PRODUCT-TYPE
// ------------

/** Product type code. */
export type ProductType = "CNC" | "INTRADAY" | "MARGIN" | "CO" | "BO";

const enum InternalProductType {
  CNC      = "CNC",
  INTRADAY = "INTRADAY",
  MARGIN   = "MARGIN",
  CO       = "CO",
  BO       = "BO",
}


const PRODUCT_TYPE_DESCRIPTION: Map<ProductType, string> = new Map([
  ["CNC",      "Cash N Carry or Delivery Order, for equity only"],
  ["INTRADAY", "Intraday Order, applicable for all segments"],
  ["MARGIN",   "Margin Order, applicable only for derivatives"],
  ["CO",       "Cover Order"],
  ["BO",       "Bracket Order"],
]);

const PRODUCT_TYPE_CODE: Map<string, ProductType> = new Map([
  ["D", "CNC"],
  ["I", "INTRADAY"],
  ["M", "MARGIN"],
  ["C", "CO"],
  ["B", "BO"],
]);


function toProductType(x: string): ProductType {
  return x as ProductType;
}

function fromProductType(x: ProductType): string {
  return x;
}

/**
 * Get product type description.
 * @param code product type code (CNC, INTRADAY, MARGIN, CO, BO)
 * @returns product type description
 */
 export function productTypeDescription(code: ProductType): string {
  return PRODUCT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get product type code.
 * @param desc product type description
 * @returns product type code (CNC, INTRADAY, MARGIN, CO, BO)
 */
export function productType(desc: string): ProductType {
  var key = desc.charAt(0).toUpperCase();
  if (/cnc|cash|carry|deliver/i.test(desc)) key = "D";
  return PRODUCT_TYPE_CODE.get(key);
}




// INSTRUMENT-TYPE
// ---------------

/** Instrument type code. */
export type InstrumentType =
  "EQ" | "PREFSHARES" | "DEBENTURES" | "WARRANTS" | "MISC" | "INDEX" | // CM segment
  "FUTIDX" | "FUTIVX" | "FUTSTK" | "OPTIDX" | "OPTSTK" | // FO segment
  "FUTCUR" | "FUTIRT" | "FUTIRC" | "OPTCUR" | "UNDCUR" | "UNDIRC" | "UNDIRT" | "UNDIRD" | "INDEX_CD" | "FUTIRD" | // CD segment
  "FUTCOM" | "OPTFUT" | "OPTCOM"; // COM segment

const enum InternalInstrumentType {
  // CM segment
  EQ = 0,
  PREFSHARES = 1,
  DEBENTURES = 2,
  WARRANTS   = 3,
  MISC   = 4,
  INDEX  = 10,
  // FO segment
  FUTIDX = 11,
  FUTIVX = 12,
  FUTSTK = 13,
  OPTIDX = 14,
  OPTSTK = 15,
  // CD segment
  FUTCUR = 16,
  FUTIRT = 17,
  FUTIRC = 18,
  OPTCUR = 19,
  UNDCUR = 20,
  UNDIRC = 21,
  UNDIRT = 22,
  UNDIRD = 23,
  INDEX_CD = 24,
  FUTIRD = 25,
  // COM segment
//FUTIDX = 11,
  FUTCOM = 30,
  OPTFUT = 31,
  OPTCOM = 32,
}


const TO_INSTRUMENT_TYPE: Map<number, InstrumentType> = new Map([
  // CM segment
  [0,  "EQ"],
  [1,  "PREFSHARES"],
  [2,  "DEBENTURES"],
  [3,  "WARRANTS"],
  [4,  "MISC"],
  [10, "INDEX"],
  // FO segment
  [11, "FUTIDX"],
  [12, "FUTIVX"],
  [13, "FUTSTK"],
  [14, "OPTIDX"],
  [15, "OPTSTK"],
  // CD segment
  [16, "FUTCUR"],
  [17, "FUTIRT"],
  [18, "FUTIRC"],
  [19, "OPTCUR"],
  [20, "UNDCUR"],
  [21, "UNDIRC"],
  [22, "UNDIRT"],
  [23, "UNDIRD"],
  [24, "INDEX_CD"],
  [25, "FUTIRD"],
  // COM segment
//[11, "FUTIDX"],
  [30, "FUTCOM"],
  [31, "OPTFUT"],
  [32, "OPTCOM"],
]);

const FROM_INSTRUMENT_TYPE: Map<InstrumentType, number> = new Map([
  // CM segment
  ["EQ", 0],
  ["PREFSHARES", 1],
  ["DEBENTURES", 2],
  ["WARRANTS", 3],
  ["MISC", 4],
  ["INDEX", 10],
  // FO segment
  ["FUTIDX", 11],
  ["FUTIVX", 12],
  ["FUTSTK", 13],
  ["OPTIDX", 14],
  ["OPTSTK", 15],
  // CD segment
  ["FUTCUR", 16],
  ["FUTIRT", 17],
  ["FUTIRC", 18],
  ["OPTCUR", 19],
  ["UNDCUR", 20],
  ["UNDIRC", 21],
  ["UNDIRT", 22],
  ["UNDIRD", 23],
  ["INDEX_CD", 24],
  ["FUTIRD", 25],
  // COM segment
//["FUTIDX", 11],
  ["FUTCOM", 30],
  ["OPTFUT", 31],
  ["OPTCOM", 32],
]);

const INSTRUMENT_TYPE_DESCRIPTION: Map<InstrumentType, string> = new Map([
  // CM segment
  ["EQ",     "Equity Shares"],
  ["PREFSHARES", "Preference Shares"],
  ["DEBENTURES", "Collateral-free Debt"],
  ["WARRANTS",   "Warrants on Stock"],
  ["MISC",   "Miscellaneous"],
  ["INDEX",  "Stock Market Index"],
  // FO segment
  ["FUTIDX", "Futures on Index"],
  ["FUTIVX", "Futures on Volatility Index"],
  ["FUTSTK", "Futures on Stock"],
  ["OPTIDX", "Options on Index"],
  ["OPTSTK", "Options on Stock"],
  // CD segment
  ["FUTCUR", "Futures on Currency"],
  ["FUTIRT", "Futures on Government of India Treasury Bills"],
  ["FUTIRC", "Futures on Government of India Bonds"],
  ["OPTCUR", "Options on Currency"],
  ["UNDCUR", "Underlying on Currency"],
  ["UNDIRC", "Underlying on Government of Bonds"],
  ["UNDIRT", "Underlying on Government of India Treasury Bills"],
  ["UNDIRD", "Underlying on 10 Year Notional coupon bearing GOI security"],
  ["INDEX_CD", "Market-indexed Certificate of deposit"],
  ["FUTIRD", "Futures on 10 Year Notional coupon bearing GOI security"],
  // COM segment
//["FUTIDX_COM", "Futures on Commodity Index"],
  ["FUTCOM", "Futures on Commodity"],
  ["OPTFUT", "Options on Commodity Futures"],
  ["OPTCOM", "Options on Commodity"],
]);


function toInstrumentType(x: number): InstrumentType {
  return TO_INSTRUMENT_TYPE.get(x);
}

function fromInstrumentType(x: InstrumentType): number {
  return FROM_INSTRUMENT_TYPE.get(x);
}

/**
 * Get instrument type description.
 * @param code instrument type code
 * @returns instrument type description
 */
 export function instrumentTypeDescription(code: InstrumentType): string {
  return INSTRUMENT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get instrument type code.
 * @param desc instrument type description
 * @returns instrument type code
 */
export function instrumentType(desc: string): InstrumentType {
  var fut = /fut|future/i.test(desc);
  var opt = /opt|option/i.test(desc);
  var idx = /idx|index/i.test(desc);
  var und = /und|underlying/i.test(desc);
  // COM segment
  if (/com(\b|$)|commodit/i.test(desc)) {
    if (opt) return fut? "OPTFUT" : "OPTCOM";
    else if (idx) return "FUTIDX"; // FUTIDX_COM
    else          return "FUTCOM";
  }
  // CD segment
  else if (/(^|\b)und|cd(\b|$)|ir[cdt](\b|$)|cur|gov|bond|trea|coup/i.test(desc)) {
    if (/irc(\b|$)|bond/i.test(desc))      return und? "UNDIRC" : "FUTIRC";
    else if (/ird(\b|$)|coup/i.test(desc)) return und? "UNDIRD" : "FUTIRD";
    else if (/irt(\b|$)|trea/i.test(desc)) return und? "UNDIRT" : "FUTIRT";
    else                return idx? "INDEX_CD" : (opt? "OPTCUR" : "FUTCUR");
  }
  // FO segment
  else if (fut || opt) {
    if (/ivx|volatil/i.test(desc)) return "FUTIVX";
    else if (idx) return opt? "OPTIDX" : "FUTIDX";
    else          return opt? "OPTSTK" : "FUTSTK";
  }
  // CM segment
  else {
    if (idx)                        return "INDEX";
    else if (/misc/i.test(desc))    return "MISC";
    else if (/warrant/i.test(desc)) return "WARRANTS";
    else if (/deb/i.test(desc))     return "DEBENTURES";
    else if (/pref/i.test(desc))    return "PREFSHARES";
  }
  return "EQ";
}




// SYMBOL-DETAILS
// --------------

/**
 * Get symbol exchange.
 * @param code symbol
 * @returns symbol exchange
 */
export function symbolExchange(code: string): Exchange {
  var i = code.indexOf(":");
  return code.substring(0, i) as Exchange;
}

/** Get ticker name [equity, future, monthly-expiry option, weekly-expiry option]. */
const RTICKER = /^\w+:(\w+)-\w+|^\w+:(\w+)\d{2}\w{3}FUT|^\w+:(\w+)\d{2}\w{3}\d+[CP]E|^\w+:(\w+)\d{2}\w{1}\d{2}\d+[CP]E/;

/**
 * Get symbol ticker (exchange symbol, underlying symbol, currency pair, or commodity).
 * @param code symbol
 * @returns symbol ticker
 */
export function symbolTicker(code: string): string {
  var m = RTICKER.exec(code);
  return m[1] || m[2] || m[3] || m[4];
}

function symbolSeries(code: string): string | null {
  var i = code.lastIndexOf("-");
  return i > 0? code.substring(i) : null;
}

function symbolOptionType(code: string): OptionType | null {
  var a = code.substring(code.length - 2);
  return a === "CE" || a === "PE"? a : null;
}

function symbolIsOption(code: string): boolean {
  return symbolOptionType(code) != null;
}

function symbolIsFuture(code: string): boolean {
  var a = code.substring(code.length - 3);
  return a === "FUT";
}

function symbolIsDerivative(code: string): boolean {
  return symbolIsOption(code) || symbolIsFuture(code);
}

function symbolStrikePrice(code: string): number {
  var RSTRIKE = /(\d+)[CP]E$/, m = RSTRIKE.exec(code);
  return m != null? parseInt(m[1], 10) : 0;
}




interface SymbolMasterNseCm {
  symbol: string,
  symbolToken: BigInt,
  symbolDescription: string,
  instrumentType: number, // 0
  minimumLotSize: number, // 1
  tickSize: number, // 0.05
  isin: string,
  tradingSession: string, // 0915-1530|1815-1915:17
}

interface SymbolMasterBseCm {
  symbol: string,
  symbolToken: BigInt,
  symbolDescription: string,
  instrumentType: number, // 50
  minimumLotSize: number, // 1
  tickSize: number, // 0.05 / 0.01
  isin: string,
  tradingSession: string, // 0915-1530|1815-1915:17
}

interface SymbolMasterNseMcxCom {
  symbol: string,
  symbolToken: BigInt,
  symbolDescription: string,
  instrumentType: number, // 31
  tickSize: number, // 0.05 / 0.01
  tradingSession: string, // 0915-1530|1815-1915:17
  strikePrice: number,
  optionType: number,
}




// LOGIN
// -----

/** Attributes required for authorization of all requests. */
export interface Authorization {
  /** This is the app_id which you have received after creating the app. */
  appId: string,
  /** This value will be used for all the requests. */
  accessToken: string,
}


function fromAuthorization(x: Authorization): http.Authorization {
  return {
    app_id:       x.appId,
    access_token: x.accessToken,
  };
}


/** Login step 1 request. */
export interface LoginStep1Request {
  /** This is the app_id which you have received after creating the app. */
  appId: string,
  /** This is where the user will be redirected after successful login. */
  redirectUrl: string,
  /** The same value will be returned after successful login to the redirect uri. */
  state: string,
}


function fromLoginStep1Request(x: LoginStep1Request): http.LoginStep1Request {
  return {
    client_id:     x.appId,
    redirect_uri:  x.redirectUrl,
    response_type: "code",
    state: x.state,
  };
}


/** Login step 1 response. */
export interface LoginStep1Response {
  /** String value which will be used to generate the access_token. */
  authorizationCode: string,
  /** This value is returned as is from the first request. */
  state: string,
}


function toLoginStep1Response(x: http.LoginStep1Response): LoginStep1Response {
  return {
    authorizationCode: x.auth_code,
    state: x.state,
  };
}


/** Login step 2 request. */
export interface LoginStep2Request {
  /** SHA-256 of `api_id:app_secret` in hex. */
  appHash: string,
  /** This is the auth_code which is received from the first step. */
  authorizationCode: string,
}


function fromLoginStep2Request(x: LoginStep2Request): http.LoginStep2Request {
  return {
    grant_type: "authorization_code",
    appIdHash:  x.appHash,
    code:       x.authorizationCode,
  };
}


/** Login step 2 response. */
export interface LoginStep2Response {
  /** This value will be used for all the subsequent requests. */
  accessToken: string,
}


function toLoginStep2Response(x: http.LoginStep2Response): LoginStep2Response {
  return {
    accessToken: x.access_token,
  };
}




// GET-PROFILE
// -----------

/** Basic details of the client. */
export interface Profile {
  /** The client id of the fyers user. */
  id: string,
  /** Email address of the client. */
  email: string,
  /** Name of the client. */
  name: string,
  /** PAN of the client. */
  pan: string,
}


function toProfile(x: http.GetProfileResponse): Profile {
  var d = x.data;
  return {
    id:    d.fy_id,
    email: d.email_id,
    name:  d.name,
    pan:   d.PAN,
  };
}




// GET-FUNDS
// ---------

/** Limits for equity/commodity fund. */
export interface Fund {
  /** Limit at start of the day. */
  start: number,
  /** Fund Transfer. */
  deposits: number,
  /** Realized Profit and Loss. */
  realizedReturns: number,
  /** Collaterals. */
  collaterals: number,
  /** Adhoc Limit. */
  adhoc: number,
  /** Utilized Amount. */
  utilized: number,
  /** Receivables. */
  receivables: number,
  /** Available Balance. */
  available: number,
  /** Clear Balance. */
  clear: number,
  /** Total Balance. */
  total: number,
}


/** Balance available for the user for capital as well as the commodity market. */
export interface Funds {
  /** Fund limits for capital market. */
  equity: Fund,
  /** Fund limits for commodity market. */
  commodity: Fund,
}

const enum InternalFundLimitType {
  START    = 9,
  DEPOSITS = 6,
  REALIZEDRETURNS = 4,
  COLLATERALS = 5,
  ADHOC       = 8,
  UTILIZED    = 2,
  RECEIVABLES = 7,
  AVAILABLE   = 10,
  CLEAR       = 3,
  TOTAL       = 1,
}
import IFLT = InternalFundLimitType;


function toFunds(x: http.GetFundsResponse): Funds {
  var e: Fund = {} as any;
  var c: Fund = {} as any;
  for (var l of x.fund_limit) {
    switch (l.id) {
      case IFLT.START:
        e.start = l.equityAmount;
        c.start = l.commodityAmount;
        break;
      case IFLT.DEPOSITS:
        e.deposits = l.equityAmount;
        c.deposits = l.commodityAmount;
        break;
      case IFLT.REALIZEDRETURNS:
        e.realizedReturns = l.equityAmount;
        c.realizedReturns = l.commodityAmount;
        break;
      case IFLT.COLLATERALS:
        e.collaterals = l.equityAmount;
        c.collaterals = l.commodityAmount;
        break;
      case IFLT.ADHOC:
        e.adhoc = l.equityAmount;
        c.adhoc = l.commodityAmount;
        break;
      case IFLT.UTILIZED:
        e.utilized = l.equityAmount;
        c.utilized = l.commodityAmount;
        break;
      case IFLT.RECEIVABLES:
        e.receivables = l.equityAmount;
        c.receivables = l.commodityAmount;
        break;
      case IFLT.AVAILABLE:
        e.available = l.equityAmount;
        c.available = l.commodityAmount;
        break;
      case IFLT.CLEAR:
        e.clear = l.equityAmount;
        c.clear = l.commodityAmount;
        break;
      case IFLT.TOTAL:
        e.total = l.equityAmount;
        c.total = l.commodityAmount;
        break;
    }
  }
  return {equity: e, commodity: c};
}




// GET-HOLDINGS
// ------------

/** Details of each holding. */
export interface Holding {
  /** 12-digit International Securities Identification Number. */
  isin: string,
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** The exchange in which order is placed. */
  exchange: Exchange,
  /** Identify the type of holding. */
  type: HoldingType,
  /** The quantity of the symbol which the user has at the beginning of the day. */
  quantity: number,
  /** This reflects the quantity - the quantity sold during the day. */
  remainingQuantity: number,
  /** The original buy price of the holding. */
  buyPrice: number,
  /** The original buy value of the holding. */
  buyValue: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  currentPrice: number,
  /** The Market value of the current holding. */
  currentValue: number,
  /** Profit and loss made. */
  returns: number,
  /** Profit and loss percent made. */
  returnsPercent: number,
}


function toHolding(x: http.Holding): Holding {
  return {
    isin:     x.isin,
    symbol:   x.symbol,
    token:    x.fytoken,
    exchange: toExchange(x.exchange),
    type:     toHoldingType(x.holdingType),
    quantity: x.quantity,
    remainingQuantity: x.remainingQuantity,
    buyPrice:       x.costPrice,
    buyValue:       x.costPrice * x.quantity,
    currentPrice:   x.ltp,
    currentValue:   x.marketVal,
    returns:        x.pl,
    returnsPercent: x.pl / (x.costPrice * x.quantity),
  };
}


/** Overall status of holdings in this demat account. */
export interface HoldingsOverall {
  /** Total number of holdings present. */
  count: number,
  /** Total number of settled holdings (HLD). */
  settledCount: number,
  /** Invested amount for the current holdings. */
  investedValue: number,
  /** The present value of the holdings. */
  currentValue: number,
  /** Total profit and loss made. */
  returns: number,
  /** Percentage value of the total pnl. */
  returnsPercent: number,
}


function toHoldingsOverall(xs: http.Holding[], x: http.HoldingsOverall): HoldingsOverall {
  var settledCount = 0;
  for (var h of xs)
    if (h.holdingType === "HLD") settledCount++;
  return {
    count: x.count_total,
    settledCount,
    investedValue:  x.total_investment,
    currentValue:   x.total_current_value,
    returns:        x.total_pl,
    returnsPercent: x.pnl_perc,
  };
}


/** Equity and mutual fund holdings which the user has in this demat account. */
export interface Holdings {
  /** Details of each holding. */
  details: Holding[],
  /** Overall status of holdings in this demat account. */
  overall: HoldingsOverall,
}


function toHoldings(x: http.GetHoldingsResponse): Holdings {
  return {
    details: x.holdings.map(toHolding),
    overall: toHoldingsOverall(x.holdings, x.overall),
  };
}




// GET-ORDERS
// ----------

/** Order placed by the user in the current trading day. */
export interface Order {
  /** The order id assigned for each order. */
  id: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** The ticker symbol for which order is placed. */
  ticker: string,
  /** Description of symbol for which order is placed. */
  description: string,
  /** The segment this order is placed in. */
  segment: Segment,
  /** Exchange instrument type. */
  instrument: InstrumentType,
  /** The exchange in which order is placed. */
  exchange: Exchange,
  /** The type of order. */
  type: OrderType,
  /** The order is buy or sell. */
  side: OrderSide,
  /** The product type. */
  productType: ProductType,
  /** Source from where the order was placed. */
  source: OrderSource,
  /** The status of the order. */
  status: OrderStatus,
  /** True when placing AMO order. */
  offline: boolean,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** The original order qty. */
  quantity: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  tradedQuantity: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** Remaining disclosed quantity. */
  remainingDisclosedQuantity: number,
  /** Day or IOC. */
  validity: OrderValidity,
  /** The order time as per DD-MMM-YYYY hh:mm:ss in IST. */
  date: string,
  /** The parent order id will be provided only for applicable orders. */
  parentId?: string,
  /** Price change from previous trading day. */
  priceChange: number,
  /** Percent price change from previous trading day. */
  priceChangePercent: number,
  /** Last price of symbol. */
  currentPrice: number,
  /** The average traded price for the order. */
  tradedPrice: number,
  /** The error messages are shown here. */
  message: string,
  /** PAN of the client. */
  pan: string,
  /** The client id of the fyers user. */
  clientId: string,
}


function toOrder(x: http.Order): Order {
  return {
    id:     x.id,
    symbol: x.symbol,
    token:  x.fytoken,
    ticker: x.ex_sym,
    description:  x.description,
    segment:      toSegment(x.segment),
    instrument:   toInstrumentType(x.instrument),
    exchange:     toExchange(x.exchange),
    type:         toOrderType(x.type),
    side:         toOrderSide(x.side),
    productType:  toProductType(x.productType),
    source:       toOrderSource(x.source) || null,
    status:       toOrderStatus(x.status),
    offline:      x.offlineOrder === "True",
    limitPrice:   x.limitPrice,
    stopPrice:    x.stopPrice,
    quantity:     x.qty,
    remainingQuantity: x.remainingQuantity,
    tradedQuantity:    x.filledQty,
    disclosedQuantity: x.discloseQty,
    remainingDisclosedQuantity: x.dqQtyRem,
    validity:     toOrderValidity(x.orderValidity),
    date:         x.orderDateTime,
    parentId:     x.parentId || null,
    priceChange:  x.ch,
    priceChangePercent: x.chp,
    currentPrice: x.lp,
    tradedPrice:  x.tradedPrice,
    message:      x.message,
    pan:          x.pan      || null,
    clientId:     x.clientId || null,
  };
}


/** Overall status of orders for the current trading day. */
export interface OrdersOverall {
  /** Total number of orders present. */
  count: number,
  /** Total number of open orders. */
  openCount: number,
  /** Total number of closed orders. */
  closedCount: number,
  /** The original order qty. */
  quantity: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  tradedQuantity: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** Remaining disclosed quantity. */
  remainingDisclosedQuantity: number,
}


function toOrdersOverall(x: http.Order[]): OrdersOverall {
  var a: OrdersOverall = {
    count: 0,
    openCount: 0,
    closedCount: 0,
    quantity: 0,
    remainingQuantity: 0,
    tradedQuantity: 0,
    disclosedQuantity: 0,
    remainingDisclosedQuantity: 0,
  };
  for (var o of x) {
    a.count++;
    a.openCount += o.status === IOST.PENDING || o.status === IOST.TRANSIT? 1 : 0;
    a.quantity  += o.qty;
    a.remainingQuantity += o.remainingQuantity;
    a.tradedQuantity    += o.filledQty;
    a.disclosedQuantity += o.discloseQty;
    a.remainingDisclosedQuantity += o.dqQtyRem;
  }
  a.closedCount = a.count - a.openCount;
  return a;
}


/** All the orders placed by the user in the current trading day. */
export interface Orders {
  /** List of all orders places during the day. */
  details: Order[],
  /** Overall status of orders. */
  overall: OrdersOverall,
}


function toOrders(x: http.GetOrdersResponse): Orders {
  return {
    details: x.orderBook.map(toOrder),
    overall: toOrdersOverall(x.orderBook),
  };
}




// GET-POSITIONS
// -------------

/** Current open and closed position for the current trading day. */
export interface Position {
  /** The unique value for each position. */
  id: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** The segment in which the position is taken. */
  segment: Segment,
  /** The product type of the position. */
  productType: ProductType,
  /** The side shows whether the position is long / short. */
  side: PositionSide,
  /** Absolute value of net qty. */
  quantity: number,
  /** Incase of commodity positions, this multiplier is required for p&l calculation. */
  quantityMultiplier: number,
  /** Average buy price. */
  buyPrice: number,
  /** Total buy qty. */
  buyQuantity: number,
  /** Total buy value. */
  buyValue: number,
  /** Average sell price. */
  sellPrice: number,
  /** Total sell qty. */
  sellQuantity: number,
  /** Total sell value. */
  sellValue: number,
  /** Net average price. */
  netPrice: number,
  /** Net qty. */
  netQuantity: number,
  /** The total p&l of the position. */
  returns: number,
  /** The realized p&l of the position. */
  realizedReturns: number,
  /** The unrealized p&l of the open position. */
  unrealizedReturns: number,
  /** Is it a cross currency position? */
  crossCurrency: boolean,
  /** Incase of cross currency position, the rbi reference rate will be required to calculate the p&l. */
  rbiRefRate: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  currentPrice: number,
}


function toPosition(x: http.Position): Position {
  return {
    id: x.id,
    symbol:      x.symbol,
    token:       x.fytoken,
    segment:     toSegment(x.segment),
    productType: toProductType(x.productType),
    side:        toPositionSide(x.side),
    quantity:    x.qty,
    quantityMultiplier: x.qtyMulti_com,
    buyPrice:     x.buyAvg,
    buyQuantity:  x.buyQty,
    buyValue:     x.buyVal,
    sellPrice:    x.sellAvg,
    sellQuantity: x.sellQty,
    sellValue:    x.sellVal,
    netPrice:     x.netAvg,
    netQuantity:  x.netQty,
    returns:      x.pl,
    realizedReturns:   x.realized_profit,
    unrealizedReturns: x.unrealized_profit,
    crossCurrency: x.crossCurrency === "Y",
    rbiRefRate:    x.rbiRefRate,
    currentPrice:  x.ltp,
  };
}


/** Overall status of positions for the current trading day. */
export interface PositionsOverall {
  /** Total number of positions present. */
  count: number,
  /** Total number of positions opened. */
  openCount: number,
  /** Total number of positions closed. */
  closedCount: number,
  /** Total buy value. */
  buyValue: number,
  /** Total sell value. */
  sellValue: number,
  /** Total profit and losses. */
  returns: number,
  /** Profit and losses when the owned product is sold. */
  realizedReturns: number,
  /** Profit and loses when the product is owned, but is not sold. */
  unrealizedReturns: number,
}


function toPositionsOverall(xs: http.Position[], x: http.PositionsOverall): PositionsOverall {
  var buyValue = 0, sellValue = 0;
  for (var p of xs) {
    buyValue  += p.buyVal;
    sellValue += p.sellVal;
  }
  return {
    count:       x.count_total,
    openCount:   x.count_open,
    closedCount: x.count_total - x.count_open,
    buyValue,
    sellValue,
    returns:   x.pl_total,
    realizedReturns:   x.pl_realized,
    unrealizedReturns: x.pl_unrealized,
  };
}


/** Current open and closed positions for the current trading day. */
export interface Positions {
  /** List of all positions for the current trading day. */
  details: Position[],
  /** Overall status of positions for the current trading day. */
  overall: PositionsOverall,
}


function toPositions(x: http.GetPositionsResponse): Positions {
  return {
    details: x.netPositions.map(toPosition),
    overall: toPositionsOverall(x.netPositions, x.overall),
  };
}




// GET-TRADES
// ----------

/** Trade for the current day across all platforms and exchanges in the current trading day. */
export interface Trade {
  /** The unique id to sort the trades. */
  id: string,
  /** The order id for which the trade occurred. */
  orderId: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** The segment in which order is placed. */
  segment: Segment,
  /** The exchange in which order is placed. */
  exchange: Exchange,
  /** The trade is buy or sell. */
  side: OrderSide,
  /** The product in which the order was placed. */
  productType: ProductType,
  /** The type of order. */
  orderType: OrderType,
  /** The time when the trade occured in “DD-MM-YYYY hh:mm:ss” format in IST. */
  orderDate: string,
  /** The traded price. */
  price: number,
  /** The total traded qty. */
  quantity: number,
  /** The total traded value. */
  value: number,
  /** Client id. */
  clientId: string,
}


function toTrade(x: http.Trade): Trade {
  return {
    id: x.id,
    orderId:  x.orderNumber,
    symbol:   x.symbol,
    token:    x.fyToken,
    segment:  toSegment(x.segment),
    exchange: toExchange(x.exchange),
    side:     toOrderSide(x.transactionType),
    productType: toProductType(x.productType),
    orderType:   toOrderType(x.orderType),
    orderDate:   x.orderDateTime,
    price:       x.tradePrice,
    quantity:    x.tradedQty,
    value:       x.tradeValue,
    clientId:    x.clientId,
  };
}


/** Overall trades for the current trading day. */
export interface TradesOverall {
  /** Total number of trades. */
  count: number,
  /** The total traded qty. */
  quantity: number,
  /** The total traded value. */
  value: number,
}


function toTradesOverall(x: http.Trade[]): TradesOverall {
  var a: TradesOverall = {
    count: 0,
    quantity: 0,
    value: 0,
  };
  for (var t of x) {
    a.count++;
    a.quantity += t.tradedQty;
    a.value    += t.tradeValue;
  }
  return a;
}


/** All the trades for the current day across all platforms and exchanges in the current trading day. */
export interface Trades {
  /** List of all trades for the current trading day. */
  details: Trade[],
  /** Overall trades for the current trading day. */
  overall: TradesOverall,
}


function toTrades(x: http.GetTradesResponse): Trades {
  return {
    details: x.tradeBook.map(toTrade),
    overall: toTradesOverall(x.tradeBook),
  };
}




// PLACE-ORDER
// -----------

/** Defines an order to any exchange via Fyers. */
export interface PlaceOrder {
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The type of order. */
  type?: OrderType,
  /** The order is buy or sell. */
  side?: OrderSide,
  /** The product in which the order was placed. */
  productType?: ProductType,
  /** Provide valid price for Limit and Stoplimit orders. */
  limitPrice?: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice?: number,
  /** The quantity should be in multiples of lot size for derivatives. */
  quantity: number,
  /** Allowed only for Equity. */
  disclosedQuantity?: number,
  /** Day or IOC. */
  validity?: OrderValidity,
  /** True when placing AMO order. */
  offline?: boolean,
  /** Provide valid price for CO and BO orders. */
  stopLoss?: number,
  /** Provide valid price for BO orders. */
  takeProfit?: number,
}


function fromPlaceOrder(x: PlaceOrder): http.PlaceOrderRequest {
  return {
    symbol: x.symbol,
    type:   fromOrderType(x.type || "MARKET"),
    side:   fromOrderSide(x.side || "BUY"),
    productType:  x.productType  || "CNC",
    limitPrice:   x.limitPrice   || 0,
    stopPrice:    x.stopPrice    || 0,
    qty:          x.quantity,
    disclosedQty: x.disclosedQuantity || 0,
    validity:     x.validity   || "DAY",
    offlineOrder: x.offline? "True" : "False",
    stopLoss:     x.stopLoss   || 0,
    takeProfit:   x.takeProfit || 0,
  };
}




// MODIFY-ORDER
// ------------

/** Defines an order modification request to Fyers. */
export interface ModifyOrder {
  /** The order id assigned for each order. */
  id: string,
  /** The type of order. */
  type: OrderType,
  /** The original order qty. */
  quantity?: number,
  /** Disclosed quantity. */
  disclosedQuantity?: number,
  /** The limit price for the order. */
  limitPrice?: number,
  /** The stop price for the order. */
  stopPrice?: number,
}


function fromModifyOrder(x: ModifyOrder): http.ModifyOrderRequest {
  return {
    id:   x.id,
    type: fromOrderType(x.type),
    qty:  x.quantity,
    disclosedQty: x.disclosedQuantity,
    limitPrice:   x.limitPrice,
    stopPrice:    x.stopPrice,
  };
}




// CONVERT-POSITION
// ----------------

/** Defines a convert position request to Fyers. */
export interface ConvertPosition {
  /** Mandatory. Eg: 119031547242. */
  symbol: string,
  /** The side shows whether the position is long / short. */
  side?: PositionSide,
  /** Quantity to be converted. Has to be in multiples of lot size for derivatives. */
  quantity: number,
  /** Existing productType (CNC positions cannot be converted). */
  fromProductType?: ProductType,
  /** The new product type. */
  toProductType?: ProductType,
}


function fromConvertPosition(x: ConvertPosition): http.ConvertPositionRequest {
  return {
    symbol:       x.symbol,
    positionSide: fromPositionSide(x.side || "LONG"),
    convertQty:   x.quantity,
    convertFrom:  fromProductType(x.fromProductType || "INTRADAY"),
    convertTo:    fromProductType(x.toProductType   || "CNC"),
  };
}




// GET-MARKET-STATUS
// -----------------

/** Current market status of an exchange's segment. */
export interface MarketStatus {
  /** The exchange in which the position is taken. */
  exchange: Exchange,
  /** The segment in which the position is taken. */
  segment: Segment,
  /** TODO: The type of market: NL, MS, ES, ... */
  type: string,
  /** TODO: Market status: OPEN, CLOSE. */
  status: string,
}


function toMarketStatus(x: http.MarketStatus): MarketStatus {
  return {
    exchange: toExchange(x.exchange),
    segment:  toSegment(x.segment),
    type:     x.market_type,
    status:   x.status,
  };
}


/** Overall status of market segments. */
export interface MarketsStatusOverall {
  /** Total number of market segments. */
  count: number,
  /** Total number of open market segments. */
  openCount: number,
  /** Total number of closed market segments. */
  closedCount: number,
}


function toMarketsStatusOverall(x: http.MarketStatus[]): MarketsStatusOverall {
  var a: MarketsStatusOverall = {
    count: 0,
    openCount: 0,
    closedCount: 0,
  };
  for (var s of x) {
    a.count++;
    if (s.status === "OPEN") a.openCount++;
    else a.closedCount++;
  }
  return a;
}


/** Market status of all the exchanges and their segments. */
export interface MarketsStatus {
  /** List of statuses of various market segments. */
  details: MarketStatus[],
  /** Overall status of market segments. */
  overall: MarketsStatusOverall,
}


function toMarketsStatus(x: http.GetMarketStatusResponse): MarketsStatus {
  return {
    details: x.marketStatus.map(toMarketStatus),
    overall: toMarketsStatusOverall(x.marketStatus),
  };
}




// GET-MARKET-HISTORY
// ------------------

/** Request for getting market history of a symbol. */
export interface GetMarketHistory {
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** The candle resolution in minutes. */
  resolution: number,
  /** Indicating the start date of records (epoch, yyyy-mm-dd). */
  fromDate: number,
  /** Indicating the end date of records. */
  toDate: number,
  /** Set cont flag 1 for continues data and future options. */
  continuous: boolean,
}

const enum InternalShortCandleIndex {
  TIME   = 0,
  OPEN   = 1,
  HIGH   = 2,
  LOW    = 3,
  CLOSE  = 4,
  VOLUME = 5,
}
import ISCI = InternalShortCandleIndex;


// List of valid candle resolutions in minutes.
const CANDLE_RESOLUTIONS = [1, 2, 3, 5, 10, 15, 20, 30, 60, 120, 240, 1440];

function fromCandleResolution(x: number): string {
  var R = 1, D = Infinity;
  for (var r of CANDLE_RESOLUTIONS) {
    var d = Math.abs(x - r);
    if (d < D) { R = r; D = d; }
  }
  return R === 1440? "D" : R.toString();
}

function fromGetMarketHistory(x: GetMarketHistory): http.GetMarketHistoryRequest {
  return {
    symbol:      x.symbol,
    resolution:  fromCandleResolution(x.resolution),
    date_format: 0,
    range_from:  x.fromDate.toString(),
    range_to:    x.toDate.toString(),
    cont_flag:   x.continuous? "1" : "0",
  };
}


/** Candle in market history, quotes. */
export interface Candle {
  /** UNIX epoch time. */
  date: number,
  /** Open price. */
  openPrice: number,
  /** High price. */
  highPrice: number,
  /** Low price. */
  lowPrice: number,
  /** Previous Close price. */
  closePrice: number,
  /** Volume. */
  volume: number,
}


function toCandleShort(x: http.ShortCandle): Candle {
  return {
    date:       x[ISCI.TIME],
    openPrice:  x[ISCI.OPEN],
    highPrice:  x[ISCI.HIGH],
    lowPrice:   x[ISCI.LOW],
    closePrice: x[ISCI.CLOSE],
    volume:     x[ISCI.VOLUME],
  };
}

function toCandle(x: http.Candle): Candle {
  return {
    date:       x.t,
    openPrice:  x.o,
    highPrice:  x.h,
    lowPrice:   x.l,
    closePrice: x.c,
    volume:     x.v,
  };
}


/** Overall market history details. */
export interface MarketHistoryOverall {
  /** Start UNIX epoch time. */
  fromDate: number,
  /** Stop UNIX epoch time. */
  toDate: number,
  /** Open price. */
  openPrice: number,
  /** High price. */
  highPrice: number,
  /** Low price. */
  lowPrice: number,
  /** Close price. */
  closePrice: number,
  /** Volume. */
  volume: number,
}


function toMarketHistoryOverall(x: http.ShortCandle[]): MarketHistoryOverall {
  var a: MarketHistoryOverall = {
    fromDate: 0,
    toDate: 0,
    openPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    closePrice: 0,
    volume: 0,
  };
  if (x.length === 0) return a;
  var l = x.length - 1;
  a.fromDate   = x[0][ISCI.TIME];
  a.toDate     = x[l][ISCI.TIME];
  a.openPrice  = x[0][ISCI.OPEN];
  a.highPrice  = x[0][ISCI.HIGH];
  a.lowPrice   = x[0][ISCI.LOW];
  a.closePrice = x[l][ISCI.CLOSE];
  for (var c of x) {
    a.highPrice = Math.max(a.highPrice, c[ISCI.HIGH]);
    a.lowPrice  = Math.min(a.lowPrice,  c[ISCI.LOW]);
    a.volume    += c[ISCI.VOLUME];
  }
  return a;
}


/** Market history of a particular stock. */
export interface MarketHistory {
  /** List of candes. */
  details: Candle[],
  /** Overall status of market history. */
  overall: MarketHistoryOverall,
}


function toMarketHistory(x: http.GetMarketHistoryResponse): MarketHistory {
  return {
    details: x.candles.map(toCandleShort),
    overall: toMarketHistoryOverall(x.candles),
  };
}




// GET-MARKET-QUOTES
// -----------------

/** Market quote details for a particular symbol. */
export interface MarketQuote {
  /** Symbol name provided by the user. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** Short name for the symbol Eg: “SBIN-EQ”. */
  name: string,
  /** Name of the exchange. Eg: “NSE” or “BSE”. */
  exchange: Exchange,
  /** Description of the symbol. */
  description: string,
  /** Change value. */
  priceChange: number,
  /** Percentage of change between the current value and the previous day's market close. */
  priceChangePercent: number,
  /** Last traded price. */
  currentPrice: number,
  /** Difference between lowest asking and highest bidding price. */
  priceSpread: number,
  /** Asking price for the symbol. */
  sellPrice: number,
  /** Bidding price for the symbol. */
  buyPrice: number,
  /** Price at market opening time. */
  openPrice: number,
  /** Highest price for the day. */
  highPrice: number,
  /** Lowest price for the day. */
  lowPrice: number,
  /** Close price of the previous trading day. */
  closePrice: number,
  /** Volume traded. */
  volume: number,
  /** Today’s time. */
  date: number,
  /** Current time, open, high, low price and volume with HH:MM timestamp. */
  candle: Candle,
}


function toMarketQuote(x: http.MarketQuote): MarketQuote {
  var v = x.v;
  return {
    symbol:   x.n,
    token:    v.fyToken,
    name:     v.short_name,
    exchange: v.exchange as Exchange,
    description:  v.description,
    priceChange:  v.ch,
    priceChangePercent: v.chp,
    currentPrice: v.lp,
    priceSpread:  v.spread,
    sellPrice:  v.ask,
    buyPrice:   v.bid,
    openPrice:  v.open_price,
    highPrice:  v.high_price,
    lowPrice:   v.low_price,
    closePrice: v.prev_close_price,
    volume:     v.volume,
    date:       v.tt,
    candle:     toCandle(v.cmd),
  };
}




// GET-MARKET-DEPTH
// ----------------

/** Open buy/sell orders at a particular price. */
export interface MarketOffer {
  /** Bid/ask price. */
  price: number,
  /** Bid/ask volume. */
  volume: number,
  /** Orders? */
  orders: number,
}


function toMarketOffer(x: http.MarketOffer): MarketOffer {
  return {
    price:  x.price,
    volume: x.volume,
    orders: x.ord,
  };
}

function toMarketOfferL2(x: websocket.L2MarketOffer, p: number): MarketOffer {
  return {
    price:  x.price / p,
    volume: x.volume,
    orders: x.ord,
  };
}


/** A measure of the supply and demand for a symbol. */
export interface MarketDepth {
  /** Total buying quantity. */
  buyQuantity: number,
  /** Total selling quantity. */
  sellQuantity: number,
  /** Bidding price along with volume and total number of orders. */
  buyOffers: MarketOffer[],
  /** Offer price with volume and total number of orders. */
  sellOffers: MarketOffer[],
  /** Price at market opening time. */
  openPrice?: number,
  /** Highest price for the day. */
  highPrice?: number,
  /** Lowest price for the day. */
  lowPrice?: number,
  /** Price at the of market closing. */
  closePrice?: number,
  /** Volume traded. */
  volume?: number,
  /** Change value. */
  priceChange: number,
  /** Percentage of change between the current value and the previous day's market close. */
  priceChangePercent: number,
  /** Last traded quantity. */
  tradedQuantity: number,
  /** Last traded price. */
  tradedPrice: number,
  /** Last traded time. */
  tradedDate: number,
  /** Average traded price. */
  netPrice: number,
  /** Lower circuit price. */
  lowerCircuitPrice: number,
  /** Upper circuit price. */
  upperCircuitPrice: number,
  /** Expiry date. */
  expiryDate: string,
  /** Open interest. */
  openInterest: number,
  /** Boolean flag for OI data, true or false. */
  openInterestEnabled: boolean,
  /** Previous day open interest. */
  previousOpenInterest: number,
  /** Change in open Interest percentage. */
  openInterestChangePercent: number,
}


function toMarketDepth(x: http.GetMarketDepthResponse): MarketDepth {
  var ks = Object.keys(x.d);
  if (ks.length === 0) return null;  // TODO: OK?
  var v  = x.d[ks[0]];
  return {
    buyQuantity:  v.totalbuyqty,
    sellQuantity: v.totalsellqty,
    buyOffers:  v.bids.map(toMarketOffer),
    sellOffers: v.ask.map(toMarketOffer),
    openPrice:  v.o,
    highPrice:  v.h,
    lowPrice:   v.l,
    closePrice: v.c,
    volume:     v.v,
    priceChange:        v.ch,
    priceChangePercent: v.chp,
    tradedQuantity: v.ltq,
    tradedPrice:    v.ltq,
    tradedDate:     v.ltt,
    netPrice:       v.atp,
    lowerCircuitPrice: v.lower_ckt,
    upperCircuitPrice: v.upper_ckt,
    expiryDate:   v.expiry,
    openInterest: v.oi,
    openInterestEnabled:  v.oiflag,
    previousOpenInterest: v.pdoi,
    openInterestChangePercent: v.oipercent,
  };
}




// GET-EDIS-TRANSACTIONS
// ---------------------

/** Details of an e-DIS transaction. */
export interface EdisTransaction {
  /** Transaction id. */
  id: string
  /** ISIN code of stock. */
  isin: string,
  /** Quantity to transact. */
  quantity: number,
  /** Quantity already transacted? */
  remainingQuantity: number,
  /** Transaction create date-time/ */
  entryDate: string,
  /** Transaction processing start date? */
  startDate: string,
  /** Transaction processing end date? */
  endDate: string,
  /** Source of transaction. */
  source: string,
  /** SUCCESS, FAILURE? */
  status: string,
  /** Unique client code? */
  clientId: string,
  /** Error code (NA). */
  errorCode: string,
  /** Error count (0). */
  errorCount: string,
  /** Message. */
  reason: string,
}


function toEdisTransaction(x: http.EdisTransaction): EdisTransaction {
  return {
    id: x.transactionId,
    isin:       x.isin,
    quantity:   x.qty,
    remainingQuantity: x.qty - x.qtyUtlize,
    entryDate:  x.entryDate,
    startDate:  x.startDate,
    endDate:    x.endDate,
    source:     x.source,
    status:     x.status,
    clientId:   x.clientId,
    errorCode:  x.errCode,
    errorCount: x.errorCount,
    reason:     x.reason,
  };
}


/** Overall status of e-DIS transaction in this demat account. */
export interface EdisTransactionsOverall {
  /** Total number of transactions. */
  count: number,
  /** Quantity to transact. */
  quantity: number,
  /** Quantity already transacted? */
  remainingQuantity: number,
}


function toEdisTransactionsOverall(x: http.EdisTransaction[]): EdisTransactionsOverall {
  var a: EdisTransactionsOverall = {
    count: 0,
    quantity: 0,
    remainingQuantity: 0,
  };
  for (var t of x) {
    a.count++;
    a.quantity          += t.qty;
    a.remainingQuantity += t.qty - t.qtyUtlize;
  }
  return a;
}


/** Details of all e-DIS transactions. */
export interface EdisTransactions {
  /** List of e-DIS transactions. */
  details: EdisTransaction[],
  /** Overall status of transactions. */
  overall: EdisTransactionsOverall,
}


function toEdisTransactions(x: http.GetEdisTransactionsResponse): EdisTransactions {
  var ts: http.EdisTransaction[] = x.data.length === 0? [] : x.data as any;
  return {
    details: ts.map(toEdisTransaction),
    overall: toEdisTransactionsOverall(ts),
  };
}




// SUBMIT-EDIS-HOLDINGS
// --------------------

/** e-DIS securities held in a demat account. */
export interface EdisHolding {
  /** 12-digit alphanumeric code of specific symbol. */
  isin: string,
  /** Quantity of securities held. */
  quantity: number,
}


function fromEdisHolding(x: EdisHolding): http.EdisHolding {
  return {
    isin_code: x.isin,
    qty:       x.quantity,
  };
}




// ORDER-UPDATE
// ------------

/** Order update notification from WebSocket. */
export interface OrderUpdateNotification {
  /** The unique order id assigned for each order. */
  id: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** The type of order. */
  type: OrderType,
  /** The order is buy or sell. */
  side: OrderSide,
  /** The product type. */
  productType: ProductType,
  /** The status of the order. */
  status: OrderStatus,
  /** Day or IOC. */
  validity: OrderValidity,
  /** True when placing AMO order. */
  offlineOrder: boolean,
  /** The original order qty. */
  quantity: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  filledQuantity: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** Remaining disclosed quantity. */
  remainingDisclosedQuantity: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** The order time as per DD-MMM-YYYY hh:mm:ss in IST. */
  date: string,
  /** The parent order id will be provided only for applicable orders. */
  parentId?: string,
  /** The average traded price for the order. */
  tradedPrice: number,
  /** The error messages are shown here. */
  message: string,
}


function toOrderUpdateNotification(x: websocket.OrderUpdateNotification): OrderUpdateNotification {
  var d = x.d;
  return {
    id: d.id,
    symbol:       d.symbol,
    token:        d.fyToken,
    type:         toOrderType(d.type),
    side:         toOrderSide(d.side),
    productType:  toProductType(d.productType),
    status:       toOrderStatus(d.status),
    validity:     toOrderValidity(d.orderValidity),
    offlineOrder: d.offlineOrder,
    quantity:     d.qty,
    remainingQuantity: d.remainingQuantity,
    filledQuantity:    d.filledQty,
    disclosedQuantity: d.discloseQty,
    remainingDisclosedQuantity: d.dqQtyRem,
    limitPrice:   d.limitPrice,
    stopPrice:    d.stopPrice,
    date:         d.orderDateTime,
    parentId:     d.parentId || null,
    tradedPrice:  d.tradedPrice,
    message:      d.message,
  };
}




// SUBSCRIBE-MARKET-QUOTES/DEPTH
// -----------------------------

/** Market quote notification from WebSocket. */
export interface MarketQuoteNotification {
  /** The symbol for which order is placed. */
  symbol?: string,
  /** A unique identifier for every symbol. */
  token: string,
  /** Timestamp sent by exchange (UNIX epoch). */
  date: number,
  /** Market status flag? */
  marketStatus: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  currentPrice: number,
  /** Price at market opening time. */
  openPrice: number,
  /** Highest price for the day. */
  highPrice: number,
  /** Lowest price for the day. */
  lowPrice: number,
  /** Close price of the previous trading day. */
  closePrice: number,
  /** 1 minute candle. */
  candle: Candle,
  /** Open interest. */
  openInterest: number,
  /** Previous day open interest. */
  previousOpenInterest: number,
  /** Last traded quantity. */
  tradedQuantity: number,
  /** Last traded time (UNIX epoch). */
  tradedDate: number,
  /** Average traded price. */
  tradedPrice: number,
  /** Today's volume. */
  volume: number,
  /** Total buy quantity. */
  buyQuantity: number,
  /** Total sell quantity. */
  sellQuantity: number,
  /** Highest bid price. */
  buyPrice: number,
  /** Lowest ask price. */
  sellPrice: number,
}

/** Market depth notification from WebSocket. */
export interface MarketDepthNotification extends MarketQuoteNotification {
  /** Bidding price along with volume and total number of orders. */
  buyOffers: MarketOffer[],
  /** Offer price with volume and total number of orders. */
  sellOffers: MarketOffer[],
}

/** Market depth notification from WebSocket. */
export interface MarketDataNotification extends MarketDepthNotification {}


function toMarketDataNotification(x: websocket.MarketDataNotification): MarketDataNotification {
  var d = x.d;
  var p = d.price_conv;
  return {
    symbol: null,
    token:  d.token.toString(),
    date:   d.tt,
    marketStatus: d.marketStat,
    currentPrice: d.ltp / p,
    openPrice:    d.open_price / p,
    highPrice:    d.high_price / p,
    lowPrice:     d.low_price / p,
    closePrice:   d.prev_close_price / p,
    candle: {
      date: d.tt,
      openPrice:  d.o / p,
      highPrice:  d.h / p,
      lowPrice:   d.l / p,
      closePrice: d.c / p,
      volume: Number(d.v),
    },
    openInterest: Number(d.oi),
    previousOpenInterest: Number(d.pdoi),
    tradedQuantity: d.LTQ,
    tradedDate:     d.L2_LTT,
    tradedPrice:    d.ATP / p,
    volume: d.volume,
    buyQuantity:  Number(d.tot_buy),
    sellQuantity: Number(d.tot_sell),
    buyPrice:     d.bids == null? d.bid / p : d.bids[0].price / p,
    sellPrice:    d.asks == null? d.ask / p : d.asks[0].price / p,
    buyOffers:    d.bids == null? null  : d.bids.map(x => toMarketOfferL2(x, p)),
    sellOffers:   d.asks == null? null  : d.asks.map(x => toMarketOfferL2(x, p)),
  };
}




// NOTIFICATIONS
// -------------

/**
 * Market data notified function.
 * @param notification notification
 */
export type MarketDataNotifiedFunction = (notification: MarketDataNotification) => void;

/**
 * Order update notified function.
 * @param notification notification
 */
export type OrderUpdateNotifiedFunction = (notification: OrderUpdateNotification) => void;




// CHARGES
// -------

function charge(x: number, p: number) {
  return 0.01 * Math.round(x * p);
}

function equityDeliveryBuyCharges(x: number) {
  var sttctt = charge(x, 0.10);
  var gst    = charge(x, 18.0);
  var exch   = charge(x, 0.00325);
  var stamp  = charge(x, 0.015);
  var sebi   = charge(x, 0.0001);
  return sttctt + gst + exch + stamp + sebi;
}

function equityDeliverySellCharges(x: number) {
  var debit  = 7.00 + 5.50;
  return debit + equityDeliveryBuyCharges(x);
}

/**
 * Get equity delivery charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function equityDeliveryCharges(side: OrderSide, value: number) {
  if (side === "BUY") return equityDeliveryBuyCharges(value);
  return equityDeliverySellCharges(value);
}


function equityIntradayBuyCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.00325);
  var stamp  = charge(x, 0.003);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + stamp + sebi;
}

function equityIntradaySellCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var sttctt = charge(x, 0.025);
  var gst    = charge(broker + sttctt, 18.0);
  var exch   = charge(x, 0.00325);
  var stamp  = charge(x, 0.003);
  var sebi   = charge(x, 0.0001);
  return broker + sttctt + gst + exch + stamp + sebi;
}

/**
 * Get equity intraday charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function equityIntradayCharges(side: OrderSide, value: number) {
  if (side === "BUY") return equityIntradayBuyCharges(value);
  return equityIntradaySellCharges(value);
}


function equityFuturesBuyCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.0019);
  var clear  = charge(x, 0.0005);
  var stamp  = charge(x, 0.002);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + clear + stamp + sebi;
}

function equityFuturesSellCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var sttctt = charge(x, 0.01);
  var gst    = charge(broker + sttctt, 18.0);
  var exch   = charge(x, 0.0019);
  var clear  = charge(x, 0.0005);
  var stamp  = charge(x, 0.002);
  var sebi   = charge(x, 0.0001);
  return broker + sttctt + gst + exch + clear + stamp + sebi;
}

/**
 * Get equity futures charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function equityFuturesCharges(side: OrderSide, value: number) {
  if (side === "BUY") return equityFuturesBuyCharges(value);
  return equityFuturesSellCharges(value);
}


function equityOptionsBuyCharges(x: number) {
  var broker = 20.00;
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.053);
  var clear  = charge(x, 0.009);
  var stamp  = charge(x, 0.003);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + clear + stamp + sebi;
}

function equityOptionsSellCharges(x: number) {
  var broker = 20.00;
  var sttctt = charge(x, 0.05);
  var gst    = charge(broker + sttctt, 18.0);
  var exch   = charge(x, 0.053);
  var clear  = charge(x, 0.009);
  var stamp  = charge(x, 0.003);
  var sebi   = charge(x, 0.0001);
  return broker + sttctt + gst + exch + clear + stamp + sebi;
}

/**
 * Get equity options charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function equityOptionsCharges(side: OrderSide, value: number) {
  if (side === "BUY") return equityOptionsBuyCharges(value);
  return equityOptionsSellCharges(value);
}


function currencyFuturesBuySellCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.00115);
  var clear  = charge(x, 0.0005);
  var stamp  = charge(x, 0.0001);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + clear + stamp + sebi;
}

/**
 * Get currency futures charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function currencyFuturesCharges(side: OrderSide, value: number) {
  return currencyFuturesBuySellCharges(value);
}


function currencyOptionsBuySellCharges(x: number) {
  var broker = 20.00;
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.04);
  var clear  = charge(x, 0.009);
  var stamp  = charge(x, 0.0001);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + clear + stamp + sebi;
}

/**
 * Get currency options charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function currencyOptionsCharges(side: OrderSide, value: number) {
  return currencyOptionsBuySellCharges(value);
}


function commodityFuturesBuyCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var gst    = charge(broker, 18.0);
  var exch   = charge(x, 0.0026);
  var clear  = charge(x, 0.0018);
  var stamp  = charge(x, 0.002);
  var sebi   = charge(x, 0.0001);
  return broker + gst + exch + clear + stamp + sebi;
}

function commodityFuturesSellCharges(x: number) {
  var broker = Math.min(20.00, charge(x, 0.03));
  var sttctt = charge(x, 0.01);
  var gst    = charge(broker + sttctt, 18.0);
  var exch   = charge(x, 0.0026);
  var clear  = charge(x, 0.0018);
  var stamp  = charge(x, 0.002);
  var sebi   = charge(x, 0.0001);
  return broker + sttctt + gst + exch + clear + stamp + sebi;
}

/**
 * Get commodity futures charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function commodityFuturesCharges(side: OrderSide, value: number) {
  if (side === "BUY") return commodityFuturesBuyCharges(value);
  return commodityFuturesSellCharges(value);
}


function commodityOptionsBuyCharges(x: number) {
  var broker = 20.00;
  var gst    = charge(broker, 18.0);
  var clear  = charge(x, 0.05);
  var stamp  = charge(x, 0.0003);
  var sebi   = charge(x, 0.0001);
  return broker + gst + clear + stamp + sebi;
}

function commodityOptionsSellCharges(x: number) {
  var broker = 20.00;
  var sttctt = charge(x, 0.05);
  var gst    = charge(broker + sttctt, 18.0);
  var clear  = charge(x, 0.05);
  var stamp  = charge(x, 0.0003);
  var sebi   = charge(x, 0.0001);
  return broker + sttctt + gst + clear + stamp + sebi;
}

/**
 * Get commodity options charges.
 * @param side order side (BUY, SELL)
 * @param value traded value
 * @returns total charges including brokerage and taxes
 */
 export function commodityOptionsCharges(side: OrderSide, value: number) {
  if (side === "BUY") return commodityOptionsBuyCharges(value);
  return commodityOptionsSellCharges(value);
}




// ERROR
// -----

/** Defines a FYERS error {code, message}. */
class ApiError extends Error {
  /** Error code (-ve). */
  code: number

  /**
   * Create an error associated with FYERS API.
   * @param code error code (-ve)
   * @param message error message
   */
  constructor(code: number, message: string) {
    super(message);
    this.code  = code;
    this.name  = this.constructor.name;
    this.stack = (new Error(message)).stack;
  }
}




// STATELESS INTERFACE
// ===================

// LOGIN
// -----

/**
 * Get request step 1 for authorization.
 * @param appId app_id which you have received after creating the app
 * @param redirectUrl where the user will be redirected after login
 * @param state same value will be returned after login to the redirect url
 * @returns request step 1 for authorization
 */
export function loginStep1(appId: string, redirectUrl: string, state: string="default"): HttpRequestOptions {
  return http.loginStep1(fromLoginStep1Request({appId, redirectUrl, state}));
}


/**
 * Get request step 2 for authorization.
 * @param appHash SHA-256 of `api_id:app_secret` in hex
 * @param authorizationCode auth_code which is received from the first step
 * @returns request step 2 for authorization
 */
export function loginStep2(appHash: string, authorizationCode: string): HttpRequestOptions {
  return http.loginStep2(fromLoginStep2Request({appHash, authorizationCode}));
}




// USER
// ----

function validateApiStatus(x: http.Response) {
  if (x.s !== "ok") throw new ApiError(x.code, x.message);
}

function validateApiOrder(x: http.OrderResponse) {
  if (x.id === "") throw new ApiError(x.code, x.message);
}


/**
 * Get basic details of the client.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's profile {id, email, name, ...}
 */
export async function getProfile(auth: Authorization): Promise<Profile> {
  var a = await http.getProfile(fromAuthorization(auth));
  validateApiStatus(a);
  return toProfile(a);
}


/**
 * Get balance available for the user for capital as well as the commodity market.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's funds {equity: {start, ...}, commodity: {start, ...}}
 */
export async function getFunds(auth: Authorization): Promise<Funds> {
  var a = await http.getFunds(fromAuthorization(auth));
  validateApiStatus(a);
  return toFunds(a);
}


/**
 * Get the equity and mutual fund holdings which the user has in this demat account.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's holdings {details: [{isin, ...}], overall: {count, ...}}
 */
export async function getHoldings(auth: Authorization): Promise<Holdings> {
  var a = await http.getHoldings(fromAuthorization(auth));
  validateApiStatus(a);
  return toHoldings(a);
}




// TRANSACTION-INFO
// ----------------

/**
 * Get details of an order placed in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @param id order id
 * @returns details of an order {id, symbol, ticker, ...}
 */
export async function getOrder(auth: Authorization, id: string): Promise<Order> {
  var a = await http.getOrder(fromAuthorization(auth), {id});
  validateApiStatus(a);
  return toOrder(a.orderBook[0]);
}


/**
 * Get details of all the orders placed in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of orders {details: [{id, ...}], overall: {count, ...}}
 */
export async function getOrders(auth: Authorization): Promise<Orders> {
  var a = await http.getOrders(fromAuthorization(auth));
  validateApiStatus(a);
  return toOrders(a);
}


/**
 * Get details of all the positions in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of positions {details: [{id, ...}], overall: {count, ...}}
 */
export async function getPositions(auth: Authorization): Promise<Positions> {
  var a = await http.getPositions(fromAuthorization(auth));
  validateApiStatus(a);
  return toPositions(a);
}


/**
 * Get details of all the trades in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of trades {details: [{id, ...}], overall: {count, ...}}
 */
export async function getTrades(auth: Authorization): Promise<Trades> {
  var a = await http.getTrades(fromAuthorization(auth));
  validateApiStatus(a);
  return toTrades(a);
}




// ORDER-PLACEMENT
// ---------------

/**
 * Place an order to any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param order details of an order {symbol, qty, type, side, ...}
 * @returns order id
 */
export async function placeOrder(auth: Authorization, order: PlaceOrder): Promise<string> {
  var a = await http.placeOrder(fromAuthorization(auth), fromPlaceOrder(order));
  validateApiOrder(a);
  return a.id;
}


/**
 * Place multiple orders to any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param orders details of multiple orders [{symbol, qty, type, side, ...}]
 * @returns unique order ids
 */
export function placeOrders(auth: Authorization, orders: PlaceOrder[]): Promise<string>[] {
  var p = http.placeOrders(fromAuthorization(auth), orders.map(fromPlaceOrder));
  return orders.map((_, i) => p.then(a => {
    validateApiStatus(a);
    validateApiOrder(a.data[i].body);
    return a.data[i].body.id;
  }));
}




// OTHER-TRANSACTIONS
// ------------------

/**
 * Modifies an order placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param order details of order {id, qty, type, side, ...}
 * @returns order id
 */
export async function modifyOrder(auth: Authorization, order: ModifyOrder): Promise<string> {
  var a = await http.modifyOrder(fromAuthorization(auth), fromModifyOrder(order));
  validateApiStatus(a);
  return a.id;
}


/**
 * Modifies orders placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param orders details of orders [{id, qty, type, side, ...}]
 * @returns unique order ids
 */
export function modifyOrders(auth: Authorization, orders: ModifyOrder[]): Promise<void>[] {
  var p = http.modifyOrders(fromAuthorization(auth), orders.map(fromModifyOrder));
  return orders.map((_, i) => p.then(a => {
    validateApiStatus(a);
    validateApiOrder(a.data[i].body);
  }));
}


/**
 * Cancels an order placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param id order id
 * @returns order id
 */
export async function cancelOrder(auth: Authorization, id: string): Promise<void> {
  var a = await http.cancelOrder(fromAuthorization(auth), {id});
  validateApiStatus(a);
}


/**
 * Cancels orders placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param ids unique order ids
 * @returns unique order ids
 */
export function cancelOrders(auth: Authorization, ids: string[]): Promise<void>[] {
  var p = http.cancelOrders(fromAuthorization(auth), ids.map(id => ({id})));
  return ids.map((_, i) => p.then(a => {
    validateApiStatus(a);
    validateApiOrder(a.data[i].body);
  }));
}


/**
 * Exits a position on the current trading day.
 * @param auth authorization {appId, accessToken}
 * @param id position id
 */
export async function exitPosition(auth: Authorization, id: string): Promise<void> {
  var a = await http.exitPosition(fromAuthorization(auth), {id});
  validateApiStatus(a);
}


/**
 * Exits all positions on the current trading day.
 * @param auth authorization {appId, accessToken}
 */
export async function exitAllPositions(auth: Authorization): Promise<void> {
  var a = await http.exitAllPositions(fromAuthorization(auth));
  validateApiStatus(a);
}


/**
 * Converts a position on the current trading day.
 * @param auth authorization {appId, accessToken}
 * @param conversion details of conversion {symbol, side, quantity, ...}
 */
export async function convertPosition(auth: Authorization, conversion: ConvertPosition): Promise<void> {
  var a = await http.convertPosition(fromAuthorization(auth), fromConvertPosition(conversion));
  validateApiStatus(a);
}




// BROKER-CONFIG, DATA-API
// -----------------------

/**
 * Get the current market status of all the exchanges and their segments.
 * @param auth authorization {appId, accessToken}
 * @returns markets status {details: [{exchange, ...}], overall: {count, ...}}
 */
export async function getMarketStatus(auth: Authorization): Promise<MarketsStatus> {
  var a = await http.getMarketStatus(fromAuthorization(auth));
  validateApiStatus(a);
  return toMarketsStatus(a);
}


/**
 * Get the market history for a particular symbol.
 * @param auth authorization {appId, accessToken}
 * @param market market details {symbol, resolution, dateFormat, ...}
 * @returns market history {details: [{date, ...}], overall: {dateFrom, ...}}
 */
export async function getMarketHistory(auth: Authorization, market: GetMarketHistory): Promise<MarketHistory> {
  var a = await http.getMarketHistory(fromAuthorization(auth), fromGetMarketHistory(market));
  validateApiStatus(a);
  return toMarketHistory(a);
}


/**
 * Get the current market quotes for a set of symbols.
 * @param auth authorization {appId, accessToken}
 * @param symbols list of symbols
 * @returns market quotes [{symbol, name, exchange, ...}]
 */
export async function getMarketQuotes(auth: Authorization, symbols: string[]): Promise<MarketQuote[]> {
  var a = await http.getMarketQuotes(fromAuthorization(auth), {symbols: symbols.join()});
  validateApiStatus(a);
  return a.d.map(toMarketQuote);
}


/**
 * Get the current market depth for a particular symbol.
 * @param auth authorization {appId, accessToken}
 * @param symbol symbol name
 * @returns market depth {buyQuantity, sellQuantity, buyOffers, ...}
 */
export async function getMarketDepth(auth: Authorization, symbol: string): Promise<MarketDepth> {
  var a = await http.getMarketDepth(fromAuthorization(auth), {symbol, ohlcv_flag: 1});
  validateApiStatus(a);
  return toMarketDepth(a);
}


/**
 * Get all the latest symbols of all the exchanges from the symbol master files.
 * @param auth authorization (unused)
 * @param exchange exchange name
 * @param segment segment name
 * @returns symbol master file as text
 */
export function getSymbolMaster(auth: null, exchange: string, segment: string): Promise<string> {
  return http.getSymbolMaster(null, {exchange, segment});
}




// EDIS
// ----

/**
 * Generate e-DIS TPIN for validating/authorising transaction.
 * @param auth authorization {appId, accessToken}
 */
export async function generateEdisTpin(auth: Authorization): Promise<void> {
  var a = await http.generateEdisTpin(fromAuthorization(auth));
  validateApiStatus(a);
}


/**
 * Get the necessary information regarding the holdings you have on your and also the Status of the holdings. If the “sell” for the particular holdings is a success or not.
 * @param auth authorization {appId, accessToken}
 * @returns list of e-DIS transactions {data: [{transactionId, internalTxnId, ...}]}
 */
export async function getEdisTransactions(auth: Authorization): Promise<EdisTransactions> {
  var a = await http.getEdisTransactions(fromAuthorization(auth));
  validateApiStatus(a);
  return toEdisTransactions(a);
}


/**
 * Redirect to CDSL page for login where you can submit your Holdings information and accordingly you can provide the same to exchange to Sell your holdings (browser only).
 * @param auth authorization {appId, accessToken}
 * @param holdings holding details {recordLst: [{isin_code, qty}]}
 * @returns HTTP(s) request options (manual)
 */
export function submitEdisHoldingsStep(auth: Authorization, holdings: EdisHolding[]): HttpRequestOptions {
  return http.submitEdisHoldingsStep(fromAuthorization(auth), {recordLst: holdings.map(fromEdisHolding)});
}


/**
 * Inquire the information/status of the provided transaction Id for the respective holdings you have on your end.
 * @param auth authorization {appId, accessToken}
 * @param id transaction id
 * @returns edis status
 */
export async function inquireEdisTransaction(auth: Authorization, id: string): Promise<number> {
  var a = await http.inquireEdisTransaction(fromAuthorization(auth), {transactionId: id});
  validateApiStatus(a);
  return a.data.FAILED_CNT > 0? -a.data.FAILED_CNT : a.data.SUCEESS_CNT;
}




// NOTIFICATIONS
// =============

// MARKET-DATA
// -----------

/**
 * Connect to Market data URL with WebSocket.
 * @param auth authorization {appId, accessToken}
 * @param fn notified function
 * @returns WebSocket connection
 */
export function connectMarketData(auth: Authorization, fn: MarketDataNotifiedFunction): Promise<Connection> {
  return websocket.connectMarketData(fromAuthorization(auth), x => {
    if (x.d) fn(toMarketDataNotification(x));
  });
}


/**
 * Subscribe to market quote.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export async function subscribeMarketQuote(conn: Connection, symbols: string[]): Promise<void> {
  var a = await websocket.subscribeMarketQuote(conn, symbols);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}


/**
 * Subscribe to market depth.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export async function subscribeMarketDepth(conn: Connection, symbols: string[]): Promise<void> {
  var a = await websocket.subscribeMarketDepth(conn, symbols);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}


/**
 * Unsubscribe to market quote.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export async function unsubscribeMarketQuote(conn: Connection, symbols: string[]): Promise<void> {
  var a = await websocket.unsubscribeMarketQuote(conn, symbols);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}


/**
 * Unsubscribe to market depth.
 * @param conn websocket connection
 * @param symbols list of symbols
 */
export async function unsubscribeMarketDepth(conn: Connection, symbols: string[]): Promise<void> {
  var a = await websocket.unsubscribeMarketDepth(conn, symbols);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}




// ORDER-UPDATE
// ------------

/**
 * Connect to Order update URL with WebSocket.
 * @param auth authorization {appId, accessToken}
 * @param fn notified function
 * @returns WebSocket connection
 */
export function connectOrderUpdate(auth: Authorization, fn: OrderUpdateNotifiedFunction): Promise<Connection> {
  return websocket.connectOrderUpdate(fromAuthorization(auth), x => {
    if (x.d) fn(toOrderUpdateNotification(x));
  });
}


/**
 * Subscribe to order update.
 * @param conn websocket connection
 */
export async function subscribeOrderUpdate(conn: Connection): Promise<void> {
  var a = await websocket.subscribeOrderUpdate(conn);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}


/**
 * Unsubscribe to order update.
 * @param conn websocket connection
 */
export async function unsubscribeOrderUpdate(conn: Connection): Promise<void> {
  var a = await websocket.unsubscribeOrderUpdate(conn);
  if (a.code < 0) throw new ApiError(a.code, a.message);
}




// STATEFUL INTERFACE
// ==================

/** Container for storing authorization details. */
export class Api implements Authorization {
  appId: string;
  accessToken: string;


  /**
   * Create a container for storing authorization details.
   * @param appId unique app_id received after creating app
   * @param accessToken access token for the current trading day recieved after authorization
   */
  constructor(appId: string, accessToken: string) {
    this.appId       = appId;
    this.accessToken = accessToken;
  }


  /**
   * Get request step 1 for authorization.
   * @param appId app_id which you have received after creating the app
   * @param redirectUrl where the user will be redirected after login
   * @param state same value will be returned after login to the redirect url
   * @returns request step 1 for authorization
   */
  static loginStep1(appId: string, redirectUrl: string, state: string="default"): HttpRequestOptions {
    return loginStep1(appId, redirectUrl, state);
  }

  /**
   * Get request step 2 for authorization.
   * @param appHash SHA-256 of `api_id:app_secret` in hex
   * @param authorizationCode auth_code which is received from the first step
   * @returns request step 2 for authorization
   */
  static loginStep2(appHash: string, authorizationCode: string): HttpRequestOptions {
    return loginStep2(appHash, authorizationCode);
  }

  /**
   * Get basic details of the client.
   * @returns details of user's profile {id, email, name, ...}
   */
  getProfile() { return getProfile(this); }

  /**
   * Get balance available for the user for capital as well as the commodity market.
   * @returns details of user's funds {equity: {start, ...}, commodity: {start, ...}}
   */
  getFunds() { return getFunds(this); }

  /**
   * Get the equity and mutual fund holdings which the user has in this demat account.
   * @returns details of user's holdings {details: [{isin, ...}], overall: {count, ...}}
   */
  getHoldings() { return getHoldings(this); }

  /**
   * Get details of an order placed in the current trading day.
   * @param id order id
   * @returns details of an order {id, symbol, ticker, ...}
   */
  getOrder(id: string) { return getOrder(this, id); }

  /**
   * Get details of all the orders placed in the current trading day.
   * @returns details of orders {details: [{id, ...}], overall: {count, ...}}
   */
  getOrders() { return getOrders(this); }

  /**
   * Get details of all the positions in the current trading day.
   * @returns details of positions {details: [{id, ...}], overall: {count, ...}}
   */
  getPositions() { return getPositions(this); }

  /**
   * Get details of all the trades in the current trading day.
   * @returns details of trades {details: [{id, ...}], overall: {count, ...}}
   */
  getTrades() { return getTrades(this); }

  /**
   * Place an order to any exchange via Fyers.
   * @param order details of an order {symbol, qty, type, side, ...}
   * @returns order id
   */
  placeOrder(order: PlaceOrder) { return placeOrder(this, order); }

  /**
   * Place multiple orders to any exchange via Fyers.
   * @param orders details of multiple orders [{symbol, qty, type, side, ...}]
   * @returns unique order ids
   */
  placeOrders(orders: PlaceOrder[]) { return placeOrders(this, orders); }

  /**
   * Modifies an order placed on any exchange via Fyers.
   * @param order details of order {id, qty, type, side, ...}
   * @returns order id
   */
  modifyOrder(order: ModifyOrder) { return modifyOrder(this, order); }

  /**
   * Modifies orders placed on any exchange via Fyers.
   * @param orders details of orders [{id, qty, type, side, ...}]
   * @returns unique order ids
   */
  modifyOrders(orders: ModifyOrder[]) { return modifyOrders(this, orders); }

  /**
   * Cancels an order placed on any exchange via Fyers.
   * @param id order id
   * @returns order id
   */
  cancelOrder(id: string) { return cancelOrder(this, id); }

  /**
   * Cancels orders placed on any exchange via Fyers.
   * @param ids unique order ids
   * @returns unique order ids
   */
  cancelOrders(ids: string[]) { return cancelOrders(this, ids); }

  /**
   * Exits a position on the current trading day.
   * @param id position id
   * @returns position status
   */
  exitPosition(id: string) { return exitPosition(this, id); }

  /**
   * Exits all positions on the current trading day.
   * @returns positions status
   */
  exitAllPositions() { return exitAllPositions(this); }

  /**
   * Converts a position on the current trading day.
   * @param conversion details of conversion {symbol, side, quantity, ...}
   * @returns conversion status
   */
  convertPosition(conversion: ConvertPosition) { return convertPosition(this, conversion); }

  /**
   * Get the current market status of all the exchanges and their segments.
   * @returns markets status {details: [{exchange, ...}], overall: {count, ...}}
   */
  getMarketStatus() { return getMarketStatus(this); }

  /**
   * Get the market history for a particular symbol.
   * @param market market details {symbol, resolution, dateFormat, ...}
   * @returns market history {details: [{date, ...}], overall: {dateFrom, ...}}
   */
  getMarketHistory(market: GetMarketHistory) { return getMarketHistory(this, market); }

  /**
   * Get the current market quotes for a set of symbols.
   * @param symbols list of symbols
   * @returns market quotes [{symbol, name, exchange, ...}]
   */
  getMarketQuotes(symbols: string[]) { return getMarketQuotes(this, symbols); }

  /**
   * Get the current market depth for a particular symbol.
   * @param symbol symbol name
   * @returns market depth {buyQuantity, sellQuantity, buyOffers, ...}
   */
  getMarketDepth(symbol: string) { return getMarketDepth(this, symbol); }

  /**
   * Get all the latest symbols of all the exchanges from the symbol master files.
   * @param exchange exchange name
   * @param segment segment name
   * @returns symbol master file as text
   */
  static getSymbolMaster(exchange: string, segment: string) { return getSymbolMaster(null, exchange, segment); }

  /**
   * Generate e-DIS TPIN for validating/authorising transaction.
   * @returns optional data
   */
  generateEdisTpin() { return generateEdisTpin(this); }

  /**
   * Get the necessary information regarding the holdings you have on your and also the Status of the holdings. If the “sell” for the particular holdings is a success or not.
   * @returns list of e-DIS transactions {data: [{transactionId, internalTxnId, ...}]}
   */
  getEdisTransactions() { return getEdisTransactions(this); }

  /**
   * Redirect to CDSL page for login where you can submit your Holdings information and accordingly you can provide the same to exchange to Sell your holdings (browser only).
   * @param holdings holding details {recordLst: [{isin_code, qty}]}
   * @returns HTTP(s) request options (manual)
   */
  submitEdisHoldingsStep(holdings: EdisHolding[]) { return submitEdisHoldingsStep(this, holdings); }

  /**
   * Inquire the information/status of the provided transaction Id for the respective holdings you have on your end.
   * @param id transaction id
   * @returns edis status
   */
  inquireEdisTransaction(id: string) { return inquireEdisTransaction(this, id); }
}
