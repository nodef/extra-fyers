import {sha256DigestHex} from './_crypto';
import {queryString, httpsRequest, HttpsRequestOptions} from './_https';




// STEP (REQUEST)
// --------------

/**
 * Root URL for all REST API requests.
 */
export const ROOT_URL: string = 'https://api.fyers.in/api/v2/';

/**
 * Defines an HTTPS request (step) to be made.
 */
export interface RequestStep {
  /** This is the URL where request need to be sent. */
  url: string,
  /** Details such as method, and headers. */
  options: HttpsRequestOptions,
  /** Any additional POST data. */
  data: string,
}

/**
 * Attributes required for authorization of all requests.
 */
 export interface Authorization {
  /** This is the app_id which you have received after creating the app. */
  app_id: string,
  /** This value will be used for all the requests. */
  access_token: string,
}


function requestStep(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): RequestStep {
  var url  = ROOT_URL + path + queryString(query);
  var data = body == null? '' : JSON.stringify(body);
  var headers = {};
  if (auth != null) headers['authorization']  = auth.app_id + ':' + auth.access_token;
  if (data != null) headers['content-length'] = data.length.toString();
  if (data != null) headers['content-type']   = 'application/json';
  return {url, options: {method, headers}, data};
}

async function request(auth: Authorization|null, method: string, path: string, query: object|null, body: object|null): Promise<Response> {
  var {url, options, data} = requestStep(auth, method, path, query, body);
  var res = await httpsRequest(url, options, data);
  return JSON.parse(res.body);
}




// RESPONSE
// --------

/**
 * Common response format.
 */
export interface Response {
  /** ok / error. */
  s: string,
  /** This is the code to identify specific responses. */
  code: number,
  /** This is the message to identify the specific error responses. */
  message: string,
}




// AUTHORIZATION
// -------------

/**
 * Request attributes for Authorization step 1.
 */
export interface AuthorizationRequest1 {
  /** This is the app_id which you have received after creating the app. */
  client_id: string,
  /** This is where the user will be redirected after successful login. */
  redirect_uri: string,
  /** This value must always be “code”. */
  response_type: string,
  /** The same value will be returned after successful login to the redirect uri. */
  state: string,
}

/**
 * Response attributes for Authorization step 1.
 */
export interface AuthorizationResponse1 extends Response {
  /** String value which will be used to generate the access_token. */
  auth_code: string,
  /** This value is returned as is from the first request. */
  state: string,
}

/**
 * Request attributes for Authorization step 2.
 */
 export interface AuthorizationRequest2 {
  /** This value must always be “authorization_code”. */
  grant_type: string,
  /** SHA-256 of `api_id:app_secret` in hex. */
  appIdHash: string,
  /** This is the auth_code which is received from the first step. */
  code: string,
}

/**
 * Response attributes for Authorization step 2.
 */
export interface AuthorizationResponse2 extends Response {
  /** This value will be used for all the subsequent requests. */
  access_token: string,
}


/**
 * Get request step 1 for authorization.
 * @param app_id unique app_id recieved after creating the app
 * @param redirect_uri redirect url set for the app
 * @param state this value is returned as is from request
 * @returns request step 1 for authorization
 */
export function authorizationStep1(app_id: string, redirect_uri: string, state: string): RequestStep {
  var query: AuthorizationRequest1 = {
    client_id: app_id,
    redirect_uri,
    response_type: 'code',
    state,
  };
  return requestStep(null, 'GET', 'generate-authcode', query, null);
}


/**
 * Get request step 2 for authorization.
 * @param app_id unique app_id recieved after creating the app
 * @param app_secret app_secret recieved after creating the app
 * @param auth_code auth_code recieved from step 1
 * @returns request step 2 for authorization
 */
export function authorizationStep2(app_id: string, app_secret: string, auth_code: string): RequestStep {
  var body: AuthorizationRequest2 = {
    grant_type: 'authorization_code',
    appIdHash: sha256DigestHex(app_id + ':' + app_secret),
    code: auth_code,
  };
  return requestStep(null, 'POST', 'validate-authcode', null, body);
}




// USER-PROFILE
// ------------

/**
 * Basic details of the client.
 */
