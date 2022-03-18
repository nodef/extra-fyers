import {HttpHeaders, HttpRequestOptions, queryString, httpRequestText, httpRequestJson} from './_http';




// CONSTANTS
// =========

/** Root URL for API requests. */
export const API_URL: string = 'https://api.fyers.in/api/v2/';
/** Root URL for Data API requests. */
export const DATA_URL: string = 'https://api.fyers.in/data-rest/v2/';
/** Root URL for Symbol master files. */
export const SYMBOLS_URL: string = 'https://public.fyers.in/sym_details/';




// TYPES
// =====

// RESPONSE
// --------

/** Common response format. */
export interface Response {
  /** ok / error. */
  s: string,
  /** This is the code to identify specific responses. */
  code?: number,
  /** This is the message to identify the specific error responses. */
  message?: string,
}


/** HTTP data of multi-response. */
export interface ProxyResponse<Body> {
  /** HTTP status code. */
  statusCode: number,
  /** The actual place order reponse. */
  body: Body,
  /** HTTP status description. */
  statusDescription: string,
}




// LOGIN
// -----

/** Attributes required for authorization of all requests. */
export interface Authorization {
  /** This is the app_id which you have received after creating the app. */
  app_id: string,
  /** This value will be used for all the requests. */
  access_token: string,
}


/** Login step 1 request. */
export interface LoginStep1Request {
  /** This is the app_id which you have received after creating the app. */
  client_id: string,
  /** This is where the user will be redirected after successful login. */
  redirect_uri: string,
  /** This value must always be “code”. */
  response_type: string,
  /** The same value will be returned after successful login to the redirect uri. */
  state: string,
}


/** Login step 1 response. */
export interface LoginStep1Response extends Response {
  /** String value which will be used to generate the access_token. */
  auth_code: string,
  /** This value is returned as is from the first request. */
  state: string,
}


/** Login step 2 request. */
export interface LoginStep2Request {
  /** This value must always be “authorization_code”. */
  grant_type: string,
  /** SHA-256 of `api_id:app_secret` in hex. */
  appIdHash: string,
  /** This is the auth_code which is received from the first step. */
  code: string,
}


/** Login step 2 response. */
export interface LoginStep2Response extends Response {
  /** This value will be used for all the subsequent requests. */
  access_token: string,
}




// GET-PROFILE
// -----------

/** Basic details of the client. */
export interface Profile {
  /** The client id of the fyers user. */
  fy_id: string,
  /** Email address of the client. */
  email_id: string,
  /** Name of the client. */
  name: string,
  /** Display name, if any, provided by the client. */
  display_name: string,
  /** URL link to the user’s profile picture, if any. */
  image: string,
  /** PAN of the client. */
  PAN: string,
  /** Last PIN changed date. */
  pin_change_date: string,
  /** Last password changed date. */
  pwd_change_date: string,
  /** Number of days until the current password expires. */
  pwd_to_expire: number,
}


/** Get profile response. */
export interface GetProfileResponse extends Response {
  /** Basic details of the client. */
  data: Profile,
}




// GET-FUNDS
// ---------

/** Limit details for particular fund. */
export interface FundLimit {
  /** Unique identity for particular fund. */
  id: number,
  /** Each title represents a heading of the ledger. */
  title: string,
  /** The amount in the capital ledger for the above-mentioned title. */
  equityAmount: number,
  /** The amount in the commodity ledger for the above-mentioned title. */
  commodityAmount: number,
}


/** Get funds response. */
export interface GetFundsResponse extends Response {
  /** Balance available for the user for capital as well as the commodity market. */
  fund_limit: FundLimit[],
}




// GET-HOLDINGS
// ------------

/** Details of each equity or mutual fund holding. */
export interface Holding {
  /** An identifier for this holding. */
  id: number,
  /** Fytoken is a unique identifier for every symbol. */
  fytoken: number,
  /** 12-digit International Securities Identification Number. */
  isin: string,
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** The exchange in which order is placed. */
  exchange: number,
  /** Identify the type of holding. */
  holdingType: string,
  /** The quantity of the symbol which the user has at the beginning of the day. */
  quantity: number,
  /** This reflects the quantity - the quantity sold during the day. */
  remainingQuantity: number,
  /** The original buy price of the holding. */
  costPrice: number,
  /** The Market value of the current holding. */
  marketVal: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  ltp: number,
  /** Profit and loss made. */
  pl: number,
}


