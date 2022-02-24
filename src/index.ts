export * from './appendix';
export * as raw from './raw';








// TYPES (GET-PROFILE)
// -------------------

/**
 * Basic details of the client.
 */
 export interface GetProfileResult {
  /** The client id of the fyers user. */
  id: string,
  /** Email address of the client. */
  email: string,
  /** Name of the client. */
  name: string,
  /** PAN of the client. */
  pan: string,
}




// TYPES (GET-FUNDS)
// -----------------

/**
 * Basic details for particular fund.
 */
export interface Fund {
  /** Unique identity for particular fund. */
  id: string,
  /** Each title represents a heading of the ledger. */
  title: string,
  /** The amount in the capital ledger for the above-mentioned title. */
  equityAmount: number,
  /** The amount in the commodity ledger for the above-mentioned title. */
  commodityAmount: number,
}

export interface Details {
  start: number,
  adhoc: number,
  receivables: number,
  fundTransfer: number,
  collaterals: number,
  realizedPl: number,
  utilized: number,
  clear: number,
  total: number,
  available: number,
}


/**
 * Balance available for the user for capital as well as the commodity market.
 */
export interface GetFundsResponse extends Response {
  /** Basic detals for all funds. */
  fund_limit: [Fund],
}




// TYPES (GET-HOLDINGS)
// --------------------

/**
 * Details of each holding.
 */