export interface UserProfile extends Response {
  /** URL link to the user’s profile picture, if any. */
  image: string,
  /** Display name, if any, provided by the client. */
  display_name: string,
  /** Name of the client. */
  name: string,
  /** The client id of the fyers user. */
  fy_id: string,
  /** Email address of the client. */
  email_id: string,
  /** PAN of the client. */
  PAN: string,
  /** Last PIN changed date. */
  pin_change_date: string,
  /** Last password changed date. */
  pwd_change_date: string,
  /** Number of days until the current password expires. */
  pwd_to_expire: number,
}


/**
 * Get request step for fetching user profile details.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching user profile details
 */
export function userProfileStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'profile', null, null);
}

/**
 * Fetch basic details of the client.
 * @param auth authorization {app_id, access_token}
 * @returns user profile details
 */
export function userProfile(auth: Authorization): Promise<UserProfile> {
  return request(auth, 'GET', 'profile', null, null) as Promise<UserProfile>;
}





// USER-FUNDS
// ----------

/**
 * Basic details for particular fund.
 */
export interface UserFund {
  /** Unique identity for particular fund. */
  id: string,
  /** Each title represents a heading of the ledger. */
  title: string,
  /** The amount in the capital ledger for the above-mentioned title. */
  equityAmount: number,
  /** The amount in the commodity ledger for the above-mentioned title. */
  commodityAmount: number,
}

/**
 * Balance available for the user for capital as well as the commodity market.
 */
export interface UserFunds extends Response {
  /** Basic detals for all funds. */
  fund_limit: [UserFund],
}


/**
 * Get request step for fetching user funds details.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching details of user's funds
 */
export function userFundsStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'funds', null, null);
}

/**
 * Fetch balance available for the user for capital as well as the commodity market.
 * @param auth authorization details {app_id, access_token}
 * @returns details of user's funds
 */
export function userFunds(auth: Authorization): Promise<UserFunds> {
  return request(auth, 'GET', 'funds', null, null) as Promise<UserFunds>;
}




// USER-HOLDINGS
// -------------

/**
 * Details of each holding.
 */
export interface UserHolding {
  /** Identify the type of holding. */
  holdingType: string,
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

/**
 * Overall status of holdings in this demat account.
 */
export interface UserHoldingsOverall {
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

/**
 * Equity and mutual fund holdings which the user has in this demat account.
 */
export interface UserHoldings extends Response {
  /** Details of each holding. */
  holdings: [UserHolding],
  /** Overall status of holdings in this demat account. */
  overall: UserHoldingsOverall,
}


/**
 * Get request step for fetching details of user's holdings.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching details of user's holdings
 */
export function userHoldingsStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'holdings', null, null);
}

/**
 * Fetch the equity and mutual fund holdings which the user has in this demat account.
 * @param auth authorization details {app_id, access_token}
 * @returns details of user's holdings
 */
export function userHoldings(auth: Authorization): Promise<UserHoldings> {
  return request(auth, 'GET', 'holdings', null, null) as Promise<UserHoldings>;
}




// ORDERS
// ------

/**
 * Order placed by the user across all platforms and exchanges in the current trading day.
 */
export interface Order {
  /** The unique order id assigned for each order. */
  id: string,
  /** The order id provided by the exchange. */
  exchOrdId: string,
  /** The symbol for which order is placed. */
  symbol: string,
  /** The original order qty. */
  qty: number,
  /** The remaining qty. */
  remainingQuantity: number,
  /** The filled qty after partial trades. */
  filledQty: number,
  /** The status of the order. */
  status: number,
  /** This is used to sort the orders based on the time. */
  slNo: number,
  /** The error messages are shown here. */
  message: string,
  /** The segment this order is placed in. */
  segment: number,
  /** The limit price for the order. */
  limitPrice: number,
  /** The stop price for the order. */
  stopPrice: number,
  /** The product type. */
  productType: string,
  /** The type of order. */
  type: number,
  /** The order is buy or sell. */
  side: number,
  /** Disclosed quantity. */
  disclosedQty: number,
  /** Day or IOC. */
  orderValidity: string,
  /** The order time as per DD-MMM-YYYY hh:mm:ss in IST. */
  orderDateTime: string,
  /** The parent order id will be provided only for applicable orders. */
  parentId: string,
  /** The average traded price for the order. */
  tradedPrice: number,
  /** Source from where the order was placed. */
  source: string,
  /** Fytoken is a unique identifier for every symbol. */
  fytoken: string,
  /** True when placing AMO order. */
  offlineOrder: string,
  /** PAN of the client. */
  pan: string,
  /** The client id of the fyers user. */
  clientId: string,
  /** The exchange in which order is placed. */
  exchange: number,
  /** Exchange instrument type. */
  instrument: number,
}