/** Overall status of equity and mutual fund holdings in this demat account. */
export interface HoldingsOverall {
  /** Total number of holdings present. */
  count_total: number,
  /** Invested amount for the current holdings. */
  total_investment: number,
  /** The present value of the holdings. */
  total_current_value: number,
  /** Total profit and loss made. */
  total_pl: number,
  /** Percentage value of the total pnl. */
  pnl_perc: number,
}


/** Equity and mutual fund holdings which the user has in this demat account. */
export interface GetHoldingsResponse extends Response {
  /** Details of each holding. */
  holdings: Holding[],
  /** Overall status of holdings in this demat account. */
  overall: HoldingsOverall,
}




// GET-ORDERS
// ----------

/** Order placed by the user in the current trading day. */
export interface Order {
  /** The unique order id assigned for each order. */
  id: string,
  /** The order id provided by the exchange. */
  exchOrdId: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** Fytoken is a unique identifier for every symbol. */
  fytoken: string,
  /** The ticker symbol for which order is placed. */
  ex_sym: string,
  /** Description of symbol for which order is placed. */
  description: string,
  /** The segment this order is placed in. */
  segment: number,
  /** Exchange instrument type. */
  instrument: number,
  /** The exchange in which order is placed. */
  exchange: number,
  /** The type of order. */
  type: number,
  /** The order is buy or sell. */
  side: number,
  /** The product type. */
  productType: string,
  /** Source from where the order was placed. */
  source: string,
  /** The status of the order. */
  status: number,
  /** The order number and status of the order. */
  orderNumStatus: number,
  /** True when placing AMO order. */
  offlineOrder: string,
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
  /** Price change from previous trading day. */
  ch: number,
  /** Percent price change from previous trading day. */
  chp: number,
  /** Last price of symbol. */
  lp: number,
  /** The average traded price for the order. */
  tradedPrice: number,
  /** This is used to sort the orders based on the time. */
  slNo: number,
  /** The error messages are shown here. */
  message: string,
  /** PAN of the client. */
  pan: string,
  /** The client id of the fyers user. */
  clientId: string,
}


/** Get order request. */
export interface GetOrderRequest {
  /** The unique order id assigned for each order. */
  id: string,
}

/** Get orders response. */
export interface GetOrdersResponse extends Response {
  /** List of all orders places during the day. */
  orderBook: Order[],
}




// GET-POSITIONS
// -------------

/** Current open/closed position for the current trading day. */
export interface Position {
  /** The unique value for each position. */
  id: string,
  /** Fytoken is a unique identifier for every symbol. */
  fytoken: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The segment in which the position is taken. */
  segment: number,
  /** The product type of the position. */
  productType: string,
  /** The side shows whether the position is long / short. */
  side: number,
  /** Absolute value of net qty. */
  qty: number,
  /** Incase of commodity positions, this multiplier is required for p&l calculation. */
  qtyMulti_com: number,
  /** Average buy price. */
  buyAvg: number,
  /** Total buy qty. */
  buyQty: number,
  /** Total buy value. */
  buyVal: number,
  /** Average sell price. */
  sellAvg: number,
  /** Total sell qty. */
  sellQty: number,
  /** Total sell value. */
  sellVal: number,
  /** Net average price. */
  netAvg: number,
  /** Net qty. */
  netQty: number,
  /** Average price (netAvg). */
  avgPrice: number,
  /** The total p&l of the position. */
  pl: number,
  /** The realized p&l of the position. */
  realized_profit: number,
  /** The unrealized p&l of the open position. */
  unrealized_profit: number,
  /** Is it a cross currency position? */
  crossCurrency: string,
  /** Incase of cross currency position, the rbi reference rate will be required to calculate the p&l. */
  rbiRefRate: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  ltp: number,
  /** This is used for sorting of positions. */
  slNo: number,
}


