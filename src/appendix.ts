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
export function describeError(code: number): string {
  return ERROR_DESCRIPTION.get(code);
}




// // YEAR2
// // -----

// /**
//  * Get year2 description.
//  * @param code year2 code (YY)
//  * @returns year2 description
//  */
// export function describeYear2(code: string): string {
//   var val = parseInt(code, 10);
//   return val > 50? "19" + code : "20" + code;
// }

// /**
//  * Get year2 code.
//  * @param desc year2 description
//  * @returns year2 code (YY)
//  */
// function year2(desc: string): string {
//   return desc.substring(2);
// }




// // MONTH3
// // ------

// const MONTH3_DESCRIPTION: Map<string, string> = new Map([
//   ["JAN", "January"],
//   ["FEB", "February"],
//   ["MAR", "March"],
//   ["APR", "April"],
//   ["MAY", "May"],
//   ["JUN", "June"],
//   ["JUL", "July"],
//   ["AUG", "August"],
//   ["SEP", "September"],
//   ["OCT", "October"],
//   ["NOV", "November"],
//   ["DEC", "December"],
// ]);


// /**
//  * Get month3 description.
//  * @param code month3 code (MMM)
//  * @returns month3 description
//  */
// export function month3Description(code: string): string {
//   return MONTH3_DESCRIPTION.get(code);
// }

// /**
//  * Get month3 code.
//  * @param desc month3 description
//  * @returns month3 code (MMM)
//  */
// export function month3(desc: string): string {
//   return desc.substring(0, 3).toUpperCase();
// }




// // MONTH1
// // ------

// const MONTH1_DESCRIPTION: Map<string, string> = new Map([
//   ["1", "January"],
//   ["2", "February"],
//   ["3", "March"],
//   ["4", "April"],
//   ["5", "May"],
//   ["6", "June"],
//   ["7", "July"],
//   ["8", "August"],
//   ["9", "September"],
//   ["O", "October"],
//   ["N", "November"],
//   ["D", "December"],
// ]);

// const MONTH1_CODE: Map<string, string> = new Map([
//   ["JAN", "1"],
//   ["FEB", "2"],
//   ["MAR", "3"],
//   ["APR", "4"],
//   ["MAY", "5"],
//   ["JUN", "6"],
//   ["JUL", "7"],
//   ["AUG", "8"],
//   ["SEP", "9"],
//   ["OCT", "O"],
//   ["NOV", "N"],
//   ["DEC", "D"],
// ]);


// /**
//  * Get month1 description.
//  * @param code month1 code (MMM)
//  * @returns month1 description
//  */
// export function month1Description(code: string): string {
//   return MONTH1_DESCRIPTION.get(code);
// }

// /**
//  * Get month1 code.
//  * @param desc month1 description
//  * @returns month1 code (MMM)
//  */
// export function month1(desc: string): string {
//   var key = desc.substring(0, 3).toUpperCase();
//   return MONTH1_CODE.get(key);
// }




// // DAY2
// // ----

// /**
//  * Get day2 description.
//  * @param code day2 code (DD)
//  * @returns day2 description
//  */
// export function day2Description(code: string): string {
//   return code.replace(/^0+/, "");
// }

// /**
//  * Get day2 code.
//  * @param desc day2 description
//  * @returns day2 code (DD)
//  */
// export function day2(desc: string): string {
//   return desc.padStart(2, "0");
// }




// EXCHANGE
// --------

/** Exchange code. */
export type Exchange = "NSE" | "MCX" | "BSE";


const EXCHANGE_DESCRIPTION: Map<Exchange, string> = new Map([
  ["NSE", "National Stock Exchange"],
  ["MCX", "Multi Commodity Exchange"],
  ["BSE", "Bombay Stock Exchange"],
]);

const EXCHANGE_QUERY: Map<string, Exchange> = new Map([
  ["N", "NSE"],
  ["M", "MCX"],
  ["B", "BSE"],
]);


