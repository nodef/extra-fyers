import * as http from './http';




// TYPES
// ======

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
  clientId: string,
  /** This is where the user will be redirected after successful login. */
  redirectUrl: string,
  /** The same value will be returned after successful login to the redirect uri. */
  state: string,
}


function fromAuthorizationStep1Request(x: AuthorizationStep1Request): http.AuthorizationStep1Request {
  return {
    client_id:     x.clientId,
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
  return {
    id:    x.fy_id,
    email: x.email_id,
    name:  x.name,
    pan:   x.PAN,
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


function toHolding(x: http.Holding): Holding {
  return {
    isin:     x.isin,
    symbol:   x.symbol,
    exchange: x.exchange,
    type:     x.holdingType,
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
  validity: string,
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
    segment:      x.segment,
    instrument:   x.instrument,
    exchange:     x.exchange,
    type:         x.type,
    side:         x.side,
    productType:  x.productType,
    source:       x.source,
    status:       x.status,
    offline:      x.offlineOrder,
    limitPrice:   x.limitPrice,
    stopPrice:    x.stopPrice,
    quantity:     x.qty,
    remainingQuantity: x.remainingQuantity,
    tradedQuantity:    x.filledQty,
    disclosedQuantity: x.discloseQty,
    remainingDisclosedQuantity: x.dqQtyRem,
    validity:     x.orderValidity,
    date:         x.orderDateTime,
    parentId:     x.parentId,
    priceChange:  x.ch,
    priceChangePercent: x.chp,
    currentPrice: x.lp,
    tradedPrice:  x.tradedPrice,
    message:      x.message,
    pan:          x.pan,
    clientId:     x.clientId,
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


function toPosition(x: http.Position): Position {
  return {
    id: x.id,
    symbol:      x.symbol,
    segment:     x.segment,
    exchange:    x.exchange,
    productType: x.productType,
    side:        x.side,
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
    crossCurrency: x.crossCurrency,
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


function toTrade(x: http.Trade): Trade {
  return {
    id: x.id,
    orderId:  x.orderNumber,
    symbol:   x.symbol,
    segment:  x.segment,
    exchange: x.exchange,
    side:     x.side,
    productType: x.productType,
    orderDate:   x.orderDateTime,
    price:       x.tradePrice,
    quantity:    x.tradedQty,
    value:       x.tradeValue,
    clientId:    x.clientId,
    type:        x.transactionType,
    orderType:   x.orderType,
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
  type: string,
  /** The order is buy or sell. */
  side: string,
  /** The product in which the order was placed. */
  productType: string,
  /** Provide valid price for Limit and Stoplimit orders. */
  limitPrice: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice: number,
  /** The quantity should be in multiples of lot size for derivatives. */
  quantity: number,
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


function fromPlaceOrder(x: PlaceOrder): http.PlaceOrderRequest {
  return {
    symbol: x.symbol,
    type:   x.type,
    side:   x.side,
    productType:  x.productType,
    limitPrice:   x.limitPrice,
    stopPrice:    x.stopPrice,
    qty:          x.quantity,
    disclosedQty: x.disclosedQuantity,
    validity:     x.validity,
    offlineOrder: x.offline,
    stopLoss:     x.stopLoss,
    takeProfit:   x.takeProfit,
  };
}




// MODIFY-ORDER
// ------------

/** Defines an order modification request to Fyers. */
export interface ModifyOrder {
  /** The unique order id assigned for each order. */
  id: string,
  /** The type of order. */
  type: string,
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
    type: x.type,
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
  side: string,
  /** Quantity to be converted. Has to be in multiples of lot size for derivatives. */
  quantity: number,
  /** Existing productType (CNC positions cannot be converted). */
  fromProductType: string,
  /** The new product type. */
  toProductType: string,
}


function fromConvertPosition(x: ConvertPosition): http.ConvertPositionRequest {
  return {
    symbol:       x.symbol,
    positionSide: x.side,
    convertQty:   x.quantity,
    convertFrom:  x.fromProductType,
    convertTo:    x.toProductType,
  };
}




// GET-MARKET-STATUS
// -----------------

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


function toMarketStatus(x: http.MarketStatus): MarketStatus {
  return {
    exchange: x.exchange,
    segment:  x.segment,
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
  /** 0 to enter the epoch value. 1 to enter the date format as yyyy-mm-dd. */
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
    cont_flag:   x.continuous,
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
  exchange: string,
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
    exchange: v.exchange,
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
  if (ks.length === 0) return NULL;  // TODO: OK?
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

/** Container for storing authorization details. */
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