/** Overall status of positions for the current trading day. */
export interface PositionsOverall {
  /** Total number of positions present. */
  count_total: number,
  /** Total number of positions opened. */
  count_open: number,
  /** Total profit and losses. */
  pl_total: number,
  /** Profit and losses when the owned product is sold. */
  pl_realized: number,
  /** Profit and loses when the product is owned, but is not sold. */
  pl_unrealized: number,
}


/** Get postions response. */
export interface GetPositionsResponse extends Response {
  /** List of all positions for the current trading day. */
  netPositions: Position[],
  /** Overall status of positions for the current trading day. */
  overall: PositionsOverall,
}




// GET-TRADES
// ----------

/** Trade in the current trading day. */
export interface Trade {
  /** The unique id to sort the trades. */
  id: string,
  /** The order id for which the trade occurred. */
  orderNumber: string,
  /** The order number provided by the exchange. */
  exchangeOrderNo: string,
  /** The trade number generated by the exchange. */
  tradeNumber: string,
  /** Fytoken is a unique identifier for every symbol. */
  fyToken: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The segment in which order is placed. */
  segment: number,
  /** The exchange in which order is placed. */
  exchange: number,
  /** The trade is buy or sell. */
  transactionType: number,
  /** The product in which the order was placed. */
  productType: string,
  /** The type of order. */
  orderType: number,
  /** The time when the trade occured in “DD-MM-YYYY hh:mm:ss” format in IST. */
  orderDateTime: string,
  /** The traded price. */
  tradePrice: number,
  /** The total traded qty. */
  tradedQty: number,
  /** The total traded value. */
  tradeValue: number,
  /** Client id. */
  clientId: string,
  /** ? */
  row: number,
}


/** Get trades response. */
export interface GetTradesResponse extends Response {
   /** List of all trades for the current trading day. */
  tradeBook: Trade[]
}




// PLACE-ORDER
// -----------

/** Place order request to an exchange via Fyers. */
export interface PlaceOrderRequest {
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The quantity should be in multiples of lot size for derivatives. */
  qty: number,
  /** The type of order. */
  type: number,
  /** The order is buy or sell. */
  side: number,
  /** The product in which the order was placed. */
  productType: string,
  /** Provide valid price for Limit and Stoplimit orders. */
  limitPrice?: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice?: number,
  /** Allowed only for Equity. */
  disclosedQty?: number,
  /** Day or IOC. */
  validity: string,
  /** True when placing AMO order. */
  offlineOrder: string,
  /** Provide valid price for CO and BO orders. */
  stopLoss?: number,
  /** Provide valid price for BO orders. */
  takeProfit?: number,
}


/** Place/modify/cancel order reponse. */
export interface OrderResponse extends Response {
  /** The order number of the placed/modified/cancelled order. */
  id: string,
}


/** Place order reponse. */
export type PlaceOrderResponse = OrderResponse;


/** Place orders response. */
export interface PlaceOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: ProxyResponse<PlaceOrderResponse>[]
}




// MODIFY-ORDER
// ------------

/** Modify order request to Fyers. */
export interface ModifyOrderRequest {
  /** The unique order id assigned for each order. */
  id: string,
  /** The type of order. */
  type: number,
  /** The original order qty. */
  qty?: number,
  /** Disclosed quantity. */
  disclosedQty?: number,
  /** The limit price for the order. */
  limitPrice?: number,
  /** The stop price for the order. */
  stopPrice?: number,
}


/** Modify order response. */
export type ModifyOrderResponse = OrderResponse;


/** Modify orders response. */
export interface ModifyOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: ProxyResponse<ModifyOrderResponse>[],
}




// CANCEL-ORDER
// ------------

/** Cancel order request to any exchange via Fyers. */
export interface CancelOrderRequest {
  /** The order number of the placed order. */
  id: string,
}


/** Cancel order response. */
export type CancelOrderResponse = OrderResponse;


/** Cancel orders response. */
export interface CancelOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: ProxyResponse<CancelOrderResponse>[]
}




// EXIT-POSITION
// -------------

/** Exit position request to Fyers. */
export interface ExitPositionRequest {
  /** Mandatory. Eg: NSE:FCONSUMER-EQ-INTRADAY. */
  id: string,
}