/**
 * Get exchange description.
 * @param code exchange code (NSE, MCX, BSE)
 * @returns exchange description
 */
export function describeExchange(code: Exchange): string {
  return EXCHANGE_DESCRIPTION.get(code);
}

/**
 * Get exchange code.
 * @param desc exchange description
 * @returns exchange code (NSE, MCX, BSE)
 */
export function queryExchange(desc: string): Exchange {
  var key = desc.charAt(0).toUpperCase();
  return EXCHANGE_QUERY.get(key) || "NSE";
}




// SEGMENT
// -------

/** Segment code. */
export type Segment = "CM" | "FO" | "CD" | "COM";


const SEGMENT_DESCRIPTION: Map<Segment, string> = new Map([
  ["CM",  "Capital Market"],
  ["FO",  "Equity Derivatives"],
  ["CD",  "Currency Derivatives"],
  ["COM", "Commodity Derivatives"],
]);


/**
 * Get segment description.
 * @param code segment code (CM, FO, CD, COM)
 * @returns segment description
 */
export function describeSegment(code: Segment): string {
  return SEGMENT_DESCRIPTION.get(code);
}

/**
 * Get segment code.
 * @param desc segment description
 * @returns segment code (CM, FO, CD, COM)
 */
export function querySegment(desc: string): Segment {
  if (/^com/i.test(desc)) return "COM";
  else if (/^cd|cur/i.test(desc)) return "CD";
  else if (/fo|fno|fut|opt|der/i.test(desc)) return "FO";
  return "CM";
}




// POSITION-SIDE
// -------------

/** Position side code. */
export type PositionSide = "LONG" | "SHORT" | "CLOSED";


const POSITION_SIDE_DESCRIPTION: Map<PositionSide, string> = new Map([
  ["LONG",   "Long position"],
  ["SHORT",  "Short position"],
  ["CLOSED", "Closed position"],
]);


/**
 * Get position side description.
 * @param code position side code (LONG, SHORT, CLOSED)
 * @returns position side description
 */
export function describePositionSide(code: PositionSide): string {
  return POSITION_SIDE_DESCRIPTION.get(code);
}

/**
 * Get position side code.
 * @param desc position side description
 * @returns position side code (LONG, SHORT, CLOSED)
 */
export function queryPositionSide(desc: string): PositionSide {
  if (/up|buy|long|rally/i.test(desc)) return "LONG";
  if (/down|sell|short|crash/i.test(desc)) return "SHORT";
  return "CLOSED";
}




// ORDER-SIDE
// ----------

/** Order side code. */
export type OrderSide = "BUY" | "SELL";


const ORDER_SIDE_DESCRIPTION: Map<OrderSide, string> = new Map([
  ["BUY",  "Buy"],
  ["SELL", "Sell"],
]);


/**
 * Get order side description.
 * @param code order side code (BUY, SELL)
 * @returns order side description
 */
export function describeOrderSide(code: OrderSide): string {
  return ORDER_SIDE_DESCRIPTION.get(code);
}

/**
 * Get order side code.
 * @param desc order side description
 * @returns order side code (BUY, SELL)
 */
export function queryOrderSide(desc: string): OrderSide {
  return /down|sell|short|crash/i.test(desc)? "SELL" : "BUY";
}




// ORDER-SOURCE
// ------------

/** Order source code. */
export type OrderSource = "MOBILE" | "WEB" | "ONE" | "ADMIN" | "API";


const ORDER_SOURCE_DESCRIPTION: Map<OrderSource, string> = new Map([
  ["MOBILE", "FYERS Mobile"],
  ["WEB",    "FYERS Web"],
  ["ONE",    "FYERS One"],
  ["ADMIN",  "Admin"],
  ["API",    "FYERS API"],
]);


/**
 * Get order source description.
 * @param code order source code (MOBILE, WEB, ONE, ADMIN, API)
 * @returns order source description
 */
export function describeOrderSource(code: OrderSource): string {
  return ORDER_SOURCE_DESCRIPTION.get(code);
}

