import {HttpRequestOptions} from './_http';
export {HttpHeaders, HttpRequestOptions} from './_http';
import * as appendix from './appendix';
export * as appendix from './appendix';
import * as http from './http';
export * as http from './http';




// APPENDIX
// ========

// ERROR, YEAR2, MONTH3, MONTH1, DAY2
// ----------------------------------

export {errorDescription}          from './appendix';
export {year2Description, year2}   from './appendix';
export {month3Description, month3} from './appendix';
export {month1Description, month1} from './appendix';
export {day2Description, day2}     from './appendix';




// EXCHANGE
// --------

/** Exchange code. */
export type Exchange = "NSE" | "MCX" | "BSE";


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
  return appendix.exchangeDescription(fromExchange(code));
}

/**
 * Get exchange code.
 * @param desc exchange description
 * @returns exchange code (NSE, MCX, BSE)
 */
export function exchange(desc: string): Exchange {
  return toExchange(appendix.exchange(desc));
}




// SEGMENT
// -------

/** Segment code. */
export type Segment = "CM" | "FO" | "CD" | "COM";


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
  return appendix.segmentDescription(fromSegment(code));
}

/**
 * Get segment code.
 * @param desc segment description
 * @returns segment code (CM, FO, CD, COM)
 */
export function segment(desc: string): Segment {
  return toSegment(appendix.segment(desc));
}




// POSITION-SIDE
// -------------

/** Position side code. */
export type PositionSide = "LONG" | "SHORT" | "CLOSED";


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
  return appendix.positionSideDescription(fromPositionSide(code));
}

/**
 * Get position side code.
 * @param desc position side description
 * @returns position side code (LONG, SHORT, CLOSED)
 */
export function positionSide(desc: string): PositionSide {
  return toPositionSide(appendix.positionSide(desc));
}




// ORDER-SIDE
// ----------

/** Order side code. */
export type OrderSide = "BUY" | "SELL";


const TO_ORDER_SIDE: Map<number, OrderSide> = new Map([
  [1,  "BUY"],
  [-1, "SELL"],
]);

const FROM_ORDER_SIDE: Map<OrderSide, number> = new Map([
  ["BUY",   1],
  ["SELL", -1],
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
  return appendix.orderSideDescription(fromOrderSide(code));
}

/**
 * Get order side code.
 * @param desc order side description
 * @returns order side code (BUY, SELL)
 */
export function orderSide(desc: string): OrderSide {
  return toOrderSide(appendix.orderSide(desc));
}




// ORDER-SOURCE
// ------------

/** Order source code. */
export type OrderSource = "MOBILE" | "WEB" | "ONE" | "ADMIN" | "API";


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
  return appendix.orderSourceDescription(fromOrderSource(code));
}

/**
 * Get order source code.
 * @param desc order source description
 * @returns order source code (MOBILE, WEB, ONE, ADMIN, API)
 */
export function orderSource(desc: string): OrderSource {
  return toOrderSource(appendix.orderSource(desc));
}




// ORDER-STATUS
// ------------

/** Order status code. */
export type OrderStatus = "CANCELLED" | "TRADED" | "TRANSIT" | "REJECTED" | "PENDING" | "EXPIRED";


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


function toOrderStatus(x: number): OrderStatus {
  return TO_ORDER_STATUS.get(x);
}

function fromOrderStatus(x: OrderStatus): number {
  return FROM_ORDER_STATUS.get(x);
}

/**
 * Get order status description.
 * @param code order status code (CANCELLED, TRADED, TRANSIT, REJECTED, PENDING, EXPIRED)
 * @returns order status description
 */
export function orderStatusDescription(code: OrderStatus): string {
  return appendix.orderStatusDescription(fromOrderStatus(code));
}

/**
 * Get order status code.
 * @param desc order status description
 * @returns order status code (CANCELLED, TRADED, TRANSIT, REJECTED, PENDING, EXPIRED)
 */
export function orderStatus(desc: string): OrderStatus {
  return toOrderStatus(appendix.orderStatus(desc));
}




// ORDER-TYPE
// ----------