export interface Holding {
  /** 12-digit International Securities Identification Number. */
  isin: string,
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** The exchange in which order is placed. */
  exchange: string,
  /** Identify the type of holding. */
  type: string,
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


/**
 * Overall status of holdings in this demat account.
 */
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


/**
 * Equity and mutual fund holdings which the user has in this demat account.
 */
export interface GetHoldingsResponse extends Response {
  /** Details of each holding. */
  holdings: [Holding],
  /** Overall status of holdings in this demat account. */
  overall: HoldingsOverall,
}




// TYPES (GET-ORDERS)
// ------------------

/**
 * Order placed by the user in the current trading day.
 */
export interface Order {
  /** The unique order id assigned for each order. */
  id: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** The ticker symbol for which order is placed. */
  ticker: string,
  /** Description of symbol for which order is placed. */
  description: string,
  /** The segment this order is placed in. */
  segment: string,
  /** Exchange instrument type. */
  instrument: string,
  /** The exchange in which order is placed. */
  exchange: string,
  /** The type of order. */
  type: string,
  /** The order is buy or sell. */
  side: string,
  /** The product type. */
  productType: string,
  /** Source from where the order was placed. */
  source: string,
  /** The status of the order. */
  status: string,
  /** True when placing AMO order. */
  offline: boolean,
  /** The original order qty. */
  quantity: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  filledQuantity: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** Remaining disclosed quantity. */
  remainingDisclosedQuantity: number,
  /** Day or IOC. */
  validity: string,
  /** The order time as per DD-MMM-YYYY hh:mm:ss in IST. */
  time: string,
  /** The parent order id will be provided only for applicable orders. */
  parentId?: string,
  /** Price change from previous trading day. */
  priceChange: number,
  /** Percent price change from previous trading day. */
  priceChangePercent: number,
  /** Last price of symbol. */
  currentPrice: number,
  /** The average traded price for the order. */
  sellPrice: number,
  /** The error messages are shown here. */
  message: string,
  /** PAN of the client. */
  pan: string,
  /** The client id of the fyers user. */
  clientId: string,
}


/**
 * An order placed by the user in the current trading day.
 */
 export interface GetOrderRequest {
  /** The unique order id assigned for each order. */
  id: string,
}

/**
 * All the orders placed by the user in the current trading day.
 */
export interface GetOrdersResponse extends Response {
  /** List of all orders places during the day. */
  orderBook: [Order],
}




// TYPES (GET-POSITIONS)
// ---------------------

/**
 * Current open and closed position for the current trading day.
 */
export interface Position {
  /** The unique value for each position. */
  id: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The segment in which the position is taken. */
  segment: string,
  /** The exchange in which the position is taken. */
  exchange: string,
  /** The product type of the position. */
  productType: string,
  /** The side shows whether the position is long / short. */
  side: string,
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


/**
 * Overall status of positions for the current trading day.
 */
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


/**
 * Current open and closed positions for the current trading day.
 */
export interface GetPositionsResponse extends Response {
  /** List of all positions for the current trading day. */
  netPositions: [Position],
  /** Overall status of positions for the current trading day. */
  overall: PositionsOverall,
}




// TYPES (GET-TRADES)
// ------------------

/**
 * Trade for the current day across all platforms and exchanges in the current trading day.
 */
export interface Trade {
  /** The unique id to sort the trades. */
  id: string,
  /** The order id for which the trade occurred. */
  orderId: string,
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The segment in which order is placed. */
  segment: string,
  /** The exchange in which order is placed. */
  exchange: string,
  /** The trade is buy or sell. */
  side: string,
  /** The product in which the order was placed. */
  productType: string,
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
  /** Buy, sell? */
  type: string,
  /** Buy, sell? */
  orderType: string,
}


/**
 * All the trades for the current day across all platforms and exchanges in the current trading day.
 */
export interface GetTradesResponse extends Response {
   /** List of all trades for the current trading day. */
  tradeBook: [Trade]
}




// TYPES (PLACE-ORDER)
// -------------------

/**
 * Defines an order to any exchange via Fyers.
 */
export interface PlaceOrderRequest {
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The quantity should be in multiples of lot size for derivatives. */
  quantity: number,
  /** The type of order. */
  type: string,
  /** The order is buy or sell. */
  side: string,
  /** The product in which the order was placed. */
  productType: string,
  /** Provide valid price for Limit and Stoplimit orders. */
  limitPrice: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice: number,
  /** Allowed only for Equity. */
  disclosedQuantity: number,
  /** Day or IOC. */
  validity: string,
  /** True when placing AMO order. */
  offline: boolean,
  /** Provide valid price for CO and BO orders. */
  stopLoss: number,
  /** Provide valid price for BO orders. */
  takeProfit: number,
}


/**
 * Reponse attributes of placeOrder().
 */
export interface PlaceOrderResponse extends Response {
  /** The order number of the placed order. */
  id: string,
}


/**
 * Response attributes of placeOrders().
 */
export interface PlaceOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: [HttpResponseData<PlaceOrderResponse>]
}




// TYPES (MODIFY-ORDER)
// --------------------

/**
 * Defines an order modification request to Fyers.
 */
export interface ModifyOrderRequest {
  /** The unique order id assigned for each order. */
  id: string,
  /** The type of order. */
  type: string,
  /** The order is buy or sell. */
  side: string,
  /** The product type. */
  productType: string,
  /** The original order qty. */
  quantity: number,
  /** Disclosed quantity. */
  disclosedQuantity: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** Day or IOC. */
  validity: string,
  /** True when placing AMO order. */
  offline: boolean,
  /** The exchange in which order is placed. */
  exchange: string,
  /** Exchange instrument type. */
  instrument: string,
}


/**
 * Reponse attributes of modifyOrder().
 */
export interface ModifyOrderResponse extends Response {
  /** The order number of the modified order. */
  id: string,
}


/**
 * Reponse attributes of modifyOrders().
 */
export interface ModifyOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: HttpResponseData<ModifyOrderResponse>,
}




// TYPES (CANCEL-ORDER)
// --------------------

/**
 * Defines an order cancellation to any exchange via Fyers.
 */
export interface CancelOrderRequest {
  /** The order number of the placed order. */
  id: string,
}


/**
 * Reponse attributes of cancelOrder().
 */
export interface CancelOrderResponse extends Response {
  /** The order number of the placed order. */
  id: string,
}


/**
 * Reponse attributes of cancelOrders().
 */
export interface CancelOrdersResponse extends Response {
  /** List of HTTP data for each order. */
  data: [HttpResponseData<CancelOrderResponse>]
}




// TYPES (EXIT-POSITION)
// ---------------------

/**
 * Defines a exit position request to Fyers.
 */
export interface ExitPositionRequest {
  /** Mandatory. Eg: NSE:FCONSUMER-EQ-INTRADAY. */
  id: string,
}


