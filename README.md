A JavaScript/TypeScript interface for [FYERS] API.

▌
📦 [JSR](https://jsr.io/@nodef/extra-fyers),
📦 [NPM](https://www.npmjs.com/package/extra-fyers),
📰 [Docs](https://jsr.io/@nodef/extra-fyers/doc).

[FYERS] is one of the cheapest online stock brokers in India, offering trading
in the **equity** (NSE, BSE), **currency** (NSE), and **commodity** (MCX)
segments. This package is a **single flat module** that provides a **cleaner
interface** to the [FYERS API] over both **HTTP** (the `http` namespace) and
**WebSocket** (the `websocket` namespace), with binary market-data parsing on
top. This lets you receive *instant* notifications of *order updates* and
*market data*.

The **top namespace** — global functions and the `Api` class — is a [facade]
over the two APIs, and adds utility functions such as **charge calculators**.
Global functions (`getPositions()`, `placeOrder()`, ...) are **stateless** and
take an `Authorization` token as their first parameter; the **`Api` class**
wraps them in **stateful** methods, so the token is supplied only once, at
construction time. That token is obtained by logging in with `loginStep1()`
and `loginStep2()`.

[FYERS]: https://fyers.in
[FYERS API]: https://myapi.fyers.in/docs/
[facade]: https://en.wikipedia.org/wiki/Facade_pattern

<br>

```ts
import * as fyers from "jsr:@nodef/extra-fyers";

// 1. Create a stateful API client.
const appId       = "****";  // app_id received after creating an app
const accessToken = "****";  // access_token received after login
const api = new fyers.Api(appId, accessToken);

// 2. List equity and commodity fund limits.
console.log(await api.getFunds());

// 3. List holdings.
console.log(await api.getHoldings());

// 4. Place a CNC market order for SBIN (equity) on NSE for 5 shares.
const id = await api.placeOrder({symbol: "NSE:SBIN-EQ", quantity: 5});

// 5. List positions for today (should include NSE:SBIN-EQ-CNC).
console.log(await api.getPositions());

// 6. Receive real-time market quotes over WebSocket.
await api.connectMarketData(quote => console.log(quote));
await api.subscribeMarketDepth(["NSE:SBIN-EQ"]);

// 7. Receive real-time order-status updates over WebSocket.
await api.connectOrderUpdate(order => console.log(order));
await api.subscribeOrderUpdate();
```

Run with the permissions you need, for example
`deno run --allow-net example.ts`.

<br>
<br>

## Index

### Exchange, segment, and other codes

| Property | Description |
|  ----  |  ----  |
| [exchangeDescription] | Get exchange description. |
| [exchange] | Get exchange code. |
| [segmentDescription] | Get segment description. |
| [segment] | Get segment code. |
| [positionSideDescription] | Get position side description. |
| [positionSide] | Get position side code. |
| [orderSideDescription] | Get order side description. |
| [orderSide] | Get order side code. |
| [orderSourceDescription] | Get order source description. |
| [orderSource] | Get order source code. |
| [orderStatusDescription] | Get order status description. |
| [orderStatus] | Get order status code. |
| [orderTypeDescription] | Get order type description. |
| [orderType] | Get order type code. |
| [orderValidityDescription] | Get order validity description. |
| [orderValidity] | Get order validity code. |
| [optionTypeDescription] | Get option type description. |
| [optionType] | Get option type code. |
| [derivativeTypeDescription] | Get derivative type description. |
| [derivativeType] | Get derivative type code. |
| [holdingTypeDescription] | Get holding type description. |
| [holdingType] | Get holding type code. |
| [productTypeDescription] | Get product type description. |
| [productType] | Get product type code. |
| [instrumentTypeDescription] | Get instrument type description. |
| [instrumentType] | Get instrument type code. |

### Symbols

| Property | Description |
|  ----  |  ----  |
| [symbolName] | Get symbol exchange, underlying, currency-pair, or commodity name. |
| [symbolExchange] | Get symbol exchange. |
| [symbolSeries] | Get symbol exchange series. |
| [symbolOptionType] | Get symbol option type. |
| [symbolDerivativeType] | Get symbol derivative type. |
| [symbolStrikePrice] | Get symbol strike price. |
| [symbolToken] | Get symbol token (a unique identifier). |
| [symbolDescription] | Get symbol description. |
| [symbolIsin] | Get symbol ISIN. |
| [symbolLotSize] | Get symbol minimum lot size. |

### Charges

| Property | Description |
|  ----  |  ----  |
| [equityDeliveryCharges] | Get equity delivery charges. |
| [equityIntradayCharges] | Get equity intraday charges. |
| [equityFuturesCharges] | Get equity futures charges. |
| [equityOptionsCharges] | Get equity options charges. |
| [currencyFuturesCharges] | Get currency futures charges. |
| [currencyOptionsCharges] | Get currency options charges. |
| [commodityFuturesCharges] | Get commodity futures charges. |
| [commodityOptionsCharges] | Get commodity options charges. |

### Authorization

| Property | Description |
|  ----  |  ----  |
| [loginStep1] | Get request step 1 for authorization. |
| [loginStep2] | Get request step 2 for authorization. |

### Account

| Property | Description |
|  ----  |  ----  |
| [getProfile] | Get basic details of the client. |
| [getFunds] | Get balance available for the user in capital and commodity markets. |
| [getHoldings] | Get equity and mutual-fund holdings in this demat account. |

### Orders, positions, and trades

| Property | Description |
|  ----  |  ----  |
| [getOrder] | Get details of an order placed in the current trading day. |
| [getOrders] | Get details of all orders placed in the current trading day. |
| [getPositions] | Get details of all positions in the current trading day. |
| [getTrades] | Get details of all trades in the current trading day. |
| [placeOrder] | Place an order to any exchange via FYERS. |
| [placeOrders] | Place multiple orders to any exchange via FYERS. |
| [modifyOrder] | Modify an order placed on any exchange via FYERS. |
| [modifyOrders] | Modify orders placed on any exchange via FYERS. |
| [cancelOrder] | Cancel an order placed on any exchange via FYERS. |
| [cancelOrders] | Cancel orders placed on any exchange via FYERS. |
| [exitPosition] | Exit a position on the current trading day. |
| [exitAllPositions] | Exit all positions on the current trading day. |
| [convertPosition] | Convert a position on the current trading day. |

### Market data

| Property | Description |
|  ----  |  ----  |
| [getMarketStatus] | Get current market status of all exchanges and their segments. |
| [getMarketHistory] | Get market history for a particular symbol. |
| [getMarketQuotes] | Get current market quotes for a set of symbols. |
| [getMarketDepth] | Get current market depth for a particular symbol. |

### Symbol master

| Property | Description |
|  ----  |  ----  |
| [getSymbolMaster] | Get the latest symbols from the symbol master files of all exchanges. |
| [processSymbolMaster] | Get details of symbols from the symbol master file text. |
| [loadSymbolMaster] | Get details of symbols from the symbol master files. |

### e-DIS

| Property | Description |
|  ----  |  ----  |
| [generateEdisTpin] | Generate e-DIS TPIN for authorising a transaction. |
| [getEdisTransactions] | Get holdings and their status from the depository. |
| [submitEdisHoldingsStep] | Redirect to CDSL for holdings authorisation (browser only). |
| [inquireEdisTransaction] | Inquire the status of a given transaction ID. |

### WebSocket

| Property | Description |
|  ----  |  ----  |
| [connectMarketData] | Connect to the Market-data WebSocket URL. |
| [subscribeMarketQuote] | Subscribe to market quote. |
| [subscribeMarketDepth] | Subscribe to market depth. |
| [unsubscribeMarketQuote] | Unsubscribe from market quote. |
| [unsubscribeMarketDepth] | Unsubscribe from market depth. |
| [connectOrderUpdate] | Connect to the Order-update WebSocket URL. |
| [subscribeOrderUpdate] | Subscribe to order updates. |
| [unsubscribeOrderUpdate] | Unsubscribe from order updates. |

### Classes

| Property | Description |
|  ----  |  ----  |
| [Api] | Stateful interface for FYERS API. |

See the [Docs] for the complete list with descriptions and examples.

[Docs]: https://jsr.io/@nodef/extra-fyers/doc

<br>
<br>

## Reference

### Api

```ts
class Api {
  constructor(appId: string, accessToken: string);
}
```

Every **global function** in this package is also available as a **stateful
method** on `Api`, with the `authorization` parameter dropped. Once the client
is constructed, the `appId` and `accessToken` are supplied automatically to
each call.

### loginStep1 / loginStep2

```ts
function loginStep1(appId: string, redirectUri: string): string;
function loginStep2(
  appId: string,
  secretKey: string,
  authCode: string,
): Promise<{ access_token: string }>;
```

`loginStep1()` returns the URL of the FYERS login page; redirect the user there
to approve access. FYERS then redirects back to `redirectUri` with an
`auth_code`. Pass that code to `loginStep2()` to exchange it for an
**`access_token`** (valid for the trading day).

### placeOrder / modifyOrder / cancelOrder

```ts
function placeOrder(authorization: string, order: object): Promise<string>;
function modifyOrder(authorization: string, order: object): Promise<string>;
function cancelOrder(authorization: string, id: string): Promise<string>;
```

Place, modify, or cancel a single order. An order must include at least
`symbol` (`EXCHANGE:SYMBOL-SERIES`) and `quantity`; other fields such as
`side`, `type`, `productType`, `limitPrice`, `stopPrice`, `validity`, and
`disclosedQuantity` are optional. The plural forms `placeOrders()`,
`modifyOrders()`, and `cancelOrders()` accept an array of the same object (or
of IDs) and return an array of results.

### subscribeMarketQuote / subscribeMarketDepth

```ts
function subscribeMarketQuote(
  authorization: string,
  symbols: string[],
): Promise<void>;
function subscribeMarketDepth(
  authorization: string,
  symbols: string[],
): Promise<void>;
```

Subscribe to **quote** (level 1) or **depth** (level 5) data over the
`connectMarketData()` WebSocket. The matching `unsubscribe…` functions take
the same arguments. Market data is delivered as parsed JSON objects to the
callback supplied to `connectMarketData()`.

### connectMarketData / connectOrderUpdate

```ts
function connectMarketData(
  authorization: string,
  callback: (quote: object) => void,
): Promise<void>;
function connectOrderUpdate(
  authorization: string,
  callback: (order: object) => void,
): Promise<void>;
```

Open a **WebSocket** to FYERS and stream **market quotes** or **order-status
updates** to the callback. Each quote is the **binary FYERS payload**, parsed
into a plain object for you; each order update is delivered as JSON.

<br>
<br>

## Story

The **Indian stock market** runs on two main exchanges: the **NSE** (National
Stock Exchange) and the **BSE** (Bombay Stock Exchange). Trading happens in
the **cash** segment (equity delivery or intraday) and in the **derivatives**
segment (futures and options on indices, stocks, currency, and commodities).
The **MCX** is the commodity exchange, while the **CDSL** and **NSDL** act as
**depositories** that hold shares on your behalf — a **demat account** holds
those shares, and a **broker** connects you to the exchanges.

[FYERS] is a **discount broker**. Its **REST API** exposes the standard
order-management primitives: place, modify, and cancel orders; check positions
and holdings; fetch funds; pull market quotes and depth; and load the
**symbol-master** files that map human-readable symbols (`NSE:SBIN-EQ`) to
**unique numeric tokens** used internally. Its **WebSocket API** streams the
same information in near real time: market data for subscribed symbols, and
status changes for orders placed by the current user.

Access to the API is gated by an **OAuth-like two-step flow**:
`loginStep1()` produces a URL the user opens to authenticate at FYERS, FYERS
redirects back with an `auth_code`, and `loginStep2()` exchanges that code for
an `access_token`. The token is then sent as `Authorization` on every
subsequent HTTP request and used when opening WebSocket connections. **Tokens
expire at the end of the trading day** and must be regenerated each morning.

The package mirrors the two APIs one-to-one — the `http` namespace against the
REST API, the `websocket` namespace against the streaming API — and then adds
a small **facade** on top: global functions accept the `Authorization` token
explicitly, while the `Api` class remembers it. **Charge calculators** (per
segment, per product type) are a convenience layered over FYERS's published
[charges list].

[charges list]: https://fyers.in/charges-list/

<br>
<br>

## See also

- [FYERS API Docs](https://myapi.fyers.in/docs/)
- [FYERS Community](https://community.fyers.in/)
- [FYERS Detailed Charges List](https://fyers.in/charges-list/)
- [fyers-api-v2 package](https://www.npmjs.com/package/fyers-api-v2)
- [C# wrapper of Fyers API v2 : ArthaChitra](https://github.com/arthachitra/FyersAPI)
- [Fyers API golang client : Rishi Anand](https://github.com/rishi-anand/fyers-go-client)
- [The Kite Connect API Javascript client - v4](https://kite.trade/docs/kiteconnectjs/v3/index.html)
- [Intermarket Trading System (ITS)](https://www.investopedia.com/terms/i/intermarket-trading-system.asp)
- [What are stop loss orders and how to use them?](https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types/articles/what-are-stop-loss-orders-and-how-to-use-them)
- [How to use Stoploss-limit(SL) order like a Stoploss-Market(SLM) order?](https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types/articles/how-to-use-sl-l-order-like-a-sl-m-order)
- [What is disclosed quantity feature and how to use it?](https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile/articles/what-is-disclosed-quantity-feature-and-how-to-use-it)
- [What are cover orders and how to use them?](https://support.zerodha.com/category/trading-and-markets/product-and-order-types/order/articles/what-are-cover-orders-and-how-to-use-them)
- [What does CNC, MIS and NRML mean?](https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types/articles/what-does-cnc-mis-and-nrml-mean)
- [What is UNDCUR, UNDIRC, UNDIRT, UNDIRT in CDs? And what its use](https://tradingqna.com/t/what-is-undcur-undirc-undirt-undirt-in-cds-and-what-its-use/756)
- [Can some one tell me what is FUTIRC?](https://tradingqna.com/t/can-some-one-tell-me-what-is-futirc/34069)
- [I want to know in nifty f & o what is futidx, futivx, futstk?](https://tradingqna.com/t/i-want-to-know-in-nifty-f-o-what-is-futidx-futivx-futstk/2367)
- [What Is a Rally?](https://www.investopedia.com/terms/r/rally.asp)

<br>
<br>

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-fyers)


[exchangeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/exchangeDescription
[exchange]: https://jsr.io/@nodef/extra-fyers/doc/~/exchange
[segmentDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/segmentDescription
[segment]: https://jsr.io/@nodef/extra-fyers/doc/~/segment
[positionSideDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/positionSideDescription
[positionSide]: https://jsr.io/@nodef/extra-fyers/doc/~/positionSide
[orderSideDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/orderSideDescription
[orderSide]: https://jsr.io/@nodef/extra-fyers/doc/~/orderSide
[orderSourceDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/orderSourceDescription
[orderSource]: https://jsr.io/@nodef/extra-fyers/doc/~/orderSource
[orderStatusDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/orderStatusDescription
[orderStatus]: https://jsr.io/@nodef/extra-fyers/doc/~/orderStatus
[orderTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/orderTypeDescription
[orderType]: https://jsr.io/@nodef/extra-fyers/doc/~/orderType
[orderValidityDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/orderValidityDescription
[orderValidity]: https://jsr.io/@nodef/extra-fyers/doc/~/orderValidity
[optionTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/optionTypeDescription
[optionType]: https://jsr.io/@nodef/extra-fyers/doc/~/optionType
[derivativeTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/derivativeTypeDescriptiohtml
[derivativeType]: https://jsr.io/@nodef/extra-fyers/doc/~/derivativeType
[holdingTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/holdingTypeDescription
[holdingType]: https://jsr.io/@nodef/extra-fyers/doc/~/holdingType
[productTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/productTypeDescription
[productType]: https://jsr.io/@nodef/extra-fyers/doc/~/productType
[instrumentTypeDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/instrumentTypeDescriptiohtml
[instrumentType]: https://jsr.io/@nodef/extra-fyers/doc/~/instrumentType
[symbolName]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolName
[symbolExchange]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolExchange
[symbolSeries]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolSeries
[symbolOptionType]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolOptionType
[symbolDerivativeType]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolDerivativeType
[symbolStrikePrice]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolStrikePrice
[symbolToken]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolToken
[symbolDescription]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolDescription
[symbolIsin]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolIsin
[symbolLotSize]: https://jsr.io/@nodef/extra-fyers/doc/~/symbolLotSize
[equityDeliveryCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/equityDeliveryCharges
[equityIntradayCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/equityIntradayCharges
[equityFuturesCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/equityFuturesCharges
[equityOptionsCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/equityOptionsCharges
[currencyFuturesCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/currencyFuturesCharges
[currencyOptionsCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/currencyOptionsCharges
[commodityFuturesCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/commodityFuturesCharges
[commodityOptionsCharges]: https://jsr.io/@nodef/extra-fyers/doc/~/commodityOptionsCharges
[loginStep1]: https://jsr.io/@nodef/extra-fyers/doc/~/loginStep1
[loginStep2]: https://jsr.io/@nodef/extra-fyers/doc/~/loginStep2
[getProfile]: https://jsr.io/@nodef/extra-fyers/doc/~/getProfile
[getFunds]: https://jsr.io/@nodef/extra-fyers/doc/~/getFunds
[getHoldings]: https://jsr.io/@nodef/extra-fyers/doc/~/getHoldings
[getOrder]: https://jsr.io/@nodef/extra-fyers/doc/~/getOrder
[getOrders]: https://jsr.io/@nodef/extra-fyers/doc/~/getOrders
[getPositions]: https://jsr.io/@nodef/extra-fyers/doc/~/getPositions
[getTrades]: https://jsr.io/@nodef/extra-fyers/doc/~/getTrades
[placeOrder]: https://jsr.io/@nodef/extra-fyers/doc/~/placeOrder
[placeOrders]: https://jsr.io/@nodef/extra-fyers/doc/~/placeOrders
[modifyOrder]: https://jsr.io/@nodef/extra-fyers/doc/~/modifyOrder
[modifyOrders]: https://jsr.io/@nodef/extra-fyers/doc/~/modifyOrders
[cancelOrder]: https://jsr.io/@nodef/extra-fyers/doc/~/cancelOrder
[cancelOrders]: https://jsr.io/@nodef/extra-fyers/doc/~/cancelOrders
[exitPosition]: https://jsr.io/@nodef/extra-fyers/doc/~/exitPosition
[exitAllPositions]: https://jsr.io/@nodef/extra-fyers/doc/~/exitAllPositions
[convertPosition]: https://jsr.io/@nodef/extra-fyers/doc/~/convertPosition
[getMarketStatus]: https://jsr.io/@nodef/extra-fyers/doc/~/getMarketStatus
[getMarketHistory]: https://jsr.io/@nodef/extra-fyers/doc/~/getMarketHistory
[getMarketQuotes]: https://jsr.io/@nodef/extra-fyers/doc/~/getMarketQuotes
[getMarketDepth]: https://jsr.io/@nodef/extra-fyers/doc/~/getMarketDepth
[getSymbolMaster]: https://jsr.io/@nodef/extra-fyers/doc/~/getSymbolMaster
[processSymbolMaster]: https://jsr.io/@nodef/extra-fyers/doc/~/processSymbolMaster
[loadSymbolMaster]: https://jsr.io/@nodef/extra-fyers/doc/~/loadSymbolMaster
[generateEdisTpin]: https://jsr.io/@nodef/extra-fyers/doc/~/generateEdisTpin
[getEdisTransactions]: https://jsr.io/@nodef/extra-fyers/doc/~/getEdisTransactions
[submitEdisHoldingsStep]: https://jsr.io/@nodef/extra-fyers/doc/~/submitEdisHoldingsStep
[inquireEdisTransaction]: https://jsr.io/@nodef/extra-fyers/doc/~/inquireEdisTransaction
[connectMarketData]: https://jsr.io/@nodef/extra-fyers/doc/~/connectMarketData
[subscribeMarketQuote]: https://jsr.io/@nodef/extra-fyers/doc/~/subscribeMarketQuote
[subscribeMarketDepth]: https://jsr.io/@nodef/extra-fyers/doc/~/subscribeMarketDepth
[unsubscribeMarketQuote]: https://jsr.io/@nodef/extra-fyers/doc/~/unsubscribeMarketQuote
[unsubscribeMarketDepth]: https://jsr.io/@nodef/extra-fyers/doc/~/unsubscribeMarketDepth
[connectOrderUpdate]: https://jsr.io/@nodef/extra-fyers/doc/~/connectOrderUpdate
[subscribeOrderUpdate]: https://jsr.io/@nodef/extra-fyers/doc/~/subscribeOrderUpdate
[unsubscribeOrderUpdate]: https://jsr.io/@nodef/extra-fyers/doc/~/unsubscribeOrderUpdate
[Api]: https://jsr.io/@nodef/extra-fyers/doc/~/Api