/** Order type code. */
export type OrderType = "LIMIT" | "MARKET" | "SL-MARKET" | "SL-LIMIT";


const TO_ORDER_TYPE: Map<number, OrderType> = new Map([
  [1, "LIMIT"],
  [2, "MARKET"],
  [3, "SL-MARKET"],
  [4, "SL-LIMIT"],
]);

const FROM_ORDER_TYPE: Map<OrderType, number> = new Map([
  ["LIMIT",     1],
  ["MARKET",    2],
  ["SL-MARKET", 3],
  ["SL-LIMIT",  4],
]);


function toOrderType(x: number): OrderType {
  return TO_ORDER_TYPE.get(x);
}

function fromOrderType(x: OrderType): number {
  return FROM_ORDER_TYPE.get(x);
}


/**
 * Get order type description.
 * @param code order type code (LIMIT, MARKET, SL-MARKET, SL-LIMIT)
 * @returns order type description
 */
export function orderTypeDescription(code: OrderType): string {
  return appendix.orderTypeDescription(fromOrderType(code));
}

/**
 * Get order type code.
 * @param desc order type description
 * @returns order type code (LIMIT, MARKET, SL-MARKET, SL-LIMIT)
 */
export function orderType(desc: string): OrderType {
  return toOrderType(appendix.orderType(desc));
}




// ORDER-VALIDITY
// --------------

/** Order validity code. */
export type OrderValidity = "DAY" | "IOC";


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
  return appendix.orderValidity(fromOrderValidity(code));
}

/**
 * Get order validity code.
 * @param desc order validity description
 * @returns order validity code (DAY, IOC)
 */
export function orderValidity(desc: string): OrderValidity {
  return toOrderValidity(appendix.orderValidity(desc));
}




// OPTION-TYPE
// -----------

/** Option type code. */
export type OptionType = "CALL" | "PUT";


const TO_OPTION_TYPE: Map<string, OptionType> = new Map([
  ["CE", "CALL"],
  ["PE", "PUT"],
]);

const FROM_OPTION_TYPE: Map<OptionType, string> = new Map([
  ["CALL", "CE"],
  ["PUT",  "PE"],
]);


function toOptionType(x: string): OptionType {
  return TO_OPTION_TYPE.get(x);
}

function fromOptionType(x: OptionType): string {
  return FROM_OPTION_TYPE.get(x);
}

/**
 * Get option type description.
 * @param code option type code (CALL, PUT)
 * @returns option type description
 */
export function optionTypeDescription(code: OptionType): string {
  return appendix.optionTypeDescription(fromOptionType(code));
}

/**
 * Get option type code.
 * @param desc option type description
 * @returns option type code (CALL, PUT)
 */
export function optionType(desc: string): OptionType {
  return toOptionType(appendix.optionType(desc));
}




// HOLDING-TYPE
// ------------

/** Holding type code. */
export type HoldingType = "T1" | "HLD";


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
  return appendix.holdingTypeDescription(fromHoldingType(code));
}

/**
 * Get holding type code.
 * @param desc holding type description
 * @returns holding type code (T1, HLD)
 */
export function holdingType(desc: string): HoldingType {
  return toHoldingType(appendix.holdingType(desc));
}




// PRODUCT-TYPE
// ------------

/** Product type code. */
export type ProductType = "CNC" | "INTRADAY" | "MARGIN" | "CO" | "BO";


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
  return appendix.productTypeDescription(code);
}

/**
 * Get product type code.
 * @param desc product type description
 * @returns product type code (CNC, INTRADAY, MARGIN, CO, BO)
 */
export function productType(desc: string): ProductType {
  return appendix.productType(desc) as ProductType;
}




// INSTRUMENT-TYPE
// ---------------

/** Instrument type code. */
export type InstrumentType =
  "EQ" | "PREFSHARES" | "DEBENTURES" | "WARRANTS" | "MISC" | "INDEX" | // CM segment
  "FUTIDX" | "FUTIVX" | "FUTSTK" | "OPTIDX" | "OPTSTK" | // FO segment
  "FUTCUR" | "FUTIRT" | "FUTIRC" | "OPTCUR" | "UNDCUR" | "UNDIRC" | "UNDIRT" | "UNDIRD" | "INDEX_CD" | "FUTIRD" | // CD segment
  "FUTCOM" | "OPTFUT" | "OPTCOM"; // COM segment


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