/**
 * Reponse attributes of exitPosition().
 */
export interface ExitPositionResponse extends Response {
}


/**
 * Reponse attributes of exitAllPositions().
 */
export interface ExitAllPositionsResponse extends Response {
}




// TYPES (CONVERT-POSITION)
// ------------------------

/**
 * Defines a convert position request to Fyers.
 */
export interface ConvertPositionRequest {
  /** Mandatory. Eg: 119031547242. */
  symbol: string,
  /** The side shows whether the position is long / short. */
  side: string,
  /** Quantity to be converted. Has to be in multiples of lot size for derivatives. */
  quantity: number,
  /** Existing productType (CNC positions cannot be converted). */
  fromProductType: string,
  /** The new product type. */
  toProductType: string,
}


/**
 * Reponse attributes of convertPosition().
 */
export interface ConvertPositionResponse extends Response {
  /** ? */
  positionDetails?: number,
}




// TYPES (GET-MARKET-STATUS)
// -------------------------

/** Current market status of an exchange's segment. */
export interface MarketStatus {
  /** The exchange in which the position is taken. */
  exchange: string,
  /** The segment in which the position is taken. */
  segment: string,
  /** The type of market: NL, MS, ES, ... */
  type: string,
  /** Market status: OPEN, CLOSE. */
  status: string,
}


/** Current market status of all the exchanges and their segments. */
export interface GetMarketStatusResponse extends Response {
  /** List of statuses of various markets. */
  marketStatus: [MarketStatus],
}




// TYPES (GET-SYMBOL-MASTER)
// -------------------------

export interface GetSymbolMasterRequest {
  /** Name of the exchange (NSE, BSE, MCX). */
  exchange: string,
  /** The segment whose symbols are needed (CM, FO, CD, COM). */
  segment: string,
}




// TYPES (GENERATE-EDIS-TPIN)
// --------------------------

export interface GenerateEdisTpinResponse extends Response {
  /** Unknown, seen to be empty. */
  data: string
}




// TYPES (GET-EDIS-TRANSACTIONS)
// -----------------------------

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
  /** NA. */
  errorCode: string,
  /** 0. */
  errorCount: string,
  /** Message. */
  reason: string,
}


export interface GetEdisTransactionsResponse extends Response {
  /** List of e-DIS transactions. */
  data: [EdisTransaction]|string
}




// TYPES (SUBMIT-EDIS-HOLDINGS)
// ----------------------------

export interface EdisHolding {
  isin: string,
  quantity: number,
}

export interface SubmitEdisHoldingsRequest {
  recordLst: [EdisHolding],
}




// TYPES (INQUIRE-EDIS-TRANSACTION)
// --------------------------------

export interface InquireEdisTransactionRequest {
  /** Transaction id. */
  id: string
}

export interface EdisStatus {
  FAILED_CNT: number,
  SUCEESS_CNT: number,
}

export interface InquireEdisTransactionResponse extends Response {
  data: EdisStatus,
}




// TYPES (GET-MARKET-HISTORY)
// --------------------------

/** Request for getting market history of a symbol. */
export interface GetMarketHistoryRequest {
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** The candle resolution in minutes. */
  resolution: string,
  /** 0 to enter the epoch value. 1 to enter the date format as yyyy-mm-dd. */
  dateFormat: number,
  /** Indicating the start date of records (epoch, yyyy-mm-dd). */
  from: string,
  /** Indicating the end date of records. */
  to: string,
  /** Set cont flag 1 for continues data and future options. */
  cont_flag: string,
}


/** Current market history of a particular stock. */
export interface GetMarketHistoryResponse extends Response {
  /** List of candes in the format: [time, open, high, low, close, volume]. */
  candles: [[number]],
}




// TYPES (GET-MARKET-QUOTES)
// -------------------------

/**
 * Request to retrieve the full market quotes for one or more symbols.
 */
export interface GetMarketQuotesRequest {
  /** Eg: NSE:RCOM-EQ, ... */
  symbols: string,
}


/**
 * Text candle in quotes.
 */