/** Exit all positions response. */
export interface ExitAllPositionsResponse extends Response {}
/** Exit position response. */
export interface ExitPositionResponse extends Response {}




// CONVERT-POSITION
// ----------------

/** Convert position request to Fyers. */
export interface ConvertPositionRequest {
  /** Mandatory. Eg: 119031547242. */
  symbol: string,
  /** The side shows whether the position is long / short. */
  positionSide: number,
  /** Quantity to be converted. Has to be in multiples of lot size for derivatives. */
  convertQty: number,
  /** Existing productType (CNC positions cannot be converted). */
  convertFrom: string,
  /** The new product type. */
  convertTo: string,
}


/** Convert position response. */
export interface ConvertPositionResponse extends Response {
  /** Unknown. */
  positionDetails?: number,
}




// GET-MARKET-STATUS
// -----------------

/** Current market status of an exchange's segment. */
export interface MarketStatus {
  /** The exchange in which the position is taken. */
  exchange: number,
  /** The segment in which the position is taken. */
  segment: number,
  /** The type of market: NL, MS, ES, ... */
  market_type: string,
  /** Market status: OPEN, CLOSE. */
  status: string,
}


/** Market status response for all the exchanges and their segments. */
export interface GetMarketStatusResponse extends Response {
  /** List of statuses of various markets. */
  marketStatus: MarketStatus[],
}




// GET-MARKET-HISTORY
// ------------------

/** Market history request for a symbol. */
export interface GetMarketHistoryRequest {
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** The candle resolution in minutes. */
  resolution: string,
  /** 0 to enter the epoch value. 1 to enter the date format as yyyy-mm-dd. */
  date_format: number,
  /** Indicating the start date of records (epoch, yyyy-mm-dd). */
  range_from: string,
  /** Indicating the end date of records. */
  range_to: string,
  /** Set cont flag 1 for continues data and future options. */
  cont_flag: string,
}


/** Short candle used with market history [time, open, high, low, close, volume]. */
export type ShortCandle = [number, number, number, number, number, number];


/** Market history of a particular stock response. */
export interface GetMarketHistoryResponse extends Response {
  /** List of short candles. */
  candles: ShortCandle[],
}




// GET-MARKET-QUOTES
// -----------------

/** Market quotes request for one or more symbols. */
export interface GetMarketQuotesRequest {
  /** Eg: NSE:RCOM-EQ, ... */
  symbols: string,
}


/** Candle in market quotes. */
export interface Candle {
  /** UNIX expoch time. */
  t: number,
  /** Open price. */
  o: number,
  /** High price. */
  h: number,
  /** Low price. */
  l: number,
  /** Close price. */
  c: number,
  /** Volume. */
  v: number,
  /** Time, formatted. */
  tf: string,
}


/** Quote details of a particular symbol. */
export interface MarketQuoteDetails {
  /** Change value. */
  ch: number,
  /** Percentage of change between the current value and the previous day's market close. */
  chp: number,
  /** Last traded price. */
  lp: number,
  /** Difference between lowest asking and highest bidding price. */
  spread: number,
  /** Asking price for the symbol. */
  ask: number,
  /** Bidding price for the symbol. */
  bid: number,
  /** Price at market opening time. */
  open_price: number,
  /** Highest price for the day. */
  high_price: number,
  /** Lowest price for the day. */
  low_price: number,
  /** Close price of the previous trading day. */
  prev_close_price: number,
  /** Volume traded. */
  volume: number,
  /** Short name for the symbol Eg: “SBIN-EQ”. */
  short_name: string,
  /** Name of the exchange. Eg: “NSE” or “BSE”. */
  exchange: string,
  /** Description of the symbol. */
  description: string,
  /** Original name of the symbol name provided by the use. */
  original_name: string,
  /** Symbol name provided by the user. */
  symbol: string,
  /** Fytoken is a unique identifier for every symbol. */
  fyToken: string,
  /** Today’s time. */
  tt: number,
  /** Current time, open, high, low price and volume with HH:MM timestamp. */
  cmd: Candle,
}