function toInstrumentType(x: number): InstrumentType {
  return TO_INSTRUMENT_TYPE.get(x);
}

function fromInstrumentType(x: InstrumentType): number {
  return FROM_INSTRUMENT_TYPE.get(x);
}

/**
 * Get instrument type description.
 * @param code instrument type code (EQ, PREFSHARES, DEBENTURES, ...)
 * @returns instrument type description
 */
export function instrumentTypeDescription(code: InstrumentType): string {
  return appendix.instrumentTypeDescription(fromInstrumentType(code));
}

/**
 * Get instrument type code.
 * @param desc instrument type description
 * @returns instrument type code (EQ, PREFSHARES, DEBENTURES, ...)
 */
export function instrumentType(desc: string): InstrumentType {
  return toInstrumentType(appendix.instrumentType(desc));
}




// TYPES
// =====

// AUTHORIZATION
// -------------

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


/** Authorization step 1 request. */
export interface AuthorizationStep1Request {
  /** This is the app_id which you have received after creating the app. */
  appId: string,
  /** This is where the user will be redirected after successful login. */
  redirectUrl: string,
  /** The same value will be returned after successful login to the redirect uri. */
  state: string,
}


function fromAuthorizationStep1Request(x: AuthorizationStep1Request): http.AuthorizationStep1Request {
  return {
    client_id:     x.appId,
    redirect_uri:  x.redirectUrl,
    response_type: "code",
    state: x.state,
  };
}


/** Authorization step 1 response. */
export interface AuthorizationStep1Response {
  /** String value which will be used to generate the access_token. */
  authorizationCode: string,
  /** This value is returned as is from the first request. */
  state: string,
}


function toAuthorizationStep1Response(x: http.AuthorizationStep1Response): AuthorizationStep1Response {
  return {
    authorizationCode: x.auth_code,
    state: x.state,
  };
}


/** Authorization step 2 request. */
export interface AuthorizationStep2Request {
  /** SHA-256 of `api_id:app_secret` in hex. */
  appHash: string,
  /** This is the auth_code which is received from the first step. */
  authorizationCode: string,
}


function fromAuthorizationStep2Request(x: AuthorizationStep2Request): http.AuthorizationStep2Request {
  return {
    grant_type: "authorization_code",
    appIdHash:  x.appHash,
    code:       x.authorizationCode,
  };
}


/** Authorization step 2 response. */
export interface AuthorizationStep2Response {
  /** This value will be used for all the subsequent requests. */
  accessToken: string,
}