/**
 * Get order source code.
 * @param desc order source description
 * @returns order source code (MOBILE, WEB, ONE, ADMIN, API)
 */
export function queryOrderSource(desc: string): OrderSource {
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


const ORDER_STATUS_DESCRIPTION: Map<OrderStatus, string> = new Map([
  ["CANCELLED", "Cancelled"],
  ["TRADED",    "Traded / Filled"],
  ["TRANSIT",   "Transit"],
  ["REJECTED",  "Rejected"],
  ["PENDING",   "Pending"],
  ["EXPIRED",   "Expired"],
]);

const ORDER_STATUS_QUERY: Map<string, OrderStatus> = new Map([
  ["C", "CANCELLED"],
  ["F", "TRADED"],
  ["T", "TRANSIT"],
  ["R", "REJECTED"],
  ["P", "PENDING"],
  ["E", "EXPIRED"],
]);


/**
 * Get order status description.
 * @param code order status code (CANCELLED, TRADED, ...)
 * @returns order status description
 */
export function describeOrderStatus(code: OrderStatus): string {
  return ORDER_STATUS_DESCRIPTION.get(code);
}

/**
 * Get order status code.
 * @param desc order status description
 * @returns order status code (CANCELLED, TRADED, ...)
 */
export function queryOrderStatus(desc: string): OrderStatus {
  var key = desc.charAt(0).toUpperCase();
  if (/traded/i.test(desc)) key = "F";
  return ORDER_STATUS_QUERY.get(key);
}




// ORDER-TYPE
// ----------

/** Order type code. */
export type OrderType = "LIMIT" | "MARKET" | "SL-MARKET" | "SL-LIMIT";


const ORDER_TYPE_DESCRIPTION: Map<OrderType, string> = new Map([
  ["LIMIT",     "Limit order"],
  ["MARKET",    "Market order"],
  ["SL-MARKET", "Stop order (SL-M)"],
  ["SL-LIMIT",  "Stoplimit order (SL-L)"],
]);

const ORDER_TYPE_QUERY: Map<string, OrderType> = new Map([
  ["L", "LIMIT"],
  ["M", "MARKET"],
  ["S", "SL-MARKET"],
  ["R", "SL-LIMIT"],
]);


/**
 * Get order type description.
 * @param code order type code (LIMIT, MARKET, SL-MARKET, SL-LIMIT)
 * @returns order type description
 */
export function describeOrderType(code: OrderType): string {
  return ORDER_TYPE_DESCRIPTION.get(code);
}

/**
 * Get order type code.
 * @param desc order type description
 * @returns order type code (LIMIT, MARKET, SL-MARKET, SL-LIMIT)
 */
export function queryOrderType(desc: string): OrderType {
  var key = desc.charAt(0).toUpperCase();
  if (/s.+l(?!oss)/i.test(desc)) key = "R";
  return ORDER_TYPE_QUERY.get(key);
}




// ORDER-VALIDITY
// --------------

/** Order validity code. */
export type OrderValidity = "DAY" | "IOC";

const ORDER_VALIDITY_DESCRIPTION: Map<OrderValidity, string> = new Map([
  ["DAY", "End of day validity"],
  ["IOC", "Immediate or Cancel validity"],
]);


/**
 * Get order validity description.
 * @param code order validity code (DAY, IOC)
 * @returns order validity description
 */
export function describeOrderValidity(code: OrderValidity): string {
  return ORDER_VALIDITY_DESCRIPTION.get(code);
}

/**
 * Get order validity code.
 * @param desc order validity description
 * @returns order validity code (DAY, IOC)
 */
export function queryOrderValidity(desc: string): OrderValidity {
  return /ioc|cancel|immediate/i.test(desc)? "IOC" : "DAY";
}




// OPTION-TYPE
// -----------

/** Option type code. */
export type OptionType = "CALL" | "PUT";

const OPTION_TYPE_DESCRIPTION: Map<OptionType, string> = new Map([
  ["CALL", "Call Option (CE)"],
  ["PUT", "Put Option (PE)"],
]);


/**
 * Get option type description.
 * @param code option type code (CALL, PUT)
 * @returns option type description
 */
export function describeOptionType(code: OptionType): string {
  return OPTION_TYPE_DESCRIPTION.get(code);
}

/**
 * Get option type code.
 * @param desc option type description
 * @returns option type code (CE, PE)
 */
export function queryOptionType(desc: string): OptionType {
  return /pe|put|sell/i.test(desc)? "PUT" : "CALL";
}




// HOLDING-TYPE
// ------------

/** Holding type code. */
export type HoldingType = "T1" | "HLD";

const HOLDING_TYPE_DESCRIPTION: Map<HoldingType, string> = new Map([
  ["T1",  "The shares are purchased but not yet delivered to the demat account"],
  ["HLD", "The shares are purchased and are available in the demat account"],
]);


/**
 * Get holding type description.
 * @param code holding type code (T1, HLD)
 * @returns holding type description
 */
export function describeHoldingType(code: HoldingType): string {
  return HOLDING_TYPE_DESCRIPTION.get(code);
}

/**
 * Get holding type code.
 * @param desc holding type description
 * @returns holding type code (T1, HLD)
 */
export function queryHoldingType(desc: string): HoldingType {
  return /un|not|pend|t1/i.test(desc)? "T1" : "HLD";
}




// PRODUCT-TYPE
// ------------

/** Product type code. */
export type ProductType = "CNC" | "INTRADAY" | "MARGIN" | "CO" | "BO";

const PRODUCT_TYPE_DESCRIPTION: Map<ProductType, string> = new Map([
  ["CNC",      "Cash N Carry or Delivery Order, for equity only"],
  ["INTRADAY", "Intraday Order, applicable for all segments"],
  ["MARGIN",   "Margin Order, applicable only for derivatives"],
  ["CO",       "Cover Order"],
  ["BO",       "Bracket Order"],
]);

const PRODUCT_TYPE_QUERY: Map<string, ProductType> = new Map([
  ["D", "CNC"],
  ["I", "INTRADAY"],
  ["M", "MARGIN"],
  ["C", "CO"],
  ["B", "BO"],
]);


/**
 * Get product type description.
 * @param code product type code (CNC, INTRADAY, MARGIN, CO, BO)
 * @returns product type description
 */
export function describeProductType(code: ProductType): string {
  return PRODUCT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get product type code.
 * @param desc product type description
 * @returns product type code (CNC, INTRADAY, MARGIN, CO, BO)
 */
export function queryProductType(desc: string): ProductType {
  var key = desc.charAt(0).toUpperCase();
  if (/cnc|cash|carry|deliver/i.test(desc)) key = "D";
  return PRODUCT_TYPE_QUERY.get(key);
}




// INSTRUMENT-TYPE
// ---------------

/** Instrument type code. */
export type InstrumentType =
  "EQ"     | "PREFSHARES" | "DEBENTURES" | "WARRANTS" | "MISC" | "INDEX" | // CM segment
  "FUTIDX" | "FUTIVX"     | "FUTSTK"     | "OPTIDX"   | "OPTSTK" | // FO segment
  "FUTCUR" | "FUTIRT"     | "FUTIRC"     | "OPTCUR"   | "UNDCUR" | "UNDIRC" | "UNDIRT" | "UNDIRD" | "INDEX_CD" | "FUTIRD" | // CD segment
  "FUTCOM" | "OPTFUT"     | "OPTCOM"; // COM segment

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


/**
 * Get instrument type description.
 * @param code instrument type code
 * @returns instrument type description
 */
export function decribeInstrumentType(code: InstrumentType): string {
  return INSTRUMENT_TYPE_DESCRIPTION.get(code);
}

/**
 * Get instrument type code.
 * @param desc instrument type description
 * @returns instrument type code
 */
export function queryInstrumentType(desc: string): InstrumentType {
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