/** Market quote for a particular symbol. */
export interface MarketQuote {
  /** Name of symbol. */
  n: string,
  /** Status (ok). */
  s: string,
  /** Market quote details. */
  v: MarketQuoteDetails,
}


/** Market quotes response. */
export interface GetMarketQuotesResponse extends Response {
  /** List of all market quotes. */
  d: MarketQuote[]
}




// GET-MARKET-DEPTH
// ----------------

/** Market depth details request. */
export interface GetMarketDepthRequest {
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** Set the ohlcv_flag to 1 to get open, high, low, closing and volume quantity. */
  ohlcv_flag: number,
}


/** Open buy/sell orders at a particular price. */
export interface MarketOffer {
  /** Bid/ask price. */
  price: number,
  /** Bid/ask volume. */
  volume: number,
  /** Orders? */
  ord: number,
}


/** A measure of the supply and demand for a symbol. */
export interface MarketDepth {
  /** Total buying quantity. */
  totalbuyqty: number,
  /** Total selling quantity. */
  totalsellqty: number,
  /** Bidding price along with volume and total number of orders. */
  bids: MarketOffer[],
  /** Offer price with volume and total number of orders. */
  ask: MarketOffer[],
  /** Price at market opening time. */
  o?: number,
  /** Highest price for the day. */
  h?: number,
  /** Lowest price for the day. */
  l?: number,
  /** Price at the of market closing. */
  c?: number,
  /** Volume traded. */
  v?: number,
  /** Percentage of change between the current value and the previous day's market close. */
  chp: number,
  /** Change value. */
  ch: number,
  /** Last traded quantity. */
  ltq: number,
  /** Last traded time. */
  ltt: number,
  /** Last traded price. */
  ltp: number,
  /** Average traded price. */
  atp: number,
  /** Lower circuit price. */
  lower_ckt: number,
  /** Upper circuit price. */
  upper_ckt: number,
  /** Expiry date. */
  expiry: string,
  /** Open interest. */
  oi: number,
  /** Boolean flag for OI data, true or false. */
  oiflag: false,
  /** Previous day open interest. */
  pdoi: number,
  /** Change in open Interest percentage. */
  oipercent: number,
}


/** Market depth details response. */
export interface GetMarketDepthResponse extends Response {
  /** Dictionary of all market depth details. */
  d: { [symbol: string]: MarketDepth }
}




// GET-SYMBOL-MASTER
// -----------------

/** Symbol category of master file request. */
export interface GetSymbolMasterRequest {
  /** Name of the exchange (NSE, BSE, MCX). */
  exchange: string,
  /** The segment whose symbols are needed (CM, FO, CD, COM). */
  segment: string,
}




// GENERATE-EDIS-TPIN
// ------------------

/** e-DIS TPIN generation reponse. */
export interface GenerateEdisTpinResponse extends Response {
  /** Unknown, seen to be empty. */
  data: string
}




// GET-EDIS-TRANSACTIONS
// ---------------------

/** Details of an e-DIS transaction. */
export interface EdisTransaction {
  /** Transaction id. */
  transactionId: string
  /** Internal transaction id. */
  internalTxnId: string,
  /** DP transaction id. */
  dpTxnId: string,
  /** ISIN code of stock. */
  isin: string,
  /** Quantity to transact. */
  qty: number,
  /** Quantity already transacted? */
  qtyUtlize: number,
  /** Transaction create date-time/ */
  entryDate: string,
  /** Transaction processing start date? */
  startDate: string,
  /** Transaction processing end date? */
  endDate: string,
  /** No. of days since transaction create date? */
  noOfDays: number,
  /** Source of transaction. */
  source: string,
  /** SUCCESS, FAILURE? */
  status: string,
  /** Unique client code? */
  clientId: string,
  /** Error code (NA). */
  errCode: string,
  /** Error count (0). */
  errorCount: string,
  /** Message. */
  reason: string,
}

/** e-DIS transaction details response. */
export interface GetEdisTransactionsResponse extends Response {
  /** List of e-DIS transactions. */
  data: EdisTransaction[]|string
}




// SUBMIT-EDIS-HOLDINGS
// --------------------

/** e-DIS securities held in a demat account. */
export interface EdisHolding {
  /** 12-digit alphanumeric code of specific symbol. */
  isin_code: string,
  /** Quantity of securities held. */
  qty: number,
}