/**
 * All the orders placed by the user across all platforms and exchanges in the current trading day.
 */
export interface Orders extends Response {
  /** List of all orders places during the day. */
  orderBook: [Order],
}


/**
 * Get request step for fetching details of orders.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching details of orders
 */
export function ordersStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'orders', null, null);
}

/**
 * Fetch all the orders placed by the user across all platforms and exchanges in the current trading day.
 * @param auth authorization details {app_id, access_token}
 * @returns details of orders
 */
export function orders(auth: Authorization): Promise<Orders> {
  return request(auth, 'GET', 'orders', null, null) as Promise<Orders>;
}


/**
 * Get request step for fetching details of an order.
 * @param auth authorization {app_id, access_token}
 * @param id unique order id
 * @returns request step for fetching details of an order
 */
export function orderStep(auth: Authorization, id: string): RequestStep {
  return requestStep(auth, 'GET', 'orders', {id}, null);
}

/**
 * Fetch details of an order placed by the user across all platforms and exchanges in the current trading day.
 * @param auth authorization details {app_id, access_token}
 * @param id unique order id
 * @returns details of an order
 */
export function order(auth: Authorization, id: string): Promise<Orders> {
  return request(auth, 'GET', 'orders', {id}, null) as Promise<Orders>;
}




// POSITIONS
// ---------

/**
 * Current open and closed position for the current trading day.
 */
 export interface Position {
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The unique value for each position. */
  id: string,
  /** Average buy price. */
  buyAvg: number,
  /** Total buy qty. */
  buyQty: number,
  /** Average sell price. */
  sellAvg: number,
  /** Total sell qty. */
  sellQty: number,
  /** netAvg. */
  netAvg: number,
  /** Net qty. */
  netQty: number,
  /** The side shows whether the position is long / short. */
  side: number,
  /** Absolute value of net qty. */
  qty: number,
  /** The product type of the position. */
  productType: string,
  /** The realized p&l of the position. */
  realized_profit: number,
  /** The unrealized p&l of the open position. */
  unrealized_profit: number,
  /** The total p&l of the position. */
  pl: number,
  /** Is it a cross currency position? */
  crossCurrency: string,
  /** Incase of cross currency position, the rbi reference rate will be required to calculate the p&l. */
  rbiRefRate: number,
  /** Incase of commodity positions, this multiplier is required for p&l calculation. */
  qtyMulti_com: number,
  /** The segment in which the position is taken. */
  segment: number,
  /** The exchange in which the position is taken. */
  exchange: number,
  /** This is used for sorting of positions. */
  slNo: number,
  /** LTP is the price from which the next sale of the stocks happens. */
  ltp: number,
  /** Fytoken is a unique identifier for every symbol. */
  fytoken: string,
}

/**
 * Overall status of positions for the current trading day.
 */
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

/**
 * Current open and closed positions for the current trading day.
 */
export interface Positions extends Response {
  /** List of all positions for the current trading day. */
  netPositions: [Position],
  /** Overall status of positions for the current trading day. */
  overall: PositionsOverall,
}


/**
 * Get request step for fetching details of positions.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching details of positions
 */
 export function positionsStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'positions', null, null);
}

/**
 * Fetch all the positions placed by the user across all platforms and exchanges in the current trading day.
 * @param auth authorization details {app_id, access_token}
 * @returns details of positions
 */
export function positions(auth: Authorization): Promise<Positions> {
  return request(auth, 'GET', 'positions', null, null) as Promise<Positions>;
}




// TRADES
// ------

/**
 * Trade for the current day across all platforms and exchanges in the current trading day.
 */
export interface Trade {
  /** Eg: NSE:SBIN-EQ. */
  symbol: string,
  /** The unique id to sort the trades. */
  id: string,
  /** The time when the trade occured in “DD-MM-YYYY hh:mm:ss” format in IST. */
  orderDateTime: string,
  /** The order id for which the trade occurred. */
  orderNumber: string,
  /** The trade number generated by the exchange. */
  tradeNumber: string,
  /** The traded price. */
  tradePrice: number,
  /** The total traded value. */
  tradeValue: number,
  /** The total traded qty. */
  tradedQty: number,
  /** The trade is buy or sell. */
  side: number,
  /** The product in which the order was placed. */
  productType: string,
  /** The order number provided by the exchange. */
  exchangeOrderNo: string,
  /** The segment in which order is placed. */
  segment: number,
  /** The exchange in which order is placed. */
  exchange: number,
  /** Fytoken is a unique identifier for every symbol. */
  fyToken: string,
}

