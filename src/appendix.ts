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
export function errorDescription(code: number): string {
  return ERROR_DESCRIPTION.get(code);
}




// YEAR2
// -----

/**
 * Get year2 description.
 * @param code year2 code (YY)
 * @returns year2 description
 */
export function year2Description(code: string): string {
  var val = parseInt(code, 10);
  return val > 50? "19" + code : "20" + code;
}

/**
 * Get year2 code.
 * @param desc year2 description
 * @returns year2 code (YY)
 */
export function year2(desc: string): string {
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
export function month3Description(code: string): string {
  return MONTH3_DESCRIPTION.get(code);
}

/**
 * Get month3 code.
 * @param desc month3 description
 * @returns month3 code (MMM)
 */
export function month3(desc: string): string {
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
export function month1Description(code: string): string {
  return MONTH1_DESCRIPTION.get(code);
}

/**
 * Get month1 code.
 * @param desc month1 description
 * @returns month1 code (MMM)
 */
export function month1(desc: string): string {
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
export function day2Description(code: string): string {
  return code.replace(/^0+/, "");
}

/**
 * Get day2 code.
 * @param desc day2 description
 * @returns day2 code (DD)
 */
export function day2(desc: string): string {
  return desc.padStart(2, "0");
}




// EXCHANGE
// --------

/** Exchange code. */
export enum Exchange {
  /** National Stock Exchange. */
  NSE = 10,
  /** Multi Commodity Exchange. */
  MCX = 11,
  /** Bombay Stock Exchange. */
  BSE = 12,
}


const EXCHANGE_DESCRIPTION: Map<number, string> = new Map([
  [10, "National Stock Exchange (NSE)"],
  [11, "Multi Commodity Exchange (MCX)"],
  [12, "Bombay Stock Exchange (BSE)"],
]);

const EXCHANGE_CODE: Map<string, number> = new Map([
  ["N", 10],
  ["M", 11],
  ["B", 12],
]);


/**
 * Get exchange description.
 * @param code exchange code (10, 11, 12)
 * @returns exchange description
 */
export function exchangeDescription(code: number): string {
  return EXCHANGE_DESCRIPTION.get(code);
}

/**
 * Get exchange code.
 * @param desc exchange description
 * @returns exchange code (10, 11, 12)
 */
export function exchange(desc: string): number {
  var key = desc.charAt(0).toUpperCase();
  return EXCHANGE_CODE.get(key);
}




// SEGMENT
// -------

/** Segment code. */
export enum Segment {
  /** Capital Market (CM). */
  Capital    = 10,
  /** Equity Derivatives (FO). */
  Derivative = 11,
  /** Currency Derivatives (CD). */
  Currency   = 12,
  /** Commodity Derivatives (COM). */
  Commodity  = 20,
}


const SEGMENT_DESCRIPTION: Map<number, string> = new Map([
  [10, "Capital Market (CM)"],
  [11, "Equity Derivatives (FO)"],
  [12, "Currency Derivatives (CD)"],
  [20, "Commodity Derivatives (COM)"],
]);

const SEGMENT_CODE: Map<string, number> = new Map([
  ["CM",  10],
  ["FO",  11],
  ["CD",  12],
  ["COM", 20],
]);


/**
 * Get segment description.
 * @param code segment code (10, 11, 12, 20)
 * @returns segment description
 */
export function segmentDescription(code: number): string {
  return SEGMENT_DESCRIPTION.get(code);
}

/**
 * Get segment code.
 * @param desc segment description
 * @returns segment code (10, 11, 12, 20)
 */
export function segment(desc: string): number {
  var key = "CM";
  if (/^com/i.test(desc)) key = "COM";
  else if (/^cur/i.test(desc)) key = "CD";
  else if (/der|fut|opt/i.test(desc)) key = "FO";
  return SEGMENT_CODE.get(key);
}




// POSITION-SIDE
// -------------

/** Position side code. */
export enum PositionSide {
  /** Long position. */
  Long   =  1,
  /** Short position. */
  Short  = -1,
  /** Closed position. */
  Closed =  0,
}


const POSITION_SIDE_DESCRIPTION: Map<number, string> = new Map([
  [1,  "Long"],
  [-1, "Short"],
  [0,  "Closed position"],
]);

const POSITION_SIDE_CODE: Map<string, number> = new Map([
  ["L",  1],
  ["S", -1],
  ["C",  0],
]);


/**
 * Get position side description.
 * @param code position side code (1, -1, 0)
 * @returns position side description
 */
export function positionSideDescription(code: number): string {
  return POSITION_SIDE_DESCRIPTION.get(code);
}

/**
 * Get position side code.
 * @param desc position side description
 * @returns position side code (1, -1, 0)
 */
export function positionSide(desc: string): number {
  var key = desc.charAt(0).toUpperCase();
  return POSITION_SIDE_CODE.get(key);
}




// ORDER-SIDE
// ----------

/** Order side code. */
export enum OrderSide {
  /** Buy order. */
  Buy  =  1,
  /** Sell order. */
  Sell = -1
}


const ORDER_SIDE_DESCRIPTION: Map<number, string> = new Map([
  [1,  "Buy"],
  [-1, "Sell"],
]);

const ORDER_SIDE_CODE: Map<string, number> = new Map([
  ["B", 1],
  ["S", -1],
]);


/**
 * Get order side description.
 * @param code order side code (1, -1)
 * @returns order side description
 */
export function orderSideDescription(code: number): string {
  return ORDER_SIDE_DESCRIPTION.get(code);
}

/**
 * Get order side code.
 * @param desc order side description
 * @returns order side code (1, -1)
 */
export function orderSide(desc: string): number {
  var key = desc.charAt(0).toUpperCase();
  return ORDER_SIDE_CODE.get(key);
}




// ORDER-SOURCE
// ------------

/** Order source code. */
export enum OrderSource {
  /** FYERS Mobile. */
  Mobile   = "M",
  /** FYERS Web. */
  Web      = "W",
  /** FYERS One (desktop). */
  FyersOne = "R",
  /** Admin. */
  Admin    = "A",
  /** FYERS API. */
  API      = "ITS",
}


const ORDER_SOURCE_DESCRIPTION: Map<string, string> = new Map([
  ["M",   "Mobile"],
  ["W",   "Web"],
  ["R",   "Fyers One"],
  ["A",   "Admin"],
  ["ITS", "API"],
]);

const ORDER_SOURCE_CODE: Map<string, string> = new Map([
  ["MO", "M"],
  ["WE", "W"],
  ["ON", "R"],
  ["AD", "A"],
  ["AP", "ITS"],
]);


/**
 * Get order source description.
 * @param code order source code (M, W, R, A, ITS)
 * @returns order source description
 */
export function orderSourceDescription(code: string): string {
  return ORDER_SOURCE_DESCRIPTION.get(code);
}

/**
 * Get order source code.
 * @param desc order source description
 * @returns order source code (M, W, R, A, ITS)
 */
export function orderSource(desc: string): string {
  var words = desc.split(" ");
  var key   = words[words.length-1].substring(0, 2).toUpperCase();
  return ORDER_SOURCE_CODE.get(key);
}




// ORDER-STATUS
// ------------

/** Order status code. */
export enum OrderStatus {
  /** Order has been cancelled. */
  Cancelled = 1,
  /** Order has been traded/filled. */
  Traded    = 2,
  /** For future use. */
  Unused    = 3,
  /** Order is in progress. */
  Transit   = 4,
  /** Order has been rejected. */
  Rejected  = 5,
  /** Order is still pending execution. */
  Pending   = 6,
  /** Order has expired. */
  Expired   = 7,
}


const ORDER_STATUS_DESCRIPTION: Map<number, string> = new Map([
  [1, "Cancelled"],
  [2, "Traded / Filled"],
  [3, "For future use"],
  [4, "Transit"],
  [5, "Rejected"],
  [6, "Pending"],
  [7, "Expired"],
]);

const ORDER_STATUS_CODE: Map<string, number> = new Map([
  ["C", 1],
  ["F", 2],
  ["T", 4],
  ["R", 5],
  ["P", 6],
  ["E", 7],
]);


/**
 * Get order status description.
 * @param code order status code (1, 2, 3, 4, 5, 6, 7)
 * @returns order status description
 */
export function orderStatusDescription(code: number): string {
  return ORDER_STATUS_DESCRIPTION.get(code);
}

/**
 * Get order status code.
 * @param desc order status description
 * @returns order status code (1, 2, 3, 4, 5, 6, 7)
 */
export function orderStatus(desc: string): number {
  if (/traded/i.test(desc)) desc = "Filled";
  var key = desc.charAt(0).toUpperCase();
  return ORDER_STATUS_CODE.get(key);
}




// ORDER-TYPE
// ----------

/** Order type code. */
export enum OrderType {
  /** Limit order. */
  Limit  = 1,
  /** Market order. */
  Market = 2,
  /** Market order with stop loss (SL-M). */
  SlMarket = 3,
  /** Limit order with stop loss (SL-L) */
  SlLimit  = 4,
}


const ORDER_TYPE_DESCRIPTION: Map<number, string> = new Map([
  [1, "Limit order"],
  [2, "Market order"],
  [3, "Stop order (SL-M)"],
  [4, "Stoplimit order (SL-L)"],
]);

const ORDER_TYPE_CODE: Map<string, number> = new Map([
  ["L", 1],
  ["M", 2],
  ["S", 3],
  ["R", 4],
]);


/**
 * Get order type description.
 * @param code order type code (1, 2, 3, 4)
 * @returns order type description
 */
export function orderTypeDescription(code: number): string {
  return ORDER_TYPE_DESCRIPTION.get(code);
}

/**
 * Get order type code.
 * @param desc order type description
 * @returns order type code (1, 2, 3, 4)
 */
export function orderType(desc: string): number {
  var key = desc.charAt(0).toUpperCase();
  if (/s.+l(?!oss)/i.test(desc)) key = "R";
  return ORDER_TYPE_CODE.get(key);
}




// ORDER-VALIDITY
// --------------

/** Order validity code. */
export enum OrderValidity {
  /** End of day validity (DAY). */
  Day = "DAY",
  /** Immediate or Cancel validity (IOC). */
  IOC = "IOC",
}


const ORDER_VALIDITY_DESCRIPTION: Map<string, string> = new Map([
  ["DAY", "End of day validity (DAY)"],
  ["IOC", "Immediate or Cancel validity (IOC)"],
]);


/**
 * Get order validity description.
 * @param code order validity code (DAY, IOC)
 * @returns order validity description
 */
export function orderValidityDescription(code: string): string {
  return ORDER_VALIDITY_DESCRIPTION.get(code);
}

/**
 * Get order validity code.
 * @param desc order validity description
 * @returns order validity code (DAY, IOC)
 */
export function orderValidity(desc: string): string {
  return /ioc|imm/i.test(desc)? "IOC" : "DAY";
}




// OPTION-TYPE
// -----------

/** Option type code. */
export enum OptionType {
  /** Call option. */
  Call = "CE",
  /** Put option. */
  Put  = "PE",
}


const OPTION_TYPE_DESCRIPTION: Map<string, string> = new Map([
  ["CE", "Call Option (CE)"],
  ["PE", "Put Option (PE)"],
]);


/**
 * Get option type description.
 * @param code option type code (CE, PE)
 * @returns option type description
 */
export function optionTypeDescription(code: string): string {
  return OPTION_TYPE_DESCRIPTION.get(code);
}

/**
 * Get option type code.
 * @param desc option type description
 * @returns option type code (CE, PE)
 */
export function optionType(desc: string): string {
  return /^[ps]/i.test(desc)? "PE" : "CE";
}




// HOLDING-TYPE
// ------------

/** Holding type code. */
export enum HoldingType {
  /** The shares are purchased but not yet delivered to the demat account. */
  Purchased = "T1",
  /** The shares are purchased and are available in the demat account. */
  Delivered = "HLD",
}


const HOLDING_TYPE_DESCRIPTION: Map<string, string> = new Map([
  ["T1",  "The shares are purchased but not yet delivered to the demat account"],
  ["HLD", "The shares are purchased and are available in the demat account"],
]);


/**
 * Get holding type description.
 * @param code holding type code (T1, HLD)
 * @returns holding type description
 */
export function holdingTypeDescription(code: string): string {
  return HOLDING_TYPE_DESCRIPTION.get(code);
}

/**
 * Get holding type code.
 * @param desc holding type description
 * @returns holding type code (T1, HLD)
 */
export function holdingType(desc: string): string {
  return /not|un/i.test(desc)? "T1" : "HLD";
}




// PRODUCT-TYPE
// ------------

/** Product type code. */
export enum ProductType {
  /** Cash N Carry or Delivery Order, for equity only. */
  CNC      = "CNC",
  /** Intraday Order, applicable for all segments. */
  Intraday = "INTRADAY",
  /** Margin Order, applicable only for derivatives. */
  Margin   = "MARGIN",
  /** Cover Order. */
  Cover    = "CO",
  /** Bracket Order. */
  Bracket  = "BO",
}


const PRODUCT_TYPE_DESCRIPTION: Map<string, string> = new Map([
  ["CNC",      "Cash N Carry or Delivery Order, for equity only (CNC)"],
  ["INTRADAY", "Intraday Order, applicable for all segments (INTRADAY)"],
  ["MARGIN",   "Margin Order, applicable only for derivatives (MARGIN)"],
  ["CO",       "Cover Order (CO)"],
  ["BO",       "Bracket Order (BO)"],
]);

const PRODUCT_TYPE_CODE: Map<string, string> = new Map([
  ["D", "CNC"],
  ["I", "INTRADAY"],
  ["M", "MARGIN"],
  ["M", "MARGIN"],
  ["C", "CO"],
  ["B", "BO"],
]);


/**
 * Get product type description.
 * @param code product type code (CNC, INTRADAY, MARGIN, CO, BO)
 * @returns product type description
 */
export function productTypeDescription(code: string): string {
  return PRODUCT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get product type code.
 * @param desc product type description
 * @returns product type code (CNC, INTRADAY, MARGIN, CO, BO)
 */
export function productType(desc: string): string {
  if (/cnc|cash|carry/i.test(desc)) desc = "Delivery";
  var key = desc.charAt(0).toUpperCase();
  return PRODUCT_TYPE_CODE.get(key);
}




// INSTRUMENT-TYPE
// ---------------

/** Instrument type code. */
export enum InstrumentType {
  // CM segment
  /** Equity Shares. */
  EQ = 0,
  /** Preference Shares. */
  PREFSHARES = 1,
  /** Collateral-free Debt. */
  DEBENTURES = 2,
  /** Warrants on Stock. */
  WARRANTS   = 3,
  /** Miscellaneous. */
  MISC   = 4,
  /** Stock Market Index. */
  INDEX  = 10,
  // FO segment
  /** Futures on Index. */
  FUTIDX = 11,
  /** Futures on Volatility Index. */
  FUTIVX = 12,
  /** Futures on Stock. */
  FUTSTK = 13,
  /** Options on Index. */
  OPTIDX = 14,
  /** Options on Stock. */
  OPTSTK = 15,
  // CD segment
  /** Futures on Currency. */
  FUTCUR = 16,
  /** Futures on Government of India Treasury Bills. */
  FUTIRT = 17,
  /** Futures on Government of India Bonds. */
  FUTIRC = 18,
  /** Options on Currency. */
  OPTCUR = 19,
  /** Underlying on Currency. */
  UNDCUR = 20,
  /** Underlying on Government of Bonds. */
  UNDIRC = 21,
  /** Underlying on Government of India Treasury Bills. */
  UNDIRT = 22,
  /** Underlying on 10 Year Notional coupon bearing GOI security. */
  UNDIRD = 23,
  /** Market-indexed Certificate of deposit. */
  INDEX_CD = 24,
  /** Futures on 10 Year Notional coupon bearing GOI security. */
  FUTIRD = 25,
  // COM segment
  /** Futures on Commodity Index. */
//FUTIDX = 11,
  /** Futures on Commodity */
  FUTCOM = 30,
  /** Options on Commodity Futures. */
  OPTFUT = 31,
  /** Options on Commodity. */
  OPTCOM = 32,
}


const INSTRUMENT_TYPE_DESCRIPTION: Map<number, string> = new Map([
  // CM segment
  [0,  "Equity Shares (EQ)"],
  [1,  "Preference Shares (PREFSHARES)"],
  [2,  "Collateral-free Debt (DEBENTURES)"],
  [3,  "Warrants on Stock (WARRANTS)"],
  [4,  "Miscellaneous (MISC)"],
  [10, "Stock Market Index (INDEX)"],
  // FO segment
  [11, "Futures on Index (FUTIDX)"],
  [12, "Futures on Volatility Index (FUTIVX)"],
  [13, "Futures on Stock (FUTSTK)"],
  [14, "Options on Index (OPTIDX)"],
  [15, "Options on Stock (OPTSTK)"],
  // CD segment
  [16, "Futures on Currency (FUTCUR)"],
  [17, "Futures on Government of India Treasury Bills (FUTIRT)"],
  [18, "Futures on Government of India Bonds (FUTIRC)"],
  [19, "Options on Currency (OPTCUR)"],
  [20, "Underlying on Currency (UNDCUR)"],
  [21, "Underlying on Government of Bonds (UNDIRC)"],
  [22, "Underlying on Government of India Treasury Bills (UNDIRT)"],
  [23, "Underlying on 10 Year Notional coupon bearing GOI security (UNDIRD)"],
  [24, "Market-indexed Certificate of deposit (INDEX_CD)"],
  [25, "Futures on 10 Year Notional coupon bearing GOI security (FUTIRD)"],
  // COM segment
//[11, "Futures on Commodity Index (FUTIDX)"],
  [30, "Futures on Commodity (FUTCOM)"],
  [31, "Options on Commodity Futures (OPTFUT)"],
  [32, "Options on Commodity (OPTCOM)"],
]);

const INSTRUMENT_TYPE_CODE: Map<string, number> = new Map([
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


/**
 * Get instrument type description.
 * @param code instrument type code (0-32)
 * @returns instrument type description
 */
export function instrumentTypeDescription(code: number): string {
  return INSTRUMENT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get instrument type code.
 * @param desc instrument type description
 * @returns instrument type code (0-32)
 */
export function instrumentType(desc: string): number {
  var key = "EQ";
  var fut = /fut|future/i.test(desc);
  var opt = /opt|option/i.test(desc);
  var idx = /idx|index/i.test(desc);
  var und = /und|underlying/i.test(desc);
  // COM segment
  if (/com(\b|$)|commodit/i.test(desc)) {
    if (opt) key = fut? "OPTFUT" : "OPTCOM";
    else if (idx) key = "FUTIDX_COM";
    else          key = "FUTCOM";
  }
  // CD segment
  else if (/(^|\b)und|cd(\b|$)|ir[cdt](\b|$)|cur|gov|bond|trea|coup/i.test(desc)) {
    if (/irc(\b|$)|bond/i.test(desc))      key = und? "UNDIRC" : "FUTIRC";
    else if (/ird(\b|$)|coup/i.test(desc)) key = und? "UNDIRD" : "FUTIRD";
    else if (/irt(\b|$)|trea/i.test(desc)) key = und? "UNDIRT" : "FUTIRT";
    else                key = idx? "INDEX_CD" : (opt? "OPTCUR" : "FUTCUR");
  }
  // FO segment
  else if (fut || opt) {
    if (/ivx|volatil/i.test(desc)) key = "FUTIVX";
    else if (idx) key = opt? "OPTIDX" : "FUTIDX";
    else          key = opt? "OPTSTK" : "FUTSTK";
  }
  // CM segment
  else {
    if (idx)                        key = "INDEX";
    else if (/misc/i.test(desc))    key = "MISC";
    else if (/warrant/i.test(desc)) key = "WARRANTS";
    else if (/deb/i.test(desc))     key = "DEBENTURES";
    else if (/pref/i.test(desc))    key = "PREFSHARES";
    else                            key = "EQ";
  }
  return INSTRUMENT_TYPE_CODE.get(key);
}