/** e-DIS holdings submission request. */
export interface SubmitEdisHoldingsRequest {
  /** Records of holdings of the user. */
  recordLst: EdisHolding[],
}




// INQUIRE-EDIS-TRANSACTION
// ------------------------

/** e-DIS transactions status inquiry request. */
export interface InquireEdisTransactionRequest {
  /** Transaction id. */
  transactionId: string
}


/** e-DIS transaction status counts. */
export interface EdisTransactionStatus {
  /** Failure count. */
  FAILED_CNT: number,
  /** Success count. */
  SUCEESS_CNT: number,
}


/** e-DIS transaction status inquiry response. */
export interface InquireEdisTransactionResponse extends Response {
  /** Depository status data. */
  data: EdisTransactionStatus,
}




// FUNCTIONS
// =========

// REQUEST
// -------

function requestStep(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): HttpRequestOptions {
  var url  = path + queryString(query);
  var headers: HttpHeaders = {};
  if (auth != null) headers['authorization'] = auth.app_id + ':' + auth.access_token;
  return {url, method, headers, body};
}

function requestText(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<string> {
  return httpRequestText(requestStep(auth, method, path, query, body));
}

function requestJson(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<object> {
  return httpRequestJson(requestStep(auth, method, path, query, body));
}

function requestApi(auth: Authorization, method: string, path: string, query: object|null, body: object|null): Promise<Response> {
  return requestJson(auth, method, API_URL + path, query, body) as Promise<Response>;
}

function requestData(auth: Authorization, method: string, path: string, query: object|null, body: object|null): Promise<Response> {
  return requestJson(auth, method, DATA_URL + path, query, body) as Promise<Response>;
}

function requestSymbols(auth: null, method: string, path: string, query: object|null, body: object|null): Promise<string> {
  return requestText(auth, method, SYMBOLS_URL + path, query, body);
}




// LOGIN
// -----

/**
 * Get request step 1 for authorization (browser only).
 * @param options authorization step 1 details {client_id, redirect_uri, response_type, state}
 * @returns HTTP(s) request options for authorization step 1 (manual)
 */
export function loginStep1(options: LoginStep1Request): HttpRequestOptions {
  return requestStep(null, 'GET', API_URL + 'generate-authcode', options, null);
}


/**
 * Get request step 2 for authorization (browser, server).
 * @param options authorization step 2 details {graph_type, appIdHash, code}
 * @returns HTTP(s) request options for authorization step 2 (manual)
 */
export function loginStep2(options: LoginStep2Request): HttpRequestOptions {
  return requestStep(null, 'POST', API_URL + 'validate-authcode', null, options);
}




// USER
// ----

/**
 * Get basic details of the client.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's profile {fy_id, email_id, name, ...}
 */
export function getProfile(auth: Authorization): Promise<GetProfileResponse> {
  return requestApi(auth, 'GET', 'profile', null, null) as Promise<GetProfileResponse>;
}


/**
 * Get balance available for the user for capital as well as the commodity market.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's funds {fund_limit: [{id, title, equityAmount, commodityAmount}]}
 */
export function getFunds(auth: Authorization): Promise<GetFundsResponse> {
  return requestApi(auth, 'GET', 'funds', null, null) as Promise<GetFundsResponse>;
}


/**
 * Get the equity and mutual fund holdings which the user has in this demat account.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's holdings {holdings: {id, ...}, overall: {count_total, ...}}
 */
export function getHoldings(auth: Authorization): Promise<GetHoldingsResponse> {
  return requestApi(auth, 'GET', 'holdings', null, null) as Promise<GetHoldingsResponse>;
}




// TRANSACTION-INFO
// ----------------

/**
 * Get details of an order placed in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @param options order query {id}
 * @returns details of an order {orderBook: [{id, exchOrdId, symbol, ...}]}
 */
export function getOrder(auth: Authorization, options: GetOrderRequest): Promise<GetOrdersResponse> {
  return requestApi(auth, 'GET', 'orders', options, null) as Promise<GetOrdersResponse>;
}


/**
 * Get details of all the orders placed in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of orders {orderBook: [{id, exchOrdId, symbol, ...}]}
 */
export function getOrders(auth: Authorization): Promise<GetOrdersResponse> {
  return requestApi(auth, 'GET', 'orders', null, null) as Promise<GetOrdersResponse>;
}


/**
 * Get details of all the positions in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of positions {netPositions: {id, ...}, overall: {count_total, ...}}
 */
export function getPositions(auth: Authorization): Promise<GetPositionsResponse> {
  return requestApi(auth, 'GET', 'positions', null, null) as Promise<GetPositionsResponse>;
}


/**
 * Get details of all the trades in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of trades {tradeBook: [{id, orderNumber, exchangeOrderNo, ...}]}
 */
export function getTrades(auth: Authorization): Promise<GetTradesResponse> {
  return requestApi(auth, 'GET', 'tradebook', null, null) as Promise<GetTradesResponse>;
}




// ORDER-PLACEMENT
// ---------------

/**
 * Place an order to any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of an order {symbol, qty, type, side, ...}
 * @returns place status {id}
 */
export function placeOrder(auth: Authorization, options: PlaceOrderRequest): Promise<PlaceOrderResponse> {
  return requestApi(auth, 'POST', 'orders', null, options) as Promise<PlaceOrderResponse>;
}


/**
 * Place multiple orders to any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of multiple orders [{symbol, qty, type, side, ...}]
 * @returns place status {data: [{statusCode, body: {id}, statusDescription}]}
 */
export function placeOrders(auth: Authorization, options: PlaceOrderRequest[]): Promise<PlaceOrdersResponse> {
  return requestApi(auth, 'POST', 'orders-multi', null, options) as Promise<PlaceOrdersResponse>;
}




// OTHER-TRANSACTIONS
// ------------------

/**
 * Modify an order placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of order {id, qty, type, side, ...}
 * @returns modify status {id}
 */
export function modifyOrder(auth: Authorization, options: ModifyOrderRequest): Promise<ModifyOrderResponse> {
  return requestApi(auth, 'PUT', 'orders', null, options) as Promise<ModifyOrderResponse>;
}


/**
 * Modify orders placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of orders [{id, qty, type, side, ...}]
 * @returns modify status {data: [{statusCode, body: {id}, statusDescription}]}
 */
export function modifyOrders(auth: Authorization, options: ModifyOrderRequest[]): Promise<ModifyOrdersResponse> {
  return requestApi(auth, 'PUT', 'orders-multi', null, options) as Promise<ModifyOrdersResponse>;
}


/**
 * Cancel an order placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of order {id}
 * @returns cancel status {id}
 */
export function cancelOrder(auth: Authorization, options: CancelOrderRequest): Promise<CancelOrderResponse> {
  return requestApi(auth, 'DELETE', 'orders', null, options) as Promise<CancelOrderResponse>;
}


/**
 * Cancel orders placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of orders [{id}]
 * @returns cancel status {data: [{statusCode, body: {id}, statusDescription}]}
 */
export function cancelOrders(auth: Authorization, options: CancelOrderRequest[]): Promise<CancelOrdersResponse> {
  return requestApi(auth, 'DELETE', 'orders-multi', null, options) as Promise<CancelOrdersResponse>;
}


/**
 * Exit a position on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @param options details of position {id}
 * @returns exit status {}
 */
export function exitPosition(auth: Authorization, options: ExitPositionRequest): Promise<ExitPositionResponse> {
  return requestApi(auth, 'DELETE', 'positions', null, options) as Promise<ExitPositionResponse>;
}


/**
 * Exit all positions on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns exit status {}
 */
export function exitAllPositions(auth: Authorization): Promise<ExitAllPositionsResponse> {
  return requestApi(auth, 'DELETE', 'positions', null, {}) as Promise<ExitAllPositionsResponse>;
}


/**
 * Convert a position on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @param options details of position {symbol, positionSide, convertQty, ...}
 * @returns conversion status {positionDetails}
 */
export function convertPosition(auth: Authorization, options: ConvertPositionRequest): Promise<ConvertPositionResponse> {
  return requestApi(auth, 'PUT', 'positions', null, options) as Promise<ConvertPositionResponse>;
}




// BROKER-CONFIG, DATA-API
// -----------------------

/**
 * Get the current market status of all the exchanges and their segments.
 * @param auth authorization {app_id, access_token}
 * @returns market status {marketStatus: [{exchange, segment, market_type, status}]}
 */
export function getMarketStatus(auth: Authorization): Promise<GetMarketStatusResponse> {
  return requestApi(auth, 'GET', 'market-status', null, null) as Promise<GetMarketStatusResponse>;
}


/**
 * Get the current market history for a particular symbol.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbol, resolution, date_format, ...}
 * @returns market history {candles: [[time, open, high, low, close, volume]]}
 */
export function getMarketHistory(auth: Authorization, options: GetMarketHistoryRequest): Promise<GetMarketHistoryResponse> {
  return requestData(auth, 'GET', 'history/', options, null) as Promise<GetMarketHistoryResponse>;
}


/**
 * Get the current market quotes for a set of symbols.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbols}
 * @returns market quotes {d: [{n, s, v: {ch, chp, lp, spread, ...}}]}
 */
export function getMarketQuotes(auth: Authorization, options: GetMarketQuotesRequest): Promise<GetMarketQuotesResponse> {
  return requestData(auth, 'GET', 'quotes/', options, null) as Promise<GetMarketQuotesResponse>;
}


/**
 * Get the current market depth for a particular symbol.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbol, ohlcv_flag}
 * @returns market depth {d: {<symbol>: {totalbuyqty, totalsellqty, bids}}}
 */
export function getMarketDepth(auth: Authorization, options: GetMarketDepthRequest): Promise<GetMarketDepthResponse> {
  return requestData(auth, 'GET', 'depth/', options, null) as Promise<GetMarketDepthResponse>;
}


/**
 * Get all the latest symbols of all the exchanges from the symbol master files.
 * @param auth authorization (unused)
 * @param options details of symbol category {exchange, segment}
 * @returns symbol master file
 */
export function getSymbolMaster(auth: null, options: GetSymbolMasterRequest): Promise<string> {
  var {exchange, segment} = options;
  return requestSymbols(null, 'GET', exchange + '_' + segment + '.csv', null, null);
}




// EDIS
// ----

/**
 * Generate e-DIS TPIN for validating/authorising transaction.
 * @param auth authorization {app_id, access_token}
 * @returns optional data {data}
 */
export function generateEdisTpin(auth: Authorization): Promise<GenerateEdisTpinResponse> {
  return requestApi(auth, 'GET', 'tpin', null, null) as Promise<GenerateEdisTpinResponse>;
}


/**
 * Get the necessary information regarding the holdings you have on your and also the Status of the holdings. If the “sell” for the particular holdings is a success or not.
 * @param auth authorization {app_id, access_token}
 * @returns list of e-DIS transactions {data: [{transactionId, internalTxnId, ...}]}
 */
export function getEdisTransactions(auth: Authorization): Promise<GetEdisTransactionsResponse> {
  return requestApi(auth, 'GET', 'details', null, null) as Promise<GetEdisTransactionsResponse>;
}


/**
 * Redirect to CDSL page for login where you can submit your Holdings information and accordingly you can provide the same to exchange to Sell your holdings (browser only).
 * @param auth authorization {app_id, access_token}
 * @param options holding details {recordLst: [{isin_code, qty}]}
 * @returns HTTP(s) request options (manual)
 */
export function submitEdisHoldingsStep(auth: Authorization, options: SubmitEdisHoldingsRequest): HttpRequestOptions {
  return requestStep(auth, 'POST', 'index', null, options);
}


/**
 * Inquire the information/status of the provided transaction Id for the respective holdings you have on your end.
 * @param auth authorization {app_id, access_token}
 * @param options transaction details {transactionId}
 * @returns edis status {FAILED_CNT, SUCEESS_CNT}
 */
export function inquireEdisTransaction(auth: Authorization, options: InquireEdisTransactionRequest): Promise<InquireEdisTransactionResponse> {
  return requestApi(auth, 'POST', 'inquiry', null, options) as Promise<InquireEdisTransactionResponse>;
}