/**
 * All the trades for the current day across all platforms and exchanges in the current trading day.
 */
 export interface Trades extends Response {
   /** List of all trades for the current trading day. */
  tradeBook: [Trade]
}


/**
 * Get request step for fetching details of trades.
 * @param auth authorization {app_id, access_token}
 * @returns request step for fetching details of trades
 */
 export function tradesStep(auth: Authorization): RequestStep {
  return requestStep(auth, 'GET', 'tradebook', null, null);
}

/**
 * Fetch all the trades placed by the user across all platforms and exchanges in the current trading day.
 * @param auth authorization details {app_id, access_token}
 * @returns details of trades
 */
export function trades(auth: Authorization): Promise<Trades> {
  return request(auth, 'GET', 'tradebook', null, null) as Promise<Trades>;
}




// PLACE-ORDER
// -----------

/**
 * Defines an order to any exchange via Fyers.
 */
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
  limitPrice: number,
  /** Provide valid price for Stop and Stoplimit orders. */
  stopPrice: number,
  /** Allowed only for Equity. */
  disclosedQty: number,
  /** Day or IOC. */
  validity: string,
  /** True when placing AMO order. */
  offlineOrder: string,
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
 * Get request step for placing an order.
 * @param auth authorization {app_id, access_token}
 * @returns request step for placing an order
 */
 export function placeOrderStep(auth: Authorization, order: PlaceOrderRequest): RequestStep {
  return requestStep(auth, 'POST', 'orders', null, order);
}

/**
 * Place an order to any exchange via Fyers.
 * @param auth authorization details {app_id, access_token}
 * @returns unique order id
 */
export function placeOrder(auth: Authorization): Promise<PlaceOrderResponse> {
  return request(auth, 'GET', 'tradebook', null, null) as Promise<PlaceOrderResponse>;
}



interface IModifyOrderRequest {
  /** Mandatory. Eg: 119031547242. */
  id: string,
  /** Mandatory. Only incase of Limit/ Stoplimit orders. */
  limitPrice: number,
  /** Mandatory. Only incase of Stop/ Stoplimit orders. */
  stopLoss: number,
  /** Mandatory. Incase you want to modify the quantity. */
  qty: number,
  /** Mandatory. Incase you want to change the order type of the pending order. */
  type: number,
}

