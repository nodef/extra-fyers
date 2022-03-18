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

| Property       | Description                                     |
| -------------- | ----------------------------------------------- |
| [is]           | Checks if value is array.                       |

<br>
<br>