function toAuthorizationStep2Response(x: http.AuthorizationStep2Response): AuthorizationStep2Response {
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


import FLT = http.FundLimitType;
function toFunds(x: http.GetFundsResponse): Funds {
  var e: Fund = {} as any;
  var c: Fund = {} as any;
  for (var l of x.fund_limit) {
    switch (l.id) {
      case FLT.Start:
        e.start = l.equityAmount;
        c.start = l.commodityAmount;
        break;
      case FLT.Deposits:
        e.deposits = l.equityAmount;
        c.deposits = l.commodityAmount;
        break;
      case FLT.RealizedReturns:
        e.realizedReturns = l.equityAmount;
        c.realizedReturns = l.commodityAmount;
        break;
      case FLT.Collaterals:
        e.collaterals = l.equityAmount;
        c.collaterals = l.commodityAmount;
        break;
      case FLT.Adhoc:
        e.adhoc = l.equityAmount;
        c.adhoc = l.commodityAmount;
        break;
      case FLT.Utilized:
        e.utilized = l.equityAmount;
        c.utilized = l.commodityAmount;
        break;
      case FLT.Receivables:
        e.receivables = l.equityAmount;
        c.receivables = l.commodityAmount;
        break;
      case FLT.Available:
        e.available = l.equityAmount;
        c.available = l.commodityAmount;
        break;
      case FLT.Clear:
        e.clear = l.equityAmount;
        c.clear = l.commodityAmount;
        break;
      case FLT.Total:
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
  /** The Market value of the current holding. */
  currentValue: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  currentPrice: number,
  /** Profit and loss made. */
  returns: number,
}


function toHolding(x: http.Holding): Holding {
  return {
    isin:     x.isin,
    symbol:   x.symbol,
    exchange: toExchange(x.exchange),
    type:     toHoldingType(x.holdingType),
    quantity: x.quantity,
    remainingQuantity: x.remainingQuantity,
    buyPrice:     x.costPrice,
    currentValue: x.marketVal,
    currentPrice: x.ltp,
    returns:      x.pl,
  };
}


/** Overall status of holdings in this demat account. */
export interface HoldingsOverall {
  /** Total number of holdings present. */
  count: number,
  /** Invested amount for the current holdings. */
  investedValue: number,
  /** The present value of the holdings. */
  currentValue: number,
  /** Total profit and loss made. */
  returns: number,
  /** Percentage value of the total pnl. */
  returnsPercent: number,
}


function toHoldingsOverall(x: http.HoldingsOverall): HoldingsOverall {
  return {
    count: x.count_total,
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
    overall: toHoldingsOverall(x.overall),
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
    pan:          x.pan || null,
    clientId:     x.clientId || null,
  };
}


/** Overall status of orders for the current trading day. */
export interface OrdersOverall {
  /** Total number of orders present. */
  count: number,
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
    quantity: 0,
    remainingQuantity: 0,
    tradedQuantity: 0,
    disclosedQuantity: 0,
    remainingDisclosedQuantity: 0,
  };
  for (var o of x) {
    a.count++;
    a.quantity += o.qty;
    a.remainingQuantity += o.remainingQuantity;
    a.tradedQuantity    += o.filledQty;
    a.disclosedQuantity += o.discloseQty;
    a.remainingDisclosedQuantity += o.dqQtyRem;
  }
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
  /** Total profit and losses. */
  returns: number,
  /** Profit and losses when the owned product is sold. */
  realizedReturns: number,
  /** Profit and loses when the product is owned, but is not sold. */
  unrealizedReturns: number,
}


function toPositionsOverall(x: http.PositionsOverall): PositionsOverall {
  return {
    count:     x.count_total,
    openCount: x.count_open,
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
    overall: toPositionsOverall(x.overall),
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
  type: OrderType,
  /** The order is buy or sell. */
  side: OrderSide,
  /** The product in which the order was placed. */
  productType: ProductType,
  /** Provide valid price for Limit and Stoplimit orders. */
  limitPrice: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice: number,
  /** The quantity should be in multiples of lot size for derivatives. */
  quantity: number,
  /** Allowed only for Equity. */
  disclosedQuantity: number,
  /** Day or IOC. */
  validity: OrderValidity,
  /** True when placing AMO order. */
  offline: boolean,
  /** Provide valid price for CO and BO orders. */
  stopLoss: number,
  /** Provide valid price for BO orders. */
  takeProfit: number,
}


function fromPlaceOrder(x: PlaceOrder): http.PlaceOrderRequest {
  return {
    symbol: x.symbol,
    type:   fromOrderType(x.type),
    side:   fromOrderSide(x.side),
    productType:  x.productType,
    limitPrice:   x.limitPrice,
    stopPrice:    x.stopPrice,
    qty:          x.quantity,
    disclosedQty: x.disclosedQuantity,
    validity:     x.validity,
    offlineOrder: x.offline? "True" : "False",
    stopLoss:     x.stopLoss,
    takeProfit:   x.takeProfit,
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
  quantity: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
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
  side: PositionSide,
  /** Quantity to be converted. Has to be in multiples of lot size for derivatives. */
  quantity: number,
  /** Existing productType (CNC positions cannot be converted). */
  fromProductType: ProductType,
  /** The new product type. */
  toProductType: ProductType,
}


function fromConvertPosition(x: ConvertPosition): http.ConvertPositionRequest {
  return {
    symbol:       x.symbol,
    positionSide: fromPositionSide(x.side),
    convertQty:   x.quantity,
    convertFrom:  fromProductType(x.fromProductType),
    convertTo:    fromProductType(x.toProductType),
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
    if (s.status === 'OPEN') a.openCount++;
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
  resolution: string,
  /** TODO: 0 to enter the epoch value. 1 to enter the date format as yyyy-mm-dd. */
  dateFormat: number,
  /** Indicating the start date of records (epoch, yyyy-mm-dd). */
  fromDate: string,
  /** Indicating the end date of records. */
  toDate: string,
  /** Set cont flag 1 for continues data and future options. */
  continuous: boolean,
}


function fromGetMarketHistory(x: GetMarketHistory): http.GetMarketHistoryRequest {
  return {
    symbol:      x.symbol,
    resolution:  x.resolution,
    date_format: x.dateFormat,
    range_from:  x.fromDate,
    range_to:    x.toDate,
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
  /** Close price. */
  closePrice: number,
  /** Volume. */
  volume: number,
}


import SCI = http.ShortCandleIndex;
function toCandleShort(x: http.ShortCandle): Candle {
  return {
    date:       x[SCI.Time],
    openPrice:  x[SCI.Open],
    highPrice:  x[SCI.High],
    lowPrice:   x[SCI.Low],
    closePrice: x[SCI.Close],
    volume:     x[SCI.Volume],
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
  a.fromDate   = x[0][SCI.Time];
  a.toDate     = x[l][SCI.Time];
  a.openPrice  = x[0][SCI.Open];
  a.highPrice  = x[0][SCI.High];
  a.lowPrice   = x[0][SCI.Low];
  a.closePrice = x[l][SCI.Close];
  for (var c of x) {
    a.highPrice = Math.max(a.highPrice, c[SCI.High]);
    a.lowPrice  = Math.min(a.lowPrice,  c[SCI.Low]);
    a.volume    += c[SCI.Volume];
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




// FUNCTIONS
// =========

// AUTHORIZATION
// -------------

/**
 * Get request step 1 for authorization.
 * @param appId app_id which you have received after creating the app
 * @param redirectUrl where the user will be redirected after login
 * @param state same value will be returned after login to the redirect url
 * @returns request step 1 for authorization
 */
export function authorizationStep1(appId: string, redirectUrl: string, state: string="default"): HttpRequestOptions {
  var options = fromAuthorizationStep1Request({appId, redirectUrl, state});
  return http.authorizationStep1(options);
}


/**
 * Get request step 2 for authorization.
 * @param appHash SHA-256 of `api_id:app_secret` in hex
 * @param authorizationCode auth_code which is received from the first step
 * @returns request step 2 for authorization
 */
export function authorizationStep2(appHash: string, authorizationCode: string): HttpRequestOptions {
  var options = fromAuthorizationStep2Request({appHash, authorizationCode});
  return http.authorizationStep2(options);
}




// USER
// ----

/**
 * Get basic details of the client.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's profile {id, email, name, ...}
 */
export async function getProfile(auth: Authorization): Promise<Profile> {
  return toProfile(await http.getProfile(fromAuthorization(auth)));
}


/**
 * Get balance available for the user for capital as well as the commodity market.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's funds {equity: {start, ...}, commodity: {start, ...}}
 */
export async function getFunds(auth: Authorization): Promise<Funds> {
  return toFunds(await http.getFunds(fromAuthorization(auth)));
}


/**
 * Get the equity and mutual fund holdings which the user has in this demat account.
 * @param auth authorization {appId, accessToken}
 * @returns details of user's holdings {details: [{isin, ...}], overall: {count, ...}}
 */
export async function getHoldings(auth: Authorization): Promise<Holdings> {
  return toHoldings(await http.getHoldings(fromAuthorization(auth)));
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
  var options: http.GetOrderRequest = {id};
  return toOrder((await http.getOrder(fromAuthorization(auth), options)).orderBook[0]);
}


/**
 * Get details of all the orders placed in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of orders {details: [{id, ...}], overall: {count, ...}}
 */
export async function getOrders(auth: Authorization): Promise<Orders> {
  return toOrders(await http.getOrders(fromAuthorization(auth)));
}


/**
 * Get details of all the positions in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of positions {details: [{id, ...}], overall: {count, ...}}
 */
export async function getPositions(auth: Authorization): Promise<Positions> {
  return toPositions(await http.getPositions(fromAuthorization(auth)));
}


/**
 * Get details of all the trades in the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns details of trades {details: [{id, ...}], overall: {count, ...}}
 */
export async function getTrades(auth: Authorization): Promise<Trades> {
  return toTrades(await http.getTrades(fromAuthorization(auth)));
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
  var options = fromPlaceOrder(order);
  return (await http.placeOrder(fromAuthorization(auth), options)).id;
}


/**
 * Place multiple orders to any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param orders details of multiple orders [{symbol, qty, type, side, ...}]
 * @returns unique order ids
 */
export async function placeOrders(auth: Authorization, orders: PlaceOrder[]): Promise<string[]> {
  var options = orders.map(fromPlaceOrder);
  return (await http.placeOrders(fromAuthorization(auth), options)).data.map(x => x.body.id);
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
  var options = fromModifyOrder(order);
  return (await http.modifyOrder(fromAuthorization(auth), options)).id;
}


/**
 * Modifies orders placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param orders details of orders [{id, qty, type, side, ...}]
 * @returns unique order ids
 */
export async function modifyOrders(auth: Authorization, orders: ModifyOrder[]): Promise<string[]> {
  var options = orders.map(fromModifyOrder);
  return (await http.modifyOrders(fromAuthorization(auth), options)).data.map(x => x.body.id);
}


/**
 * Cancels an order placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param id order id
 * @returns order id
 */
export async function cancelOrder(auth: Authorization, id: string): Promise<string> {
  var options: http.CancelOrderRequest = {id};
  return (await http.cancelOrder(fromAuthorization(auth), options)).id;
}


/**
 * Cancels orders placed on any exchange via Fyers.
 * @param auth authorization {appId, accessToken}
 * @param ids unique order ids
 * @returns unique order ids
 */
export async function cancelOrders(auth: Authorization, ids: string[]): Promise<string[]> {
  var options: http.CancelOrderRequest[] = ids.map(id => ({id}));
  return (await http.cancelOrders(fromAuthorization(auth), options)).data.map(x => x.body.id);
}


/**
 * Exits a position on the current trading day.
 * @param auth authorization {appId, accessToken}
 * @param id position id
 * @returns position status
 */
export async function exitPosition(auth: Authorization, id: string): Promise<string> {
  var options: http.ExitPositionRequest = {id};
  return (await http.exitPosition(fromAuthorization(auth), options)).s;
}


/**
 * Exits all positions on the current trading day.
 * @param auth authorization {appId, accessToken}
 * @returns positions status
 */
export async function exitAllPositions(auth: Authorization): Promise<string> {
  return (await http.exitAllPositions(fromAuthorization(auth))).s;
}


/**
 * Converts a position on the current trading day.
 * @param auth authorization {appId, accessToken}
 * @param conversion details of conversion {symbol, side, quantity, ...}
 * @returns conversion status
 */
export async function convertPosition(auth: Authorization, conversion: ConvertPosition): Promise<string> {
  var options = fromConvertPosition(conversion);
  return (await http.convertPosition(fromAuthorization(auth), options)).s;
}




// BROKER-CONFIG, DATA-API
// -----------------------

/**
 * Get the current market status of all the exchanges and their segments.
 * @param auth authorization {appId, accessToken}
 * @returns markets status {details: [{exchange, ...}], overall: {count, ...}}
 */
export async function getMarketStatus(auth: Authorization): Promise<MarketsStatus> {
  return toMarketsStatus(await http.getMarketStatus(fromAuthorization(auth)));
}


/**
 * Get the market history for a particular symbol.
 * @param auth authorization {appId, accessToken}
 * @param market market details {symbol, resolution, dateFormat, ...}
 * @returns market history {details: [{date, ...}], overall: {dateFrom, ...}}
 */
export async function getMarketHistory(auth: Authorization, market: GetMarketHistory): Promise<MarketHistory> {
  var options = fromGetMarketHistory(market);
  return toMarketHistory(await http.getMarketHistory(fromAuthorization(auth), options));
}


/**
 * Get the current market quotes for a set of symbols.
 * @param auth authorization {appId, accessToken}
 * @param symbols list of symbols
 * @returns market quotes [{symbol, name, exchange, ...}]
 */
export async function getMarketQuotes(auth: Authorization, symbols: string[]): Promise<MarketQuote[]> {
  var options: http.GetMarketQuotesRequest = {symbols: symbols.join()};
  return (await http.getMarketQuotes(fromAuthorization(auth), options)).d.map(toMarketQuote);
}


/**
 * Get the current market depth for a particular symbol.
 * @param auth authorization {appId, accessToken}
 * @param symbol symbol name
 * @returns market depth {buyQuantity, sellQuantity, buyOffers, ...}
 */
export async function getMarketDepth(auth: Authorization, symbol: string): Promise<MarketDepth> {
  var options: http.GetMarketDepthRequest = {symbol, ohlcv_flag: 1};
  return toMarketDepth(await http.getMarketDepth(fromAuthorization(auth), options));
}


/**
 * Get all the latest symbols of all the exchanges from the symbol master files.
 * @param auth authorization (unused)
 * @param exchange exchange name
 * @param segment segment name
 * @returns symbol master file as text
 */
export function getSymbolMaster(auth: null, exchange: string, segment: string): Promise<string> {
  var options: http.GetSymbolMasterRequest = {exchange, segment};
  return http.getSymbolMaster(null, options);
}




// EDIS
// ----

/**
 * Generate e-DIS TPIN for validating/authorising transaction.
 * @param auth authorization {appId, accessToken}
 * @returns optional data
 */
export async function generateEdisTpin(auth: Authorization): Promise<string> {
  return (await http.generateEdisTpin(fromAuthorization(auth))).data;
}


/**
 * Get the necessary information regarding the holdings you have on your and also the Status of the holdings. If the “sell” for the particular holdings is a success or not.
 * @param auth authorization {appId, accessToken}
 * @returns list of e-DIS transactions {data: [{transactionId, internalTxnId, ...}]}
 */
export async function getEdisTransactions(auth: Authorization): Promise<EdisTransactions> {
  return toEdisTransactions(await http.getEdisTransactions(fromAuthorization(auth)));
}


/**
 * Redirect to CDSL page for login where you can submit your Holdings information and accordingly you can provide the same to exchange to Sell your holdings (browser only).
 * @param auth authorization {appId, accessToken}
 * @param holdings holding details {recordLst: [{isin_code, qty}]}
 * @returns HTTP(s) request options (manual)
 */
export function submitEdisHoldingsStep(auth: Authorization, holdings: EdisHolding[]): HttpRequestOptions {
  var options: http.SubmitEdisHoldingsRequest = {recordLst: holdings.map(fromEdisHolding)};
  return http.submitEdisHoldingsStep(fromAuthorization(auth), options);
}


/**
 * Inquire the information/status of the provided transaction Id for the respective holdings you have on your end.
 * @param auth authorization {appId, accessToken}
 * @param id transaction id
 * @returns edis status
 */
export async function inquireEdisTransaction(auth: Authorization, id: string): Promise<number> {
  var options: http.InquireEdisTransactionRequest = {transactionId: id};
  var a = (await http.inquireEdisTransaction(fromAuthorization(auth), options)).data;
  return a.FAILED_CNT > 0? -a.FAILED_CNT : a.SUCEESS_CNT;
}




// MAIN
// ====

/** Container for storing authorization details. */
export class Fyers implements Authorization {
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
  static authorizationStep1(appId: string, redirectUrl: string, state: string="default"): HttpRequestOptions {
    return authorizationStep1(appId, redirectUrl, state);
  }

  /**
   * Get request step 2 for authorization.
   * @param appHash SHA-256 of `api_id:app_secret` in hex
   * @param authorizationCode auth_code which is received from the first step
   * @returns request step 2 for authorization
   */
  static authorizationStep2(appHash: string, authorizationCode: string): HttpRequestOptions {
    return authorizationStep2(appHash, authorizationCode);
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