interface ConvertPositionRequest {
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




// BROKER-CONFIG MARKET-STATUS
// ---------------------------

// curl -H "Authorization:app_id:access_token" https://api.fyers.in/api/v2/market-status
// {
// "s": "ok",
// "code": 200,
// "message": "",
// "marketStatus": [{
//                     "exchange": 12,
//                     "segment": 12,
//                     "market_type": "OL",
//                     "status": "OPEN"
//                 },
//                 {
//                     "exchange": 12,
//                     "segment": 12,
//                     "market_type": "NL",
//                     "status": "OPEN"
//                 }]
// }




// EDIS TPIN-GENERATION
// --------------------

// curl --location --request GET 'https://api.fyers.in/api/v2/tpin'
// --header 'Authorization: app_id:access_token'
// {"s": "ok", "code": 200, "message": "Successfully sent request for BO Tpin generation", "data": ""}




// EDIS DETAILS
// ------------

// curl --location --request GET 'https://api.fyers.in/api/v2/details' \
//  --header 'Authorization: app_id:access_token'
//  {"s": "ok", "code": 200, "message": "", "data": [{"clientId": "DXXXX4", "isin": "INE313D01013", "qty": 1.0, "qtyUtlize": 0.0, "entryDate": "07/06/2021 13:58:56", "startDate": "07/06/2021", "endDate": "07/06/2021", "noOfDays": 1, "source": "W", "status": "SUCCESS", "reason": "eDIS Transaction done successfully", "internalTxnId": "915485", "dpTxnId": "0706202171316317", "errCode": "NA", "errorCount": "0", "transactionId": "915484108176"}]




// EDIS INDEX
// ----------

// curl --location --request POST 'https://api.fyers.in/api/v2/index' --header 'Authorization: app_id:accessToken' --header 'Content-Type: application/json'
//  --data-raw '{"recordLst": [{"isin_code": "INE313D01013", "qty": 1}]}'
//   {"s": "ok", "code": 200, "message": "", "data": "<table width=\"100%\"><tr><td><table align=\"center\"><tr><td><table  align=\"center\"><tr><th><img src=\"https://clib.fyers.in/fy_images/320x132.png\" alt=\"Fyers\" width=\"220\" /></th></tr><tr style=\"color:#7c7e7f;\"><th class=\"sansserif\">&nbsp; &nbsp; &nbsp; Free Investment Zone</th></tr></table></td></tr></table><table align=\"center\" bgcolor=\"#ffffff\"  style=\"Margin: 0 auto;max-width: 600px;min-width: 320px; border-style:solid;border-left-width:10px;padding:5px; border-color:#ffffff;\"><tr style=\"color:#3e4751;\"><th><img src=\"https://mockedis.cdslindia.com/images/CDSL-Logo.png\"></th> </tr><tr><th><hr  style=\" border:1px solid\" width=\"12%\"><br></th></tr><br><tr align=\"left\" style=\"color:#7c7e7f;\"><td class=\"sansserif\" id=\"tpinDescp\">As per new regulations, clients are required to authorise sell transactions by providing specific instrument details along with quantites at the CDSL portal prior to executing any sell transactions from their demat account.<br><br> The autorisation will be valid till the end of the day irrespective of whether you have completed the sell transaction or not. <br><br></td></tr><tr align=\"left\" style=\"color:#7c7e7f;\"><td class=\"sansserif\"><br></td></tr><tr align=\"left\" style=\"color:#7c7e7f;\"><td class=\"sansserif\" style=\"text-align:center\"><br><br>       <form name= \"frmDIS\" method = \"post\" action= \"https://eDIS.cdslindia.com/eDIS/VerifyDIS\" >        <input type= \"hidden\" name= \"DPId\" value= \"89400\" />        <input type= \"hidden\" name= \"ReqId\" value= \"917177108176\" />        <input type= \"hidden\" name= \"Version\" value= \"1.1\" />        <input type= \"hidden\" name= \"TransDtls\" value= \"LD9WAIJCL2jgSj1hY2DABqfayzA6iInmBvh9ub+Ftqy0P+V/Qy4kRf9dsBHElVwcDdAhTx5a6+9g3y/TcVh1zEdMbslVXAcMi913u+YwHNp5IWUS6XAOCAx9UY01XZ+OVAgAez/9m+7cP6TjOeOBCqw57MWZ1y5N6OsPyzh+ecLUD2e6G5hJMc/ZKRw1dl5FvzJGpfmr1MGpM5jwtpzpbksmAIiAUMyx+zqfT5dX27ZLp0P4MRCl/QNyLnMCNwbhoPx7TEp6fN23UD8T3Y1742Kb1mVz3b4Aw6Kt+maXsjM12jP2bHZuM+rYKkjQWBK+AejT3Uk9vAZmFbd+Y1xeqKJFXAoKRA+cQXiCp8gjpm6RaZ04p8V7MMTWrIhpKAXNCCpCb+suxO74mjfW18AfZMKxX0UK/JjVomEoHz0GaIAKq4z3KAfwwcpqhtcNZv8u68DyeMmCFwojJ0Y+SBLjwUlJV3SWqpYhBnXxni5YsmvOK5NQLfWxd+KjuWK4gXgONgxWIcPMWsjY++JkYwtAlAhI43khxe0Y0SjntmZTZ4A=\" />        <input type= \"submit\" value=\"Submit\">         </form></td></tr><tr><td style=\"text-align: center;\" class=\"like-anchor\"><div id=\"forgetTpinDiv\"><a href=\"#\" id=\"forgetTpin\" onclick=\"tpin()\">Forgot CDSL TPIN</a></div></td></tr></tbody></table></td></tr></tbody></table>"}




// EDIS INQUIRY
// ------------

interface EdisInquiry {
  transactionId: string
}

interface EdisResponse {
  FAILED_CNT: number,
  SUCCEESS_CNT: number,
}

// curl --location --request POST 'https://api.fyers.in/api/v2/inquiry'
//  --header 'Authorization: app_id:access_Token' --header 'Content-Type: application/json' --data-raw '{"transactionId": "915484108176"}'
//   {"s": "ok", "code": 200, "message": "", "data": {"FAILED_CNT": 0, "SUCEESS_CNT": 1}}