export interface Candle {
  /** UNIX expoch time. */
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


/**
 * Quote details of a particular symbol.
 */
export interface MarketQuoteValue {
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
  /** Short name for the symbol Eg: “SBIN-EQ”. */
  name: string,
  /** Name of the exchange. Eg: “NSE” or “BSE”. */
  exchange: string,
  /** Description of the symbol. */
  description: string,
  /** Symbol name provided by the user. */
  symbol: string,
  /** Today’s time. */
  date: number,
  /** Current time, open, high, low price and volume with HH:MM timestamp. */
  candle: Candle,
}


/**
 * Market quote for a particular symbol.
 */
export interface MarketQuote {
  /** Name of symbol. */
  n: string,
  /** Status (ok). */
  s: string,
  /** Market quote details. */
  v: MarketQuoteValue,
}


/**
 * Response attributes for getMarketQuotes().
 */
export interface GetMarketQuotesResponse extends Response {
  /** List of all market quotes. */
  d: [MarketQuote]
}




// TYPES (GET-MARKET-DEPTH)
// ------------------------

/**
 * Request attributes for getMarketDepth().
 */
export interface GetMarketDepthRequest {
  /** Eg: NSE:RCOM-EQ. */
  symbol: string,
  /** Set the ohlcv_flag to 1 to get open, high, low, closing and volume quantity. */
  ohlcv_flag: number,
}

export interface BidAsk {
  /** Bid/ask price. */
  price: number,
  /** Bid/ask volume. */
  volume: number,
  /** Orders? */
  orders: number,
}


export interface MarketDepth {
  /** Total buying quantity. */
  buyQuantity: number,
  /** Total selling quantity. */
  sellQuantity: number,
  /** Bidding price along with volume and total number of orders. */
  buys: [BidAsk],
  /** Offer price with volume and total number of orders. */
  sells: [BidAsk],
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
  /** Percentage of change between the current value and the previous day's market close. */
  priceChangePercent: number,
  /** Change value. */
  priceChange: number,
  /** Last traded quantity. */
  tradeQuantity: number,
  /** Last traded time. */
  tradeDate: number,
  /** Last traded price. */
  tradePrice: number,
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


/**
 * Response attributes for getMarketDepth().
 */
export interface GetMarketDepthResponse extends Response {
  /** Dictionary of all market quotes. */
  d: { (symbol: string): MarketDepth }
}





// REQUEST
// -------

function requestStep(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): RequestOptions {
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

function requestApi(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<Response> {
  return requestJson(auth, method, API_URL + path, query, body) as Promise<Response>;
}

function requestData(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<Response> {
  return requestJson(auth, method, DATA_URL + path, query, body) as Promise<Response>;
}

function requestSymbols(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<string> {
  return requestText(auth, method, SYMBOLS_URL + path, query, body);
}




// AUTHORIZATION
// -------------

/**
 * Get request step 1 for authorization.
 * @param options authorization step 1 details {client_id, redirect_uri, response_type, state}
 * @returns request step 1 for authorization
 */
export function authorizationStep1(options: AuthorizationRequest1): RequestOptions {
  return requestStep(null, 'GET', 'generate-authcode', options, null);
}


/**
 * Get request step 2 for authorization.
 * @param options authorization step 2 details {graph_type, appIdHash, code}
 * @returns request step 2 for authorization
 */
export function authorizationStep2(options: AuthorizationRequest2): RequestOptions {
  return requestStep(null, 'POST', 'validate-authcode', null, options);
}




// USER
// ----

/**
 * Get basic details of the client.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's profile
 */
export function getProfile(auth: Authorization): Promise<GetProfileResponse> {
  return requestApi(auth, 'GET', 'profile', null, null) as Promise<GetProfileResponse>;
}


/**
 * Get balance available for the user for capital as well as the commodity market.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's funds
 */
export function getFunds(auth: Authorization): Promise<GetFundsResponse> {
  return requestApi(auth, 'GET', 'funds', null, null) as Promise<GetFundsResponse>;
}


/**
 * Get the equity and mutual fund holdings which the user has in this demat account.
 * @param auth authorization {app_id, access_token}
 * @returns details of user's holdings
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
 * @returns details of an order
 */
export function getOrder(auth: Authorization, options: GetOrderRequest): Promise<GetOrdersResponse> {
  return requestApi(auth, 'GET', 'orders', options, null) as Promise<GetOrdersResponse>;
}


/**
 * Get details of all the orders placed in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of orders
 */
export function getOrders(auth: Authorization): Promise<GetOrdersResponse> {
  return requestApi(auth, 'GET', 'orders', null, null) as Promise<GetOrdersResponse>;
}


/**
 * Get details of all the positions in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of positions
 */
export function getPositions(auth: Authorization): Promise<GetPositionsResponse> {
  return requestApi(auth, 'GET', 'positions', null, null) as Promise<GetPositionsResponse>;
}


/**
 * Get details of all the trades in the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns details of trades
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
 * @returns unique order id
 */
export function placeOrder(auth: Authorization, options: PlaceOrderRequest): Promise<PlaceOrderResponse> {
  return requestApi(auth, 'POST', 'orders', null, options) as Promise<PlaceOrderResponse>;
}


/**
 * Place multiple orders to any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of multiple orders [{symbol, qty, type, side, ...}]
 * @returns unique order id
 */
export function placeOrders(auth: Authorization, options: [PlaceOrderRequest]): Promise<PlaceOrdersResponse> {
  return requestApi(auth, 'POST', 'orders-multi', null, options) as Promise<PlaceOrdersResponse>;
}




// OTHER-TRANSACTIONS
// ------------------

/**
 * Modifies an order placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of order {id, qty, type, side, ...}
 * @returns order id
 */
export function modifyOrder(auth: Authorization, options: ModifyOrderRequest): Promise<ModifyOrderResponse> {
  return requestApi(auth, 'PUT', 'orders', null, options) as Promise<ModifyOrderResponse>;
}


/**
 * Modifies orders placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of orders [{id, qty, type, side, ...}]
 * @returns order ids
 */
export function modifyOrders(auth: Authorization, options: [ModifyOrderRequest]): Promise<ModifyOrdersResponse> {
  return requestApi(auth, 'PUT', 'orders-multi', null, options) as Promise<ModifyOrdersResponse>;
}


/**
 * Cancels an order placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of order {id}
 * @returns order id
 */
export function cancelOrder(auth: Authorization, options: CancelOrderRequest): Promise<CancelOrderResponse> {
  return requestApi(auth, 'DELETE', 'orders', null, options) as Promise<CancelOrderResponse>;
}


/**
 * Cancels orders placed on any exchange via Fyers.
 * @param auth authorization {app_id, access_token}
 * @param options details of orders [{id}]
 * @returns order ids
 */
export function cancelOrders(auth: Authorization, options: [CancelOrderRequest]): Promise<CancelOrdersResponse> {
  return requestApi(auth, 'DELETE', 'orders-multi', null, options) as Promise<CancelOrdersResponse>;
}


/**
 * Exits a position on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @param options details of position {id}
 * @returns status
 */
export function exitPosition(auth: Authorization, options: ExitPositionRequest): Promise<ExitPositionResponse> {
  return requestApi(auth, 'DELETE', 'positions', null, options) as Promise<ExitPositionResponse>;
}


/**
 * Exits all positions on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @returns status
 */
export function exitAllPositions(auth: Authorization): Promise<ExitAllPositionsResponse> {
  return requestApi(auth, 'DELETE', 'positions', null, {}) as Promise<ExitAllPositionsResponse>;
}


/**
 * Converts a position on the current trading day.
 * @param auth authorization {app_id, access_token}
 * @param options details of position {symbol, positionSide, convertQty, ...}
 * @returns status
 */
export function convertPosition(auth: Authorization, options: ConvertPositionRequest): Promise<ConvertPositionResponse> {
  return requestApi(auth, 'PUT', 'positions', null, options) as Promise<ConvertPositionResponse>;
}




// BROKER-CONFIG
// -------------

/**
 * Get the current market status of all the exchanges and their segments.
 * @param auth authorization {app_id, access_token}
 * @returns market status
 */
export function getMarketStatus(auth: Authorization): Promise<GetMarketStatusResponse> {
  return requestApi(auth, 'GET', 'market-status', null, null) as Promise<GetMarketStatusResponse>;
}

/**
 * Get all the latest symbols of all the exchanges from the symbol master files.
 * @param auth authorization (unused)
 * @param options details of symbol category {exchange, segment}
 * @returns symbol master file as text
 */
export function getSymbolMaster(auth: null, options: GetSymbolMasterRequest): Promise<string> {
  var {exchange, segment} = options;
  return requestSymbols(null, 'GET', exchange + '_' + segment + '.csv', null, null);
}




// EDIS
// ----

/**
 * Generates e-DIS TPIN for validating/authorising transaction.
 * @param auth authorization {app_id, access_token}
 * @returns TPIN, an authorization code generated by CDSL/NSDL respectively, using which the customer validates/authorises the transaction
 */
export function generateEdisTpin(auth: Authorization): Promise<GenerateEdisTpinResponse> {
  return requestApi(auth, 'GET', 'tpin', null, null) as Promise<GenerateEdisTpinResponse>;
}

export function getEdisTransactions(auth: Authorization): Promise<GetEdisTransactionsResponse> {
  return requestApi(auth, 'GET', 'details', null, null) as Promise<GetEdisTransactionsResponse>;
}

export function submitEdisHoldingsStep(auth: Authorization, holdings: SubmitEdisHoldingsRequest): RequestOptions {
  return requestStep(auth, 'POST', 'index', null, holdings);
}

export function inquireEdisTransaction(auth: Authorization, transaction: InquireEdisTransactionRequest): Promise<InquireEdisTransactionResponse> {
  return requestApi(auth, 'POST', 'inquiry', null, transaction) as Promise<InquireEdisTransactionResponse>;
}




// DATA-API
// --------

/**
 * Get the current market history for a particular symbol.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbol, resolution, date_format, ...}
 * @returns market history
 */
export function getMarketHistory(auth: Authorization, options: GetMarketHistoryRequest): Promise<GetMarketHistoryResponse> {
  return requestData(auth, 'GET', 'history', options, null) as Promise<GetMarketHistoryResponse>;
}


/**
 * Get the current market quotes for a set of symbols.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbols}
 * @returns market quotes
 */
export function getMarketQuotes(auth: Authorization, options: GetMarketQuotesRequest): Promise<GetMarketQuotesResponse> {
  return requestData(auth, 'GET', 'quotes', options, null) as Promise<GetMarketQuotesResponse>;
}


/**
 * Get the current market depth for a particular symbol.
 * @param auth authorization {app_id, access_token}
 * @param options market details {symbol, ohlcv_flag}
 * @returns market depth
 */
export function getMarketDepth(auth: Authorization, options: GetMarketDepthRequest): Promise<GetMarketDepthResponse> {
  return requestData(auth, 'GET', 'depth', options, null) as Promise<GetMarketDepthResponse>;
}




// MAIN
// ----

/**
 * Container for storing authorization details.
 */
export class Fyers implements Authorization {
  app_id: string;
  access_token: string;


  /**
   * Create a container for storing authorization details.
   * @param app_id unique app_id received after creating app
   * @param access_token access token for the current trading day recieved after authorization
   */
  constructor(app_id: string, access_token: string) {
    this.app_id       = app_id;
    this.access_token = access_token;
  }


  /**
   * Get basic details of the client.
   * @returns details of user's profile
   */
  getProfile() { return getProfile(this); }

  /**
   * Get the equity and mutual fund holdings which the user has in this demat account.
   * @returns details of user's holdings
   */
  getFunds() { return getFunds(this); }

  /**
   * Get the equity and mutual fund holdings which the user has in this demat account.
   * @returns details of user's holdings
   */
  getHoldings() { return getHoldings(this); }

  /**
   * Get details of an order placed in the current trading day.
   * @param options order query {id}
   * @returns details of an order
   */
  getOrder(options: GetOrderRequest) { return getOrder(this, options); }

  /**
   * Get details of all the orders placed in the current trading day.
   * @returns details of orders
   */
  getOrders() { return getOrders(this); }

  /**
   * Get details of all the positions in the current trading day.
   * @returns details of positions
   */
  getPositions() { return getPositions(this); }

  /**
   * Get details of all the trades in the current trading day.
   * @returns details of trades
   */
  getTrades() { return getTrades(this); }

  /**
   * Place an order to any exchange via Fyers.
   * @param auth authorization {app_id, access_token}
   * @param options details of an order {symbol, qty, type, side, ...}
   * @returns unique order id
   */
  placeOrder(options: PlaceOrderRequest) { return placeOrder(this, options); }

  /**
   * Place multiple orders to any exchange via Fyers.
   * @param options details of multiple orders [{symbol, qty, type, side, ...}]
   * @returns unique order id
   */
  placeOrders(options: [PlaceOrderRequest]) { return placeOrders(this, options); }

  /**
   * Modifies an order placed on any exchange via Fyers.
   * @param options details of order {id, qty, type, side, ...}
   * @returns order id
   */
  modifyOrder(options: ModifyOrderRequest) { return modifyOrder(this, options); }

  /**
   * Modifies orders placed on any exchange via Fyers.
   * @param options details of orders [{id, qty, type, side, ...}]
   * @returns order ids
   */
  modifyOrders(options: [ModifyOrderRequest]) { return modifyOrders(this, options); }

  /**
   * Cancels an order placed on any exchange via Fyers.
   * @param options details of order {id}
   * @returns order id
   */
  cancelOrder(options: CancelOrderRequest) { return cancelOrder(this, options); }

  /**
   * Cancels orders placed on any exchange via Fyers.
   * @param options details of orders [{id}]
   * @returns order ids
   */
  cancelOrders(options: [CancelOrderRequest]) { return cancelOrders(this, options); }

  /**
   * Exits a position on the current trading day.
   * @param options details of position {id}
   * @returns status
   */
  exitPosition(options: ExitPositionRequest) { return exitPosition(this, options); }

  /**
   * Exits all positions on the current trading day.
   * @returns status
   */
  exitAllPositions() { return exitAllPositions(this); }

  /**
   * Converts a position on the current trading day.
   * @param options details of position {symbol, positionSide, convertQty, ...}
   * @returns status
   */
  convertPosition(options: ConvertPositionRequest) { return convertPosition(this, options); }

  /**
   * Get the current market status of all the exchanges and their segments.
   * @returns market status
   */
  getMarketStatus() { return getMarketStatus(this); }

  /**
   * Get all the latest symbols of all the exchanges from the symbol master files.
   * @param options details of symbol category {exchange, segment}
   * @returns symbol master file as text
   */
  static getSymbolMaster(options: GetSymbolMasterRequest) { return getSymbolMaster(null, options); }

  /**
   * Generates e-DIS TPIN for validating/authorising transaction.
   * @returns TPIN, an authorization code generated by CDSL/NSDL respectively, using which the customer validates/authorises the transaction
   */
  generateEdisTpin() { return generateEdisTpin(this); }

  getEdisTransactions() { return getEdisTransactions(this); }

  submitEdisHoldingsStep(options: SubmitEdisHoldingsRequest) { return submitEdisHoldingsStep(this, options); }

  inquireEdisTransaction(options: InquireEdisTransactionRequest) { return inquireEdisTransaction(this, options); }

  /**
   * Get the current market history for a particular symbol.
   * @param options market details {symbol, resolution, date_format, ...}
   * @returns market history
   */
  getMarketHistory(options: GetMarketHistoryRequest) { return getMarketHistory(this, options); }

  /**
   * Get the current market quotes for a set of symbols.
   * @param options market details {symbols}
   * @returns market quotes
   */
  getMarketQuotes(options: GetMarketQuotesRequest) { return getMarketQuotes(this, options); }

  /**
   * Get the current market depth for a particular symbol.
   * @param options market details {symbol, ohlcv_flag}
   * @returns market depth
   */
  getMarketDepth(options: GetMarketDepthRequest) { return getMarketDepth(this, options); }
}
