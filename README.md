A Javascript interface for FYERS API.<br>
📦 [NPM](https://www.npmjs.com/package/extra-fyers),
🌐 [Web](https://www.npmjs.com/package/extra-fyers.web),
📜 [Files](https://unpkg.com/extra-fyers/),
📰 [Docs](https://nodef.github.io/extra-fyers/).

The objective of this package is to provide a cleaner interface to FYERS API.
The `http` namespace provides the same interface as FYERS HTTP API. The top
namespace (global functions, classes) provide a [facade] for this HTTP API
and provides additional utility functions, such as calculating charges.

Global functions associated with FYERS API, such as `getPositions()`, are
stateless and accept `Authorization` as the first parameter. On the other
hand, the `Api` class includes stateful functions which do not require
the `Authorization` parameter (required while creating object). Note that
this authorization can be obtained be performing login with `loginStep1()`
and `loginStep2()`.

The goals for the future include adding support for processing symbol master
files (for getting a list of symbols and associated ISIN, description), and
providing support for websocket interface.

This package is available in both *Node.js* (`extra-fyers`) and *Web*
(`extra-fyers.web`) formats. The web format is exposed as `extra_fyers`
standalone variable and can be loaded from [jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[facade]: https://en.wikipedia.org/wiki/Facade_pattern
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-fyers.web/index.js

<br>

```javascript
const fyers = require('extra-fyers');

async function main() {
  var appId       = '****';  // app_id recieved after creating app
  var accessToken = '****';  // access_token recieved after login
  var api = new fyers.Api(appId, accessToken);

  // List equity and commodity fund limits.
  console.log(await api.getFunds());

  // List holdings.
  console.log(await api.getHoldings());

  // Place CNC market order for SBIN (equity) on NSE for 5 shares
  var id = await api.placeOrder({symbol: 'NSE:SBIN-EQ', quantity: 5});

  // List postions for today (should list NSE:SBIN-EQ-CNC).
  console.log(await api.getPositions());
}
main();
```

<br>
<br>


## Index

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
| [holdingTypeDescription] | Get holding type description. |
| [holdingType] | Get holding type code. |
| [productTypeDescription] | Get product type description. |
| [productType] | Get product type code. |
| [instrumentTypeDescription] | Get instrument type description. |
| [instrumentType] | Get instrument type code. |
| [equityDeliveryCharges] | Get equity delivery charges. |
| [equityIntradayCharges] | Get equity intraday charges. |
| [equityFuturesCharges] | Get equity futures charges. |
| [equityOptionsCharges] | Get equity options charges. |
| [currencyFuturesCharges] | Get currency futures charges. |
| [currencyOptionsCharges] | Get currency options charges. |
| [commodityFuturesCharges] | Get commodity futures charges. |
| [commodityOptionsCharges] | Get commodity options charges. |
| [loginStep1] | Get request step 1 for authorization. |
| [loginStep2] | Get request step 2 for authorization. |
| [getProfile] | Get basic details of the client. |
| [getFunds] | Get balance available for the user for capital as well as the commodity market. |
| [getHoldings] | Get the equity and mutual fund holdings which the user has in this demat account. |
| [getOrder] | Get details of an order placed in the current trading day. |
| [getOrders] | Get details of all the orders placed in the current trading day. |
| [getPositions] | Get details of all the positions in the current trading day. |
| [getTrades] | Get details of all the trades in the current trading day. |
| [placeOrder] | Place an order to any exchange via Fyers. |
| [placeOrders] | Place multiple orders to any exchange via Fyers. |
| [modifyOrder] | Modifies an order placed on any exchange via Fyers. |
| [modifyOrders] | Modifies orders placed on any exchange via Fyers. |
| [cancelOrder] | Cancels an order placed on any exchange via Fyers. |
| [cancelOrders] | Cancels orders placed on any exchange via Fyers. |
| [exitPosition] | Exits a position on the current trading day. |
| [exitAllPositions] | Exits all positions on the current trading day. |
| [convertPosition] | Converts a position on the current trading day. |
| [getMarketStatus] | Get the current market status of all the exchanges and their segments. |
| [getMarketHistory] | Get the market history for a particular symbol. |
| [getMarketQuotes] | Get the current market quotes for a set of symbols. |
| [getMarketDepth] | Get the current market depth for a particular symbol. |
| [getSymbolMaster] | Get all the latest symbols of all the exchanges from the symbol master files. |
| [generateEdisTpin] | Generate e-DIS TPIN for validating/authorising transaction. |
| [getEdisTransactions] | Get the necessary information regarding the holdings you have on your and also the Status of the holdings. If the “sell” for the particular holdings is a success or not. |
| [submitEdisHoldingsStep] | Redirect to CDSL page for login where you can submit your Holdings information and accordingly you can provide the same to exchange to Sell your holdings (browser only). |
| [inquireEdisTransaction] | Inquire the information/status of the provided transaction Id for the respective holdings you have on your end. |
| [Api] | Container for storing authorization details. |

<br>
<br>

[![](https://img.youtube.com/vi/AGCC-_Cuhhw/maxresdefault.jpg)](https://www.youtube.com/watch?v=AGCC-_Cuhhw)

[exchangeDescription]: https://nodef.github.io/extra-fyers/modules.html#exchangeDescription
[exchange]: https://nodef.github.io/extra-fyers/modules.html#exchange
[segmentDescription]: https://nodef.github.io/extra-fyers/modules.html#segmentDescription
[segment]: https://nodef.github.io/extra-fyers/modules.html#segment
[positionSideDescription]: https://nodef.github.io/extra-fyers/modules.html#positionSideDescription
[positionSide]: https://nodef.github.io/extra-fyers/modules.html#positionSide
[orderSideDescription]: https://nodef.github.io/extra-fyers/modules.html#orderSideDescription
[orderSide]: https://nodef.github.io/extra-fyers/modules.html#orderSide
[orderSourceDescription]: https://nodef.github.io/extra-fyers/modules.html#orderSourceDescription
[orderSource]: https://nodef.github.io/extra-fyers/modules.html#orderSource
[orderStatusDescription]: https://nodef.github.io/extra-fyers/modules.html#orderStatusDescription
[orderStatus]: https://nodef.github.io/extra-fyers/modules.html#orderStatus
[orderTypeDescription]: https://nodef.github.io/extra-fyers/modules.html#orderTypeDescription
[orderType]: https://nodef.github.io/extra-fyers/modules.html#orderType
[orderValidityDescription]: https://nodef.github.io/extra-fyers/modules.html#orderValidityDescription
[orderValidity]: https://nodef.github.io/extra-fyers/modules.html#orderValidity
[optionTypeDescription]: https://nodef.github.io/extra-fyers/modules.html#optionTypeDescription
[optionType]: https://nodef.github.io/extra-fyers/modules.html#optionType
[holdingTypeDescription]: https://nodef.github.io/extra-fyers/modules.html#holdingTypeDescription
[holdingType]: https://nodef.github.io/extra-fyers/modules.html#holdingType
[productTypeDescription]: https://nodef.github.io/extra-fyers/modules.html#productTypeDescription
[productType]: https://nodef.github.io/extra-fyers/modules.html#productType
[instrumentTypeDescription]: https://nodef.github.io/extra-fyers/modules.html#instrumentTypeDescription
[instrumentType]: https://nodef.github.io/extra-fyers/modules.html#instrumentType
[equityDeliveryCharges]: https://nodef.github.io/extra-fyers/modules.html#equityDeliveryCharges
[equityIntradayCharges]: https://nodef.github.io/extra-fyers/modules.html#equityIntradayCharges
[equityFuturesCharges]: https://nodef.github.io/extra-fyers/modules.html#equityFuturesCharges
[equityOptionsCharges]: https://nodef.github.io/extra-fyers/modules.html#equityOptionsCharges
[currencyFuturesCharges]: https://nodef.github.io/extra-fyers/modules.html#currencyFuturesCharges
[currencyOptionsCharges]: https://nodef.github.io/extra-fyers/modules.html#currencyOptionsCharges
[commodityFuturesCharges]: https://nodef.github.io/extra-fyers/modules.html#commodityFuturesCharges
[commodityOptionsCharges]: https://nodef.github.io/extra-fyers/modules.html#commodityOptionsCharges
[loginStep1]: https://nodef.github.io/extra-fyers/modules.html#loginStep1
[loginStep2]: https://nodef.github.io/extra-fyers/modules.html#loginStep2
[getProfile]: https://nodef.github.io/extra-fyers/modules.html#getProfile
[getFunds]: https://nodef.github.io/extra-fyers/modules.html#getFunds
[getHoldings]: https://nodef.github.io/extra-fyers/modules.html#getHoldings
[getOrder]: https://nodef.github.io/extra-fyers/modules.html#getOrder
[getOrders]: https://nodef.github.io/extra-fyers/modules.html#getOrders
[getPositions]: https://nodef.github.io/extra-fyers/modules.html#getPositions
[getTrades]: https://nodef.github.io/extra-fyers/modules.html#getTrades
[placeOrder]: https://nodef.github.io/extra-fyers/modules.html#placeOrder
[placeOrders]: https://nodef.github.io/extra-fyers/modules.html#placeOrders
[modifyOrder]: https://nodef.github.io/extra-fyers/modules.html#modifyOrder
[modifyOrders]: https://nodef.github.io/extra-fyers/modules.html#modifyOrders
[cancelOrder]: https://nodef.github.io/extra-fyers/modules.html#cancelOrder
[cancelOrders]: https://nodef.github.io/extra-fyers/modules.html#cancelOrders
[exitPosition]: https://nodef.github.io/extra-fyers/modules.html#exitPosition
[exitAllPositions]: https://nodef.github.io/extra-fyers/modules.html#exitAllPositions
[convertPosition]: https://nodef.github.io/extra-fyers/modules.html#convertPosition
[getMarketStatus]: https://nodef.github.io/extra-fyers/modules.html#getMarketStatus
[getMarketHistory]: https://nodef.github.io/extra-fyers/modules.html#getMarketHistory
[getMarketQuotes]: https://nodef.github.io/extra-fyers/modules.html#getMarketQuotes
[getMarketDepth]: https://nodef.github.io/extra-fyers/modules.html#getMarketDepth
[getSymbolMaster]: https://nodef.github.io/extra-fyers/modules.html#getSymbolMaster
[generateEdisTpin]: https://nodef.github.io/extra-fyers/modules.html#generateEdisTpin
[getEdisTransactions]: https://nodef.github.io/extra-fyers/modules.html#getEdisTransactions
[submitEdisHoldingsStep]: https://nodef.github.io/extra-fyers/modules.html#submitEdisHoldingsStep
[inquireEdisTransaction]: https://nodef.github.io/extra-fyers/modules.html#inquireEdisTransaction
[Api]: https://nodef.github.io/extra-fyers/modules.html#Api
